<script>
	export default {
		globalData: {
			name: 'jh-uniapp-demo',
			userType: '',
			isIPhoneX: false, // 当前设备是否为 iPhone X
			kBottomSafeHeight: 0, // X 34 ，其余 0 
			kNetworkType: '', // 网络类型：wifi、2g、3g、4g、5g、unknown、none
			kHasNetwork: true, //是否有网，默认有
			kIsMobileNetwork: false, //是否是手机网络
			kDeviceType: '', //设备类型：android、ios、mac（ 3.1 .10 + ）、windows（ 3.1 .10 + ）、linux（ 3.1 .10 + ）
			kIsAndroid: false,
			kIsIOS: false,
			kSystemInfo: {}, //系统信息
		},
		onLaunch: function() {
			console.log('App Launch')

		},
		onShow: function() {
			console.log('App Show')
			this.$options.getSystemInfo()
			this.$options.checkNetwork()
			// console.log(this.globalData.name) //app.vue页面  
			// console.log(this.$options.globalData.name) //app.vue页面，调用方法也是用这个
			// console.log(getApp().globalData.name)  //其他页面

			console.log('是否为iPhone X：' + this.globalData.isIPhoneX)
			console.log('BottomSafeHeight：' + this.globalData.kBottomSafeHeight)
		},
		onHide: function() {
			console.log('App Hide')
		},
		/* uni-app 全面屏、刘海屏适配（iphoneX适配）及安全区设置 https://ask.dcloud.net.cn/article/id-35564
				"safearea": {
					"background": "#FFFFFF",
					"bottom": {
						"offset": "none"
					}
				}
		*/

		// 获取系统信息
		getSystemInfo: function() {
			console.log('获取系统信息');
			let that = this
			uni.getSystemInfo({
				success: function(res) {
					let safeBottom = res.screenHeight - res.safeArea.bottom
					that.globalData.kBottomSafeHeight = safeBottom
					//根据安全高度判断
					if (safeBottom === 34) {
						that.globalData.isIPhoneX = true
					}
					that.globalData.kDeviceType = res.platform
					that.globalData.kIsAndroid = res.platform === 'android' ? true : false
					that.globalData.kIsIOS = res.platform === 'ios' ? true : false

					// console.log('brand：' + res.brand);
					// console.log('model：' + res.model);
					// console.log('pixelRatio：' + res.pixelRatio);
					// console.log('screenWidth：' + res.screenWidth);
					// console.log('screenHeight：' + res.screenHeight);
					// console.log('windowWidth：' + res.windowWidth);
					// console.log('windowHeight：' + res.windowHeight);
					// console.log('windowTop：' + res.windowTop);
					// console.log('windowBottom：' + res.windowBottom);
					// console.log('statusBarHeight：' + res.statusBarHeight);
					// console.log('navigationBarHeight：' + res.navigationBarHeight);
					// console.log('language：' + res.language);
					// console.log('version：' + res.version);
					// console.log('storage：' + res.storage);
					// console.log('currentBattery：' + res.currentBattery);
					// console.log('appName：' + res.appName);
					// console.log('AppPlatform：' + res.AppPlatform);
					// console.log('host：' + res.host);
					// console.log('app：' + res.app);
					// console.log('cacheLocation：' + res.cacheLocation);
					// console.log('system：' + res.system);
					// console.log('platform：' + res.platform);
					// console.log('safeArea：' + JSON.stringify(res.safeArea));
					// console.log('safeAreaInsets：' + JSON.stringify(res.safeAreaInsets));
					// console.log('deviceId：' + res.deviceId);
				}
			});
		},
		//监测网络变化
		checkNetwork: function() {
			let that = this
			uni.getNetworkType({
				success(res) {
					that.globalData.kNetworkType = res.networkType
					that.globalData.kHasNetwork = (res.networkType == 'none') ? false : true
					if (res.networkType == '2g' || res.networkType == '3g' || res.networkType == '4g' || res.networkType == '5g') {
						that.globalData.kIsMobileNetwork = true
					}
				}
			})
			uni.onNetworkStatusChange(function(res) {
				that.globalData.kNetworkType = res.networkType
				that.globalData.kHasNetwork = (res.networkType == 'none') ? false : true
				if (res.networkType == '2g' || res.networkType == '3g' || res.networkType == '4g' || res.networkType == '5g') {
					that.globalData.kIsMobileNetwork = true
				}
			})
		},

	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* uni.scss  注意要写在第一行，同时给style标签加入lang="scss"属性*/
	@import "uview-ui/index.scss";
	@import '@/common/style/common.css'; //推荐使用scss，在uni.scss导入
</style>
