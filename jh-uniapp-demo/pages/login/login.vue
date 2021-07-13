<template>
	<view>
		<!-- <u-navbar title="" :is-back="false" :border-bottom="false"></u-navbar> -->
		<view class="img-bg">
			<image class="logo" src="@/static/logo.png" />
		</view>
		<view class="text">app</view>

		<view class="input-bg">
			<u-field class="input" v-model="account" label="账号" placeholder="请输入账号" clearable>
				<image class="icon" src="@/static/images/ic_account.png" slot="icon"></image>
			</u-field>
			<u-field class="input" v-model="pwd" label="密码" placeholder="请输入密码" password clearable>
				<image class="icon" src="@/static/images/ic_pwd.png" slot="icon"></image>
			</u-field>
		</view>

		<view class="base-submit-btn" style="margin-top:60px;" @click="onClickLogin">登 录</view>

	</view>
</template>

<script>
	const TorageUtils = require('../../common/utils/torageUtils.js')
	const ProjectConfig = require('../../common/configs/projectConfig.js')
	export default {
		data() {
			return {
				account: "",
				pwd: "",
			}
		},
		onReady() {},
		methods: {
			onClickLogin() {
				console.log('点击登录');
				console.log(this.account);
				console.log(this.pwd);

				var userInfo = { account: this.account, pwd: this.pwd }
				console.log(userInfo);

				uni.showLoading({
					title: '正在登录...'
				});
				setTimeout(() => {
					TorageUtils.Jh_setStorageSync(ProjectConfig.kUD_UserInfo, userInfo)
					uni.reLaunch({
						url: '../module1/index'
					});
					uni.showToast({
						icon: 'success',
						title: '登录成功'
					})
					uni.hideLoading()
				}, 1000);
			}
		},

	}
</script>

<style>
	.img-bg {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 80rpx;
	}

	.logo {
		margin-top: 40rpx;
		width: 150rpx;
		height: 150rpx;
		border-radius: 75rpx;
	}

	.text {
		width: 100%;
		text-align: center;
		margin: 60rpx 0;
	}

	.input-bg {
		margin: 30rpx;
	}

	.input {
		padding: 10px 1px;
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30rpx;
		height: 30rpx;
		/* padding-bottom: 4rpx; */
	}
</style>
