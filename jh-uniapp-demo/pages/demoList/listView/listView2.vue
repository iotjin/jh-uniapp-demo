<template>
	<view>
		<view id="cell" class="cell" v-for="(item, index) in dataArr" :key="index" @click="onClickItem(item, index)">
			<view class="left-view">
				<img class="img" src="https://img.yzcdn.cn/vant/cat.jpeg">
			</view>
			<view class="right-view">
				<view class="name">{{item.name}}</view>
				<view class="content">{{item.content}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "ListView2 - 默认下拉刷新假数据",
				currentPage: 0, //当前页码
				pageSize: 15,
				isLoadAll: false, //已经加载全部数据
				dataArr: []
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.title
			})
			uni.startPullDownRefresh()
			this.requestData()
		},
		onPullDownRefresh() {
			console.log('下拉刷新===========');
			this.requestData()
		},
		onReachBottom() {
			console.log('上拉加载===========');
			this.requestData(true)
		},
		onBackPress() {
			console.log('点击返回===========');
		},
		methods: {
			onClickItem(item, index) {
				console.log('点击了cell：' + index);
				console.log('item' + JSON.stringify(item));
			},
			//需要在 pages.json > style 选项中开启 enablePullDownRefresh。
			requestData(isLoadMore) {
				// #ifdef MP || H5
				uni.showNavigationBarLoading()
				// #endif
				uni.showLoading({
					title: '加载中...'
				})
				if (isLoadMore) {
					this.currentPage++
				} else {
					this.currentPage = 0;
					this.dataArr = []
				}

				let page = this.currentPage
				let count = this.pageSize
				let mArr = []
				for (let index = page * count; index < (isLoadMore ? (page * count + count) : count); index++) {
					let dict = {}
					dict.id = index
					dict.name = '姓名' + index
					dict.content = "这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容"
					dict.title = `00我是title${index}`
					dict.desc = '00这是一段测试文字'
					dict.img = 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg'
					mArr.push(dict)
				}
				if (this.dataArr.length >= 40) {
					// #ifdef MP || H5
					uni.hideNavigationBarLoading()
					// #endif
					uni.hideLoading()
					uni.stopPullDownRefresh();
					uni.showToast({
						title: '暂无更多数据'
					})
					return
				}
				setTimeout(() => {
					if (isLoadMore) {
						this.dataArr = this.dataArr.concat(mArr)
					} else {
						this.dataArr = mArr
					}
					// #ifdef MP || H5
					uni.hideNavigationBarLoading()
					// #endif
					uni.hideLoading()
					uni.stopPullDownRefresh();
				}, 2000);

			}
		}
	}
</script>

<style>
	.cell {
		display: flex;
		width: 100%;
		background-color: white;
		border-bottom: 1px solid rgb(230, 230, 230);
	}

	.left-view {
		width: 70px;
		text-align: center;
		line-height: 70px;
	}

	.img {
		width: 50px;
		height: 50px;

		vertical-align: middle;
	}

	.right-view {
		flex: 1;
	}

	.name {
		margin-top: 10px;
		margin-left: 8px;
		font-size: 18px;
	}

	.content {
		margin-top: 8px;
		margin-left: 8px;
		margin-right: 10px;
		margin-bottom: 10px;
		color: gray;
		font-size: 15px;
	}
</style>
