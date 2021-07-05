<template>
	<view>
		<view class="btn" @click="onClickBtn">跳转</view>
		<van-button type="warning">警告按钮</van-button>
		<van-cell title="单元格" is-link />
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {

			}
		},
		methods: {
			onClickBtn() {

				let dict = {
					a: 'a',
					b: 'b'
				}
				uni.navigateTo({
					url: './jump/jump?dict=' + JSON.stringify(dict)
				})
			}
		}
	}
</script>

<style>
	.btn {
		width: 200rpx;
		height: 200rpx;
		background: yellow;
	}
</style>
