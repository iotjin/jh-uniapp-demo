<template>
	<view>
		<view class="btn" @click="onClickBtn">跳转</view>
		<!-- #ifdef MP-WEIXIN -->
		<van-button type="warning">警告按钮</van-button>
		<van-cell title="单元格" is-link />
		<!-- #endif -->
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

<style lang="scss">
	.btn {
		width: 200rpx;
		height: 200rpx;
		background: yellow;
	}
</style>
