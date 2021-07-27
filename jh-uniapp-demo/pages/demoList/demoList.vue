<template>
	<view>
		<base-text-list-view :dataArr="dataArr" @onClick="onClickItem" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "Demo",
				dataArr: [{
						title: "ListView",
						url: './listView/listViewDemoList'
					},
					{
						title: "GridView",
						url: './gridView/gridViewDemoList'
					},
					{
						title: "ECharts",
						url: './eCharts/eChartsDemoList'
					},
					{
						title: "UI",
						url: ''
					},
					{
						title: "Other",
						url: './other/otherDemoList'
					},
				],
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.title
			})
		},
		methods: {
			onClickItem(item) {
				if (item.url) {
					uni.navigateTo({
						url: item.url
					})
				}
			}
		}
	}
</script>

<style>

</style>
