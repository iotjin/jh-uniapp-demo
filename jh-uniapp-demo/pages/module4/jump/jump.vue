<template>
	<view>
		<view>传过来的值: </view>
		<view> {{text}} </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: ''
			}
		},
		methods: {

		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: '跳转传值'
			})
			let dict = JSON.parse(options.dict)
			console.log(dict);
			console.log(dict.a);
			this.text = options.dict
		}
	}
</script>

<style>

</style>
