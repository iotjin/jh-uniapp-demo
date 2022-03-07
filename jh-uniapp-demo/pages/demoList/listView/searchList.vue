<!-- 搜索列表 -->
<template>
	<view>

		<!-- 		<view id="item" class="item-bg" v-for="item in dataArr" :key="item.name" @click="onClickItem(item)">
			<view class="header-bg">
				<view class="header-title">标题标题标题</view>
			</view>
			<view class="header-line"></view>
			<view class="item-row">
				<view class="row-title">敷设单位:</view>
				<view class="row-info">13213212332</view>
				<view class="row-title">区县:</view>
				<view class="row-info">13213212332</view>
			</view>
			<view class="item-row">
				<view class="row-title">保存时间:</view>
				<view class="row-info">2020-02-01</view>
				<view class="row-btn">查看</view>
			</view>
		</view> -->

		<view class="header">
			<u-search v-model="keyword" placeholder="请输入搜索关键词" :show-action="false" shape="square" height="70"
				maxlength="10" @search="onSearch" @change="onChange()"></u-search>
		</view>

		<view class="content-bg">
			<view id="item" class="item-bg" v-for="(item,index) in dataArr" :key="item.name" @click="onClickItem(item)">
				<uni-swipe-action>
					<uni-swipe-action-item :right-options="options" @click="onClickSwipe($event, index)"
						@change="onChangeSwipe($event, index)">
						<view class="header-bg">
							<view class="header-title">{{item.title}}</view>
						</view>
						<view class="header-line"></view>
						<view class="item-row">
							<view class="row-title">内容:</view>
							<view class="row-info">{{item.text}}</view>
							<view class="row-title">名称:</view>
							<view class="row-info">{{item.name2}}</view>
						</view>
						<view class="item-row">
							<view class="row-title">时间:</view>
							<view class="row-info">{{item.dateTime}}</view>
							<view class="row-btn">查看</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>
		</view>

	</view>
</template>

<script>
	const API = require('../../../http/apiConfig.js');

	export default {
		data() {
			return {
				title: "ListView - 搜索列表",
				keyword: '',
				dataArr: [],
				currentPage: 0,
				isLoadAll: false,
				options: [{
					text: '取消',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			}
		},
		onReady() {
			this.requestData()
			uni.setNavigationBarTitle({
				title: this.title
			})
		},
		//需要在 pages.json > style 选项中开启 enablePullDownRefresh。
		// 页面相关事件处理函数--监听用户下拉动作
		onPullDownRefresh: function() {
			this.requestData()
		},
		// 页面上拉触底事件的处理函数
		onReachBottom: function() {
			this.requestData(true)
		},
		methods: {
			onClickItem(item, index) {
				console.log('点击了cell：' + index);
				console.log('item' + JSON.stringify(item));
			},
			onChangeSwipe(e, index) {
				console.log('当前状态：' + e + '，下标：' + index)
			},
			onClickSwipe(e, index) {
				console.log(e)
				console.log(index)
				console.log('点击了' + (e.position === 'left' ? '左侧' : '右侧') + e.content.text + '按钮')
				if (e.content.text == '删除') {
					this.deleteData(index)
				}
			},
			//删除方法
			deleteData(item) {
				console.log("删除")
				uni.showModal({
					title: '提示',
					content: "确认删除？",
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			onSearch(e) {
				this.requestData()
			},
			onChange(e) {
				this.keyword = e
				this.requestData()
			},
			//请求数据
			requestData(isLoadMore) {
				let that = this
				if (isLoadMore) {
					if (this.isLoadAll) {
						uni.showToast({
							title: '暂无更多数据',
							icon: 'none',
						})
						return
					}
					this.currentPage++
				} else {
					this.currentPage = 0
				}

				uni.showNavigationBarLoading()

				let params = {}
				params.keyword = this.keyword ? this.keyword : ''
				params.page = this.currentPage
				params.limit = 15
				console.log(params);

				API.getPageArrDict(params).then(res => {
					uni.hideNavigationBarLoading()
					uni.stopPullDownRefresh()
					uni.hideNavigationBarLoading()
					uni.stopPullDownRefresh()
					if (res.code == 200) {
						let data = res.data
						if (isLoadMore) {
							that.dataArr = that.dataArr.concat(data)
						} else {
							that.dataArr = data
						}
						that.isLoadAll = data.length < 15 ? true : false
					}
				}).catch(error => {
					console.log(err)
					uni.hideNavigationBarLoading()
					uni.stopPullDownRefresh()
					that.currentPage--
					that.currentPage = that.currentPage < 0 ? 0 : that.currentPage
				});
			},
		}
	}
</script>

<style>
	.header {
		width: 100vw;
		position: fixed;
		top: 0;
		z-index: 2;
	}

	.content-bg {
		margin-top: 90rpx;
	}

	.item-bg {
		margin: 0px;
		padding: 10px;
		border-top: 10px solid rgb(244, 244, 244);
	}

	.header-bg {
		display: flex;
		padding: 5px 10px;
	}

	.header-title {
		color: rgb(50, 50, 50);
		font-weight: 500;
	}

	.header-line {
		height: 1px;
		margin: 10px;
		background: rgb(230, 230, 230);
	}

	.item-row {
		display: flex;
		align-items: center;
		padding: 0px 10px 5px;
	}

	.row-title {
		/* flex: 40; */
		font-size: 14px;
		padding-right: 10px;
		color: rgb(162, 162, 162);
	}

	.row-info {
		flex: 60;
		font-size: 14px;
		word-break: break-all;
		color: rgb(100, 100, 100);
	}

	.row-btn {
		margin-right: 10px;
		padding: 5px 15px;
		color: rgb(11, 173, 45);
		border: 1px solid rgb(11, 173, 45);
		border-radius: 5px;
	}
</style>
