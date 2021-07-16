<template>
	<view>
		<u-tabs class="header" :list="tabs" :is-scroll="isScroll" :current="currentTabIndex" @change="tabsChange" :active-color="activeColor"></u-tabs>
		<swiper class="content" :style="{height: height}" :current="currentTabIndex" @change="swiperChange">
			<swiper-item v-for="(tab,i) in tabs" :key="i">
				<base-swiper-tabs-item ref="mescrollItem" :i="i" :index="currentTabIndex" :tabs="tabs" :height="height" :url="url" :limit="limit" :params="params"
					@returnData="onReturnData" @emptyClick="emptyClick">
					<slot></slot>
				</base-swiper-tabs-item>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: "base-swiper-tabs",
		props: {
			// 当前tab index
			current: { type: Number, default: 0 },
			tabs: { type: Array, default: () => [] },
			url: { type: String, required: true, default: '' },
			limit: { type: [String, Number], default: '10' },
			params: { type: Object, default: () => ({}), },
		},
		data() {
			return {
				isScroll: false,
				activeColor: '#ee0a24',
				height: 0,
				currentTabIndex: this.current
			};
		},
		mounted() {
			// 需要固定swiper的高度 (需减去悬浮tabs的高度80rpx)
			this.height = uni.getSystemInfoSync().windowHeight - uni.upx2px(80) + 'px'
			this.isScroll = this.tabs.length > 4 ? true : false
		},
		methods: {
			tabsChange(index) {
				this.currentTabIndex = index;
			},
			// 轮播菜单
			swiperChange(e) {
				this.currentTabIndex = e.detail.current
			},
			//点击空布局按钮的回调
			emptyClick() {
				this.$emit("emptyClick");
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

	.header {
		width: 100vw;
		height: 80rpx;
		position: fixed;
		z-index: 1;
		/* #ifdef APP-PLUS */
		top: 0;
		/* #endif */
	}

	.content {
		padding-top: 80rpx;
	}
</style>
