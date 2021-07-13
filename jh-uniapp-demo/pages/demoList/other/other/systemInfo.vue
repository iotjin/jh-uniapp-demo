<template>
	<view>
		<u-cell-group>
			<u-cell-item title="设备型号" :value="systemInfo.model" :arrow="false"></u-cell-item>
			<u-cell-item title="客户端平台" :value="systemInfo.platform" :arrow="false"></u-cell-item>
			<u-cell-item title="操作系统版本" :value="systemInfo.system" :arrow="false"></u-cell-item>
			<u-cell-item title="语言" :value="systemInfo.language" :arrow="false"></u-cell-item>
			<u-cell-item title="版本" :value="systemInfo.version" :arrow="false"></u-cell-item>
			<u-cell-item title="屏幕宽度" :value="systemInfo.screenWidth" :arrow="false"></u-cell-item>
			<u-cell-item title="屏幕高度" :value="systemInfo.screenHeight" :arrow="false"></u-cell-item>
			<u-cell-item title="可使用窗口高度" :value="systemInfo.windowHeight" :arrow="false"></u-cell-item>
			<u-cell-item title="可使用窗口的顶部位置" :value="systemInfo.windowTop" :arrow="false"></u-cell-item>
			<u-cell-item title="可使用窗口的底部位置" :value="systemInfo.windowBottom" :arrow="false"></u-cell-item>
			<u-cell-item title="状态栏的高度" :value="systemInfo.statusBarHeight" :arrow="false"></u-cell-item>
			<u-cell-item title="DPI" :value="systemInfo.pixelRatio" :arrow="false"></u-cell-item>
			<u-cell-item title="基础库版本" :value="systemInfo.SDKVersion" :arrow="false"></u-cell-item>
		</u-cell-group>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: "获取设备系统信息",
				systemInfo: {}
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.title
			})
			this.getSystemInfo()
		},
		onUnload: function() {
			this.systemInfo = {};
		},
		methods: {
			getSystemInfo: function() {
				console.log('------ 获取系统信息 ---------');
				let that = this
				uni.getSystemInfo({
					success: function(res) {
						that.systemInfo = res
						console.log('brand：' + res.brand);
						console.log('model：' + res.model);
						console.log('pixelRatio：' + res.pixelRatio);
						console.log('screenWidth：' + res.screenWidth);
						console.log('screenHeight：' + res.screenHeight);
						console.log('windowWidth：' + res.windowWidth);
						console.log('windowHeight：' + res.windowHeight);
						console.log('windowTop：' + res.windowTop);
						console.log('windowBottom：' + res.windowBottom);
						console.log('statusBarHeight：' + res.statusBarHeight);
						console.log('navigationBarHeight：' + res.navigationBarHeight);
						console.log('language：' + res.language);
						console.log('version：' + res.version);
						console.log('storage：' + res.storage);
						console.log('currentBattery：' + res.currentBattery);
						console.log('appName：' + res.appName);
						console.log('AppPlatform：' + res.AppPlatform);
						console.log('host：' + res.host);
						console.log('app：' + res.app);
						console.log('cacheLocation：' + res.cacheLocation);
						console.log('system：' + res.system);
						console.log('platform：' + res.platform);
						console.log('safeArea：' + JSON.stringify(res.safeArea));
						console.log('safeAreaInsets：' + JSON.stringify(res.safeAreaInsets));
						console.log('deviceId：' + res.deviceId);
					}
				});
			},

		}
	}
</script>

<style lang="scss">
	.uni-pd {
		padding-left: 30rpx;
	}
</style>
