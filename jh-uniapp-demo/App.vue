<script>
	export default {
		globalData: {
			name: 'jh-uniapp-demo',
			isIPhoneX: false, // 当前设备是否为 iPhone X
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			// console.log(this.$options.globalData.name) //本页面 
			// console.log(getApp().globalData.name)  //其他页面

			console.log('是否为iPhone X：' + this.$options.globalData.isIPhoneX);
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* uni.scss  注意要写在第一行，同时给style标签加入lang="scss"属性*/
	@import "uview-ui/index.scss";
	// @import '@/common/style/common.css';
	@import '@/common/style/common.scss'; //推荐使用scss
</style>
