<template>
	<view>
		<view class="content">
			<image class="logo" src="../../../static/logo.png"></image>
			<view class="appName">{{appName}}</view>
			<view class="versionNum">{{versionNum}}</view>
		</view>
		<view class="footer">Copyright © 2020-2030 Jh. All rights reserved.</view>
	</view>
</template>

<script>
	const ProjectConfig = require('../../../common/configs/projectConfig.js')
	export default {
		data() {
			return {
				appName: ProjectConfig.kAppName,
				versionNum: ProjectConfig.kVersion,
			}
		},
		methods: {

		}
	}
</script>


<style>
	.content {
		height: 600rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.logo {
		width: 140rpx;
		height: 140rpx;
		margin-bottom: 20rpx;
	}

	.name {
		padding-top: 20rpx;
		font-size: 30rpx;
	}

	.versionNum {
		padding-top: 20rpx;
		font-size: 30rpx;
	}

	.footer {
		text-align: center;
		font-size: 24rpx;
		height: 50rpx;
		width: 100%;
		position: fixed;
		bottom: 0;
		margin-bottom: 10rpx;
	}
</style>
