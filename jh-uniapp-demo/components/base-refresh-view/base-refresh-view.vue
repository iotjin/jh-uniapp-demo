<template>
	<!-- 使用参考demo：listView5
	  第一步:父组件添加 ref="mescrollItem"
	 第二步: 引入mescroll-comp.js
	import MescrollCompMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js";
	export default {
		mixins: [MescrollCompMixin],
	
	 https://www.mescroll.com/uni.html#note 第3条; 
	 请参考 mescroll-comp.vue 或 mescroll-more.vue 的案例
	 3. mescroll-body是原生界面的滚动,依赖于onPageScroll和onReachBottom的页面生命周期, 
	 所以mescroll-body尽量不要写在页面的子组件里, 因为子组件无页面的这些生命周期; 
	 如果非要写在子组件中,则需在页面给子组件传入onPageScroll,onReachBottom,否则无法正常滑动列表和触发上拉加载; 
	 强烈推荐参考 mescroll-comp.vue 或 mescroll-more.vue 的案例, 通过mixins传入最简单
	 (或用 mescroll-uni , 无此限制, 无此问题)
	 
	 -->
	<mescroll-body-diy ref="mescrollRef" @init="mescrollInit" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback" @emptyclick="emptyClick" :top="top"
		:bottom="bottom">
		<slot></slot>
	</mescroll-body-diy>

	<!-- 或者使用 mescroll-uni -->
	<!-- 		<mescroll-uni ref="mescrollRef" @init="mescrollInit" :down="downOption" :up="upOption" @down="downCallback" @up="upCallback">
			<slot></slot>
		</mescroll-uni> -->

	</view>
</template>

<script>
	import MescrollBodyDiy from "@/uni_modules/mescroll-uni/components/mescroll-diy/xinlang/mescroll-body.vue";
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import HTTP from '../../http/httpUtils.js'

	export default {
		name: "base-refresh-view",
		mixins: [MescrollMixin], // 使用mixin
		components: {
			MescrollBodyDiy, // 避免与main.js注册的全局组件名称相同,否则注册组件失效(iOS真机 APP HBuilderX2.7.9)
		},
		props: {
			url: { type: String, required: true, default: '' },
			limit: { type: [String, Number], default: '10' },
			params: { type: Object, default: () => ({}), },
			isShowLoading: { type: Boolean, default: false },
			loadingText: { type: String, default: '正在加载...' },
			// 以下是刷新控件配置项
			isShowToTopBtn: { type: Boolean, default: false },
			top: { type: [String, Number], default: 0 }, //rpx值
			bottom: { type: [String, Number], default: 0 }, //rpx值
			downOption: {
				type: Object,
				default: () => ({}),
			},
			upOption: {
				type: Object,
				default: () => ({
					// auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					textNoMore: '------ 暂无更多数据 ------', // 没有更多数据的提示文本
					// noMoreSize: 3, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
					// bgColor: "transparent", // 背景颜色 (建议在pages.json中再设置一下backgroundColorTop)
					// textColor: "gray", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
					// textLoading: '加载中 ...', // 加载中的提示文本
					empty: {
						use: true, // 是否显示空布局
						icon: "/static/images/common/ic_empty.png", // 图标路径
						tip: '暂无数据', // 提示
						// btnText: '去逛逛 >', // 按钮
						// fixed: false, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,最终会降级为absolute)
						// top: "100rpx", // fixed定位的top值 (完整的单位值,如 "10%"; "100rpx")
						// zIndex: 99 // fixed定位z-index值
					},
					toTop: {
						// 回到顶部按钮,需配置src才显示
						src: "", // 图片路径
						// offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000
						// duration: 300, // 回到顶部的动画时长,默认300ms (当值为0或300则使用系统自带回到顶部,更流畅; 其他值则通过step模拟,部分机型可能不够流畅,所以非特殊情况不建议修改此项)
						// zIndex: 9990, // fixed定位z-index值
						// left: null, // 到左边的距离, 默认null. 此项有值时,right不生效. (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
						// right: 20, // 到右边的距离, 默认20 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
						// bottom: 120, // 到底部的距离, 默认120 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
						// safearea: false, // bottom的偏移量是否加上底部安全区的距离, 默认false, 需要适配iPhoneX时使用 (具体的界面如果不配置此项,则取mescroll组件props的safearea值)
						// width: 72, // 回到顶部图标的宽度, 默认72 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
					},
				}),
			},

		},
		data() {
			return {
				currentPage: 0,
				dataArr: []
			};
		},
		mounted() {
			this.mescroll.optUp.toTop.src = this.isShowToTopBtn ? "https://www.mescroll.com/img/mescroll-totop.png" : '';
		},
		methods: {
			// 下拉刷新的回调
			downCallback() {
				this.requestData()
			},
			// 上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10
			upCallback(page) {
				this.requestData(true)
			},
			//点击空布局按钮的回调
			emptyClick() {
				console.log('点击了按钮,具体逻辑自行实现');
				this.$emit("emptyClick");
			},
			hiddenLoading(isSuc, currentDataLength, isNoData) {
				setTimeout(() => {
					// #ifdef MP || H5
					uni.hideNavigationBarLoading()
					// #endif
					if (this.isShowLoading) {
						uni.hideLoading()
					}
					if (isSuc) {
						if (isNoData) {
							console.log('=======');
							//结束mescroll加载
							//dataSize : 当前页获取的数据量(注意是当前页),hasNext : 是否有下一页数据true/false
							this.mescroll.endSuccess(0, false)
							uni.showToast({
								title: '暂无更多数据',
								icon: 'none',
								duration: 1500
							})
						} else {
							this.mescroll.endSuccess(currentDataLength, true)
						}
					} else {
						this.mescroll.endErr()
					}
				}, 300);
			},
			//请求数据
			requestData(isLoadMore) {
				console.log('======== requestData ========' + isLoadMore);
				let url = this.url
				if (!url.length) {
					uni.showToast({
						title: '请求地址为空！',
						icon: 'none',
					})
					return
				}
				var that = this

				// #ifdef MP || H5
				uni.showNavigationBarLoading()
				// #endif
				if (this.isShowLoading) {
					uni.showLoading({
						title: this.loadingText
					})
				}

				if (isLoadMore == true) {
					this.currentPage++
				} else {
					this.currentPage = 0;
					this.dataArr = []
					/* 结束上拉加载的状态 	this.mescroll.endUpScroll()
					isShowNoMore=true, 显示无更多数据;	 isShowNoMore=false, 隐藏上拉加载;  isShowNoMore=null, 保持当前状态					
					*/
					this.mescroll.endUpScroll(false)
					// this.mescroll.resetUpScroll() 
				}

				var newParams = this.params
				newParams.page = this.currentPage
				newParams.limit = this.limit
				HTTP.post(url, this.params).then(res => {
					if (res.code == 200) {
						var data = res.data
						if (!data.length) {
							that.hiddenLoading(true, 0, true)
							return
						}
						if (isLoadMore) {
							that.dataArr = that.dataArr.concat(data)
						} else {
							that.dataArr = data
						}
						that.hiddenLoading(true, data.length, false)
						that.onReturnData(that.dataArr)
					} else {
						that.hiddenLoading(false)
						that.currentPage--
						that.currentPage = that.currentPage < 0 ? 0 : that.currentPage
					}
				}).catch(error => {
					that.hiddenLoading(false)
					that.currentPage--
					that.currentPage = that.currentPage < 0 ? 0 : that.currentPage
				});
			},
			//传出的数据
			onReturnData(data) {
				this.$emit("returnData", data);
			},
		}
	}
</script>

<style>
	/deep/ .mescroll-empty .empty-icon {
		width: 140rpx;
		height: 140rpx;
	}
</style>
