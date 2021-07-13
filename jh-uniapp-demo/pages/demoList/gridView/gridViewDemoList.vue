<template>
	<view>
		<base-text-list-view :dataArr="dataArr" @onClick="onClickItem" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "GridViewDemoList",
				dataArr: [{
						title: "GridView1 - 动态数据",
						url: './gridView1'
					},
					{
						title: "GridView2 - 固定头尾",
						url: './gridView2'
					},
					{
						title: "GridView3 - 自定义多列",
						url: './gridView3'
					},
					{
						title: "GridView4 - 分组功能列表",
						url: './gridView4'
					},
				],
			}
		},
		methods: {
			onClickItem(item) {
				console.log(item.title);
				uni.navigateTo({
					url: item.url
				})
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.title
			})
		}
	}
</script>

<style>

</style>
