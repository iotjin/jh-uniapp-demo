<template>
	<view>
		<base-text-list-view :dataArr="dataArr" @onClick="onClickItem" />

		<u-select v-model="isShow1" :list="tempList1" @confirm="onConfirm" title="请选择1" />
		<u-select v-model="isShow2" :list="tempList2" mode="mutil-column" @confirm="onConfirm" title="请选择2" />

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "弹框demo",
				isShow1: false,
				isShow2: false,
				isShow3: false,
				isShow4: false,
				dataArr: [
					{ title: "------ 中间弹框 -------" },
					{ title: "中间弹框1" },
					{ title: "中间弹框2" },
					{ title: "------ 底部弹框 -------" },
					{ title: "底部弹框1-单列" },
					{ title: "底部弹框2-多列" },
					{ title: "底部弹框3" },
					{ title: "底部弹框4" },
				],
				tempList1: [{ value: '1', label: '江' }, { value: '2', label: '湖' }],
				tempList2: [[{ value: '1', label: '江' }, { value: '2', label: '湖' }],
							[{ value: '3', label: '夜' }, { value: '4', label: '雨' }]],
			}
		},
		onLoad() {

		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.title
			})
		},
		methods: {
			onCancel() {
				this.isShow1 = false
			},
			onConfirm(e) {
				console.log(JSON.stringify(e));
				console.log(e[0].value + e[0].label);
			},
			onClickItem(item) {
				// 中间弹框
				if (item.title == '中间弹框1') {
					uni.showModal({
						title: '提示',
						content: '这是一个模态弹窗',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
				if (item.title == '中间弹框2') {
					uni.showModal({
						content: '警告',
						showCancel: false,
						confirmText: '好的',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
				// 底部弹框
				if (item.title == '底部弹框1-单列') {
					this.isShow1 = true
				}
				if (item.title == '底部弹框2-多列') {
					this.isShow2 = true
				}
				if (item.title == '底部弹框3') {}
				if (item.title == '底部弹框4') {}
			}
		}
	}
</script>

<style scoped>

</style>
