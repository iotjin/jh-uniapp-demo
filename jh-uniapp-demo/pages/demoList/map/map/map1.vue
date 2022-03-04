<!-- 地图首页 -->
<template>
	<view class="map-container">
		<map id="myMap" class="map" :latitude="latitude" :longitude="longitude" show-location show-scale :scale="scale"
			enable-zoom>
			<cover-view class="locationBg" style="margin-top: 10px;" @tap='onClickLocation'>
				<cover-image class="locationIcon" src="../../../../static/images/map/ic_location.png" />
				<cover-view class="locationText">定位</cover-view>
			</cover-view>
		</map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: 40.040415,
				longitude: 116.273511,
				scale: 16, //默认16
			};
		},
		mounted() {

		},
		onReady() {
			uni.setNavigationBarTitle({
				title: '腾讯地图'
			})
		},
		onLoad: function() {
			this.mapCtx = wx.createMapContext('myMap')
			this.getCurrentLocation()
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
				// 判断权限
				wx.getSetting({
					success(res) {
						if (!res.authSetting['scope.userLocation']) {
							uni.showToast({
								title: '未授权小程序使用位置权限',
								icon: 'none'
							})
						} else {
							// 有权限
							that.scale = 20
							that.getCurrentLocation()
							that.mapCtx.moveToLocation()
						}
					}
				})
			},
		},
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
		height: 69vh;
	}

	.locationBg {
		position: relative;
		left: calc(100% - 90rpx - 30rpx);
		top: 10px;
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
</style>
