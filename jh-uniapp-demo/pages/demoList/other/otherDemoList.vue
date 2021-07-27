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
						url: './other/baseNavBarDemo'
					},
					{
						title: "弹框组件",
						url: './other/alertDemo'
						},
					{
						title: "获取设备系统信息",
						url: './other/systemInfo',
					}, {
						title: "AES、RSA、SHA256、MD5、base64使用",
						url: './other/encryptDemo',
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
