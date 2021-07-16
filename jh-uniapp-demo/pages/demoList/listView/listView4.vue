<template>
	<view>
		<mescroll-body-diy ref="mescrollRef" @init="mescrollInit" @down="requestData()" @up="requestData(true)" :up="upOption">
			<view id="cell" class="cell" v-for="item in dataArr" :key="item.name" @click="onClickItem(item)">
				<view class="left-view">
					<img class="img" src="https://img.yzcdn.cn/vant/cat.jpeg">
				</view>
				<view class="right-view">
					<view class="name">{{item.name}}</view>
					<view class="content">{{item.content}}</view>
				</view>
			</view>
		</mescroll-body-diy>
	</view>
</template>

<script>
	import MescrollBodyDiy from "@/uni_modules/mescroll-uni/components/mescroll-diy/xinlang/mescroll-body.vue";
	// 引入mescroll-mixins.js
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			MescrollBodyDiy, // 避免与main.js注册的全局组件名称相同,否则注册组件失效(iOS真机 APP HBuilderX2.7.9)
		},
		data() {
			return {
				title: "ListView4 - mescroll分页2",
				upOption: {
					auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					textNoMore: '------ 暂无更多数据 ------', // 没有更多数据的提示文本
				},
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
		},
		methods: {
			onClickItem(item, index) {
				console.log('点击了cell：' + index);
				console.log('item' + JSON.stringify(item));
			},
			requestData(isLoadMore) {
				console.log('requestData========' + isLoadMore);
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
					this.mescroll.endUpScroll(false)
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
					this.mescroll.endSuccess(page, false); //结束mescroll加载
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
					this.mescroll.endSuccess()
				}, 1000);
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
