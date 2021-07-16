<template>
	<view>
		<u-tabs class="header" :list="tabs" :is-scroll="isScroll" :current="tabIndex" @change="tabsChange" :active-color="activeColor"></u-tabs>

		<base-top-tabs-item ref="mescrollItem" v-for="(tab,i) in tabs" :key="i" :i="i" :index="tabIndex" :tabs="tabs" :url="url" :limit="limit" :params="params"
			@returnData="onReturnData" @emptyClick="emptyClick" :top="top">
			<slot></slot>
		</base-top-tabs-item>

	</view>
</template>

<script>
	export default {
		name: "base-top-tabs",
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
				top: 80,
				tabIndex: this.current
			};
		},
		mounted() {
			this.isScroll = this.tabs.length > 4 ? true : false
		},
		methods: {
			tabsChange(index) {
				this.tabIndex = index;
			},
			// 轮播菜单
			swiperChange(e) {
				this.tabIndex = e.detail.current
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
</style>
