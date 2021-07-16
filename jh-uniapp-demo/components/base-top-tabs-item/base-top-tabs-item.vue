<template>
	<view>
		<!-- 不能用v-if (i: 每个tab页的专属下标;  index: 当前tab的下标; 申明在 MescrollMoreItemMixin )-->
		<view v-show="i === index">
			<!-- top="120"下拉布局往下偏移,防止被悬浮菜单遮住 -->
			<!-- ref动态生成: 字节跳动小程序编辑器不支持一个页面存在相同的ref (如不考虑字节跳动小程序可固定值为 ref="mescrollRef") -->

			<mescroll-uni :ref="'mescrollRef'+i" @init="mescrollInit" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick" :top="top"
				:bottom="bottom">
				<!-- 数据列表 -->
				<slot></slot>
			</mescroll-uni>

		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	import HTTP from '../../http/httpUtils.js'
	export default {
		name: "base-top-tabs-item",
		mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
		props: {
			i: Number, // 每个tab页的专属下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
			index: { type: Number, default: 0 },
			tabs: { type: Array, default: () => [] },
			url: { type: String, required: true, default: '' },
			limit: { type: [String, Number], default: '10' },
			params: { type: Object, default: () => ({}), },
			isShowLoading: { type: Boolean, default: false },
			loadingText: { type: String, default: '正在加载...' },
			// 以下是刷新控件配置项
			isShowToTopBtn: { type: Boolean, default: false },
			top: { type: [String, Number], default: 0 }, //rpx值
			bottom: { type: [String, Number], default: 0 }, //rpx值
		},
		data() {
			return {
				downOption: {
					auto: false // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption: {
					auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					textNoMore: '------ 暂无更多数据 ------', // 没有更多数据的提示文本
					empty: {
						use: true, // 是否显示空布局
						icon: "/static/images/common/ic_empty.png", // 图标路径
						tip: '暂无数据', // 提示
					},
				},
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
