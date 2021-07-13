<template>
	<view>
		<base-text-list-view :dataArr="dataArr" @onClick="onClick" />
	</view>
</template>

<script>
	const TorageUtils = require('../../../common/utils/torageUtils.js')
	const ProjectConfig = require('../../../common/configs/projectConfig.js')
	export default {
		data() {
			return {
				dataArr: [{
						title: "关于",
						url: '../about/about'
					},
					{
						title: "退出",
						url: ''
					},
				],
			}
		},
		methods: {
			onClick(item) {
				if (item.title === "退出") {
					this.onClickExit()
					return
				}
				if (item.url) {
					uni.navigateTo({
						url: item.url
					})
				}
			},
			onClickExit() {
				uni.showLoading({
					title: '正在退出...'
				});
				setTimeout(() => {
					TorageUtils.Jh_setStorageSync(ProjectConfig.kUD_UserInfo, '')
					uni.reLaunch({
						url: '../../login/login'
					});
					uni.showToast({
						icon: 'success',
						title: '退出成功'
					})
					uni.hideLoading()
				}, 1000);
			}
		}
	}
</script>

<style>

</style>
