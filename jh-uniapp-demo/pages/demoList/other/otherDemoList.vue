<template>
	<view>
		<base-text-list-view :dataArr="dataArr" @onClick="onClickItem" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "Other",
				dataArr: [{
						title: "base-navbar组件",
						url: './baseNavBarDemo/baseNavBarDemo'
					},
				],
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.title
			})
		},
		methods: {
			onClickItem(item) {
				if (item.url) {
					uni.navigateTo({
						url: item.url
					})
				}
			}
		}
	}
</script>

<style>

</style>
