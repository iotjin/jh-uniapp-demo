<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	const ProjectConfig = require('../../common/configs/projectConfig.js')
	const TorageUtils = require('../../common/utils/torageUtils.js')
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {},
		onShow() {
			this.switchPage()
		},
		methods: {
			switchPage() {
				let userInfo = TorageUtils.Jh_getStorageSync(ProjectConfig.kUD_UserInfo)
				console.log(userInfo);
				if (userInfo) {
					console.log('跳转主页');
					uni.reLaunch({
						url: '../module1/index'
					});
				} else {
					console.log('跳转登录页');
					uni.reLaunch({
						url: '../login/login'
					});
				}
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
