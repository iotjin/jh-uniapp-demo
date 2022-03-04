<!-- 腾讯地图 -->
<template>
	<view class="map-container">
		<map id="myMap" class="map" :latitude="latitude" :longitude="longitude" show-location show-scale
			:markers="markers" :scale="scale" :polygons="polygons" :polyline="polyline" :include-points="includePoints"
			enable-zoom @regionchange="onMapChange" @tap="onMapTap" @markertap="onMapMarkTap"
			@callouttap="onMapCalloutTap">

			<!-- 工具按钮 -->
			<cover-view class="locationBg" @tap='onClickTools'>
				<cover-image class="locationIcon" src="../../../../static/images/map/ic_tools.png" />
				<cover-view class="locationText">工具</cover-view>
			</cover-view>
			<!-- 定位按钮 -->
			<cover-view class="locationBg" style="margin-top: 10px;" @tap='onClickLocation'>
				<cover-image class="locationIcon" src="../../../../static/images/map/ic_location.png" />
				<cover-view class="locationText">定位</cover-view>
			</cover-view>

			<view class="center-bg" @tap="onClickAddMarkerBtn" v-show="!isSelectMarker">
				<view class="center-top">
					<view class="center-title">{{title}}</view>
					<view class="center-line"></view>
					<image class="center-btn" src="../../../../static/images/map/ic_ok.png" />
				</view>
				<view class="down-arrow"></view>
			</view>

			<!-- 大头针中间文字 -->
			<cover-view slot="callout">
				<block v-for="(item,index) in markers" :key="index">
					<cover-view class="customCallout" :marker-id="item.id">
						<cover-view> {{(item.id + 1)}} </cover-view>
					</cover-view>
				</block>
			</cover-view>

		</map>

		<!-- 删除弹框 (会随地图移动)-->
		<view class="center-bg2" v-show="isSelectMarker">
			<view class="center-top">
				<view class="center-title">{{markers[selectMarkerId].address}}</view>
				<view class="center-line"></view>
				<image class="center-btn" src="../../../../static/images/map/ic_delete.png"
					@tap="onClickDeleteMarkerBtn" />
			</view>
		</view>
	</view>

</template>

<script>
	const util = require('./lib/util')
	const authUtils = require('../../../../common/utils/authUtils')
	var QQMapWX = require('./lib/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.min.js');
	var qqmapsdk;

	export default {
		data() {
			return {
				latitude: 40.040415,
				longitude: 116.273511,
				scale: 20, //默认20
				isShowScale: true,
				isShowCompass: false,
				isShowPosition: true,
				markers: [
					// 我的位置
					// {
					//   id: 0,
					//   iconPath: "../../../../static/images/map/ic_mark1.png",
					//   latitude: 40.040415,
					//   longitude: 116.273511,
					//   width: 30,
					//   height: 30,
					//   title: '我的位置' //点击时显示，callout存在时将被忽略
					// },
					// 其它
					// {
					//   id: 3,
					//   latitude: 40.040415,
					//   longitude: 116.273511,
					//   iconPath: '../../../../static/images/map/Marker1_Activated@3x.png',
					//   width: 30,
					//   height: 30,
					//   callout: {
					//     content: '腾讯总部大楼',
					//     padding: 10,
					//     borderRadius: 5,
					//     display: 'ALWAYS',
					//   },
					//   label: {
					//     content: '标记文字',
					//     color: '#f00',
					//     textAlign: 'center'
					//   }
					// }
				],

				curPoints: [],
				polyline: '', // 路线
				polygons: '', // 多边形
				includePoints: '', // 缩放视野以包含所有给定的坐标点
				isSelectMarker: false,
				selectMarkerId: '',
				// 逆地址
				address: '',
				recommend: '',
				rough: '',
				title: "拖动选择位置",
			};
		},
		mounted() {

		},
		onLoad: function() {
			qqmapsdk = new QQMapWX({
				key: '4M5BZ-ALKLU-BVXVL-B2HCC-DJSUS-WGFBH'
			});
			this.mapCtx = wx.createMapContext('myMap')
			this.getCurrentLocation()
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: '腾讯地图'
			})
		},
		methods: {
			// 获取当前位置
			getCurrentLocation() {
				var that = this
				// wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
				wx.getLocation({
					type: 'gcj02',
					success: (res) => {
						console.log('当前位置');
						console.log(res);
						that.latitude = res.latitude
						that.longitude = res.longitude
					},
					fail: (err) => {}
				});
			},
			// 点击定位按钮
			onClickLocation() {
				let that = this

				// // 判断权限
				// wx.getSetting({
				// 	success(res) {
				// 		if (!res.authSetting['scope.userLocation']) {
				// 			uni.showToast({
				// 				title: '未授权小程序使用位置权限',
				// 				icon: 'none'
				// 			})
				// 		} else {
				// 			// 有权限
				// 			that.scale = 20
				// 			that.getCurrentLocation()
				// 			that.mapCtx.moveToLocation()
				// 		}
				// 	}
				// })

				// 判断权限
				authUtils.authorize("scope.userLocation", function(res) {
					console.log('success', res);
					that.scale = 20
					that.getCurrentLocation()
					that.mapCtx.moveToLocation()
				}, function(err) {
					console.log('denyback', err);
				}, function(err) {
					console.log('deniedBack', err);
				});

				// 		 
				// let that = this
				// that.scale = 20
				// setTimeout(() => {
				//   that.mapCtx.moveToLocation()
				//   that.getCenterLngLat()
				// }, 200);
			},
			// 视野发生变化时触发
			// 监听拖动地图，拖动结束根据中心点更新页面
			onMapChange(e) {
				console.log(e);
				if (e.type == 'begin') {
					this.title = "拖动选择位置"
				}
				if (e.type == 'begin' && e.causedBy == "gesture") {
					this.cancelMarker()
				}
				if (e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag')) {
					this.getCenterLngLat()
				}
			},
			// 点击地图
			onMapTap(e) {
				console.log('点击地图');
				console.log(e);
				console.log(this.isSelectMarker);
				this.cancelMarker()
			},
			// 点击标记点时触发，e.detail = {markerId}
			onMapMarkTap(e) {
				console.log('点击标记点');
				console.log(e.detail.markerId);
				this.selectMarker(e.detail.markerId)
			},
			// 点击标记点对应的气泡时触发e.detail = {markerId}
			onMapCalloutTap(e) {
				console.log('点击气泡');
				console.log(e.detail.markerId);
				this.selectMarker(e.detail.markerId)
			},
			onClickAddMarkerBtn() {
				this.addMarker(this.latitude, this.longitude)
			},
			// 删除标记点
			onClickDeleteMarkerBtn() {
				var that = this
				uni.showModal({
					title: '是否删除该标记点？',
					// content: '',
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							that.deleteMarker(that.selectMarkerId)
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			// 获取地图中心点的经纬度
			getCenterLngLat: function() {
				var that = this
				this.mapCtx = wx.createMapContext('myMap')
				this.mapCtx.getCenterLocation({
					success: function(res) {
						console.log('获取中间点');
						console.log(res);
						that.latitude = res.latitude
						that.longitude = res.longitude
						that.reverseGeocoder(res.latitude, res.longitude)
					}
				})
			},
			// 编辑或删除选中标记
			selectMarker(markerId) {
				let tempMarkers = this.markers
				tempMarkers.forEach(function(item, index) {
					item.iconPath = "../../../../static/images/map/ic_mark1.png"
					item.isSelect = false
					if (index == markerId) {
						item.isSelect = !item.isSelect
						item.iconPath = item.isSelect ? '../../../../static/images/map/Marker1_Activated@3x.png' :
							"../../../../static/images/map/ic_mark1.png"
					}
				});
				let marker = this.markers[markerId]
				this.latitude = marker.latitude
				this.longitude = marker.longitude
				this.markers = tempMarkers
				this.isSelectMarker = true
				this.selectMarkerId = markerId
			},
			cancelMarker() {
				console.log('cancelMarker');
				let tempMarkers = this.markers
				tempMarkers.forEach(function(item, index) {
					item.iconPath = "../../../../static/images/map/ic_mark1.png"
					item.isSelect = false
				});
				this.markers = tempMarkers
				this.isSelectMarker = false
				this.selectMarkerId = ""
			},
			// 添加一个标记点
			addMarker(latitude, longitude) {
				// 判断是否存在，相同经纬度不再添加
				let isExist = false
				this.markers.forEach(item => {
					if (item.latitude == latitude && item.longitude == longitude) {
						console.log('已存在，相同经纬度不再添加');
						isExist = true
						return
					}
				});
				if (isExist == true) {
					return
				}
				if (!this.title || this.title == '拖动选择位置') {
					uni.showToast({
						title: '未获取到地址',
						icon: 'none'
					})
					return
				}

				// 不存在。新增
				var mark = new Object(); //声明一个mark对象
				mark.id = this.markers.length;
				mark.longitude = longitude; //经度
				mark.latitude = latitude;
				mark.iconPath = "../../../../static/images/map/ic_mark1.png";
				mark.width = 40;
				mark.height = 40;
				// mark.label = {
				//   fontSize: 14,
				//   anchorX: 0,
				//   anchorY: -35,
				//   content: mark.id + '',
				//   textAlign: 'center',
				//   color: '#000000',
				// }
				// mark.callout = {
				//   content: '腾讯总部大楼',
				//   padding: 10,
				//   borderRadius: 5,
				//   display: 'ALWAYS',
				// }

				// 自定义气泡窗口
				mark.customCallout = {
					anchorX: 0,
					anchorY: 25,
					display: 'ALWAYS',
				}
				mark.isSelect = false
				mark.address = this.title

				this.markers.push(mark)

				// 在data中声明一个curPoints 来记录点击所有的点，在完成绘制的时候清空点。
				this.curPoints.push({
					longitude: longitude,
					latitude: latitude
				})
				// 添加线上的超过一个的点，每次把距离叠加上去
				if (this.curPoints.length > 1) {
					// console.log(this.curPoints)
					// 地图上用的polyline是一个线集合对象，如果只放一条线是无法看见的。
					var pl = [{
						points: this.curPoints,
						color: "#0066FF",
						width: 2,
						dottedLine: false,
					}];
					//更改界面数据
					this.polyline = pl
				}
				// 计算距离
				this.calculateDistance()
			},
			// 删除一个标记点
			deleteMarker(markerId) {
				let tempMarkers = this.markers
				let delMarker = tempMarkers[markerId]
				// console.log(delMarker);
				if (tempMarkers.length > markerId) {
					// 删除
					tempMarkers.splice(markerId, 1)
					// 重新排序,设置顺序
					tempMarkers.forEach(function(item, index) {
						item.id = index
					});
					let curPoints = this.curPoints
					curPoints.forEach(function(item, index) {
						if (item.latitude == delMarker.latitude && item.longitude == delMarker.longitude) {
							curPoints.splice(index, 1)
						}
					});
					// 地图上用的polyline是一个线集合对象，如果只放一条线是无法看见的。
					var pl = [{
						points: curPoints,
						color: "#0066FF",
						width: 2,
						dottedLine: false,
					}];
					this.polyline = curPoints.length > 1 ? pl : ''
					this.curPoints = curPoints
					this.markers = tempMarkers

					// 计算距离
					this.calculateDistance()
					this.cancelMarker()
				}

			},
			// 每次更新markers之后重新计算距离
			calculateDistance() {
				// this.calculateEachDistance()
				this.calculateAllDistance()
			},
			// 计算两个点之间的距离，个数大于1每个点下都显示距离，不显示总距离
			calculateEachDistance() {
				let curPoints = this.curPoints
				if (curPoints.length > 1) {
					var p2 = curPoints[curPoints.length - 1]
					var p1 = curPoints[curPoints.length - 2]
					// console.log(p1);
					// console.log(p2);
					let dis = 0
					dis += util.distance(p1, p2);
					let datas = Number(dis); //转为字符串
					let datas2 = datas.toFixed(2) + "米"; //保留两位小数
					var x = -(datas2.length * 1) //设置文字向左偏移
					let label = {
						fontSize: 14,
						anchorX: x,
						anchorY: 0,
						content: datas2,
						textAlign: 'center',
						color: '#000000',
					}
					this.markers[this.markers.length - 1].label = label
				} else if (curPoints.length == 1) {
					let label = {
						fontSize: 14,
						anchorX: x,
						anchorY: 0,
						content: '',
						textAlign: 'center',
						color: '#000000',
					}
					this.markers[0].label = label
				}
			},
			// 计算所有点之间的总距离，按添加顺序依次计算两点之间距离，并在最后一个点上显示总距离
			calculateAllDistance() {
				// 添加线上的超过一个的点，每次把距离叠加上去
				let curPoints = this.curPoints
				if (curPoints.length > 1) {
					let dis = 0
					curPoints.forEach(function(item, index) {
						if (index < (curPoints.length - 1)) {
							var p1 = curPoints[index]
							var p2 = curPoints[index + 1]
							dis += util.distance(p1, p2);
						}
					});
					let datas = Number(dis); //转为字符串
					let datas2 = datas.toFixed(2) + "米"; //保留两位小数
					var x = -(datas2.length * 1) //设置文字向左偏移
					let label = {
						fontSize: 14,
						anchorX: x,
						anchorY: 0,
						content: datas2,
						textAlign: 'center',
						color: '#000000',
					}
					this.markers[this.markers.length - 2].label = {};
					this.markers[this.markers.length - 1].label = label;
				} else if (curPoints.length == 1) {
					let label = {
						fontSize: 14,
						anchorX: x,
						anchorY: 0,
						content: '',
						textAlign: 'center',
						color: '#000000',
					}
					this.markers[0].label = label
				}
			},
			// 逆地址解析
			reverseGeocoder(latitude, longitude) {
				var that = this
				qqmapsdk.reverseGeocoder({
					location: {
						latitude: latitude,
						longitude: longitude
					},
					success: function(res) {
						console.log('逆地址解析结果');
						console.log(res)
						var result = res.result
						console.log(result)
						// 地址描述
						let address = result.address
						// 位置描述
						let formatted_addresses = result.formatted_addresses
						// 经过腾讯地图优化过的描述方式， 更具人性化特点
						let recommend = formatted_addresses.recommend
						// 大致位置， 可用于对位置的粗略描述
						let rough = formatted_addresses.rough
						console.log(address)
						console.log(recommend)
						console.log(rough)
						that.address = address
						that.recommend = recommend
						that.rough = rough
						that.title = address
					},
				});
			}
		}
	}
</script>

<style>
	.map-container {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		width: 100%;
		background: #F8F8F7;
	}

	.map {
		width: 100%;
		height: 70vh;
	}

	/* 水平居中，垂直按大头针底部居中 */
	.centerImg {
		width: 50px;
		height: 50px;
		position: absolute;
		top: calc(50% - 50px);
		left: calc(50% - 25px);
	}

	/* 完全居中 */
	/* .current-site-icon {
	  width: 50rpx;
	  height: 50rpx;
	  position: absolute;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%,-50%);
	} */

	.locationBg {
		position: relative;
		left: calc(100% - 90rpx - 30rpx);
		top: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 90rpx;
		height: 90rpx;
		border-radius: 20rpx;
		box-shadow: 0px 0px 5px rgb(200, 200, 200);
		background-color: white;
		display: flex;
		flex-direction: column;
		padding: 5rpx 0px;
	}

	.locationIcon {
		width: 50rpx;
		height: 50rpx;
		min-width: 50rpx;
		min-height: 50rpx;
	}

	.locationText {
		padding-top: 2px;
		font-size: 10px;
	}

	.center-bg {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 300rpx;
		height: 180rpx;
		position: absolute;
		top: calc(50% - 180rpx);
		left: calc(50% - 150rpx);
		/* background: yellow; */
	}

	.center-top {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		width: 100%;
		height: 140rpx;
		font-size: 15px;
		border-radius: 20rpx;
		color: white;
		background: red;
	}

	.center-title {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: 6px;
		white-space: pre-wrap;
		font-size: 12px;
		flex: 7;
	}

	.center-line {
		background: cornsilk;
		height: calc(100% - 24px);
		width: 1px;
		margin: 12px 5px;
	}

	.center-btn {
		width: 50rpx;
		height: 50rpx;
		min-width: 50rpx;
		min-height: 50rpx;
		padding-right: 6px;
		flex: 1;
	}

	.center-btn2 {
		width: 56rpx;
		height: 50rpx;
		min-width: 56rpx;
		min-height: 50rpx;
		padding-right: 6px;
		flex: 1;
	}

	.center-bottom {
		width: 10rpx;
		height: 60rpx;
		background: red;
	}

	.down-arrow {
		width: 0;
		height: 0;
		border-left: 10rpx solid transparent;
		border-right: 10rpx solid transparent;
		border-top: 50rpx solid red;
	}

	.center-bg2 {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 300rpx;
		height: 180rpx;
		position: absolute;
		top: calc(35% - 260rpx);
		left: calc(50% - 150rpx);
	}

	.bottom-alert-bg {
		position: fixed;
		left: 0px;
		bottom: 0px;
		width: 100%;
		/* height: 50px; */
		background-color: #eee;
		z-index: 2;
	}
</style>
