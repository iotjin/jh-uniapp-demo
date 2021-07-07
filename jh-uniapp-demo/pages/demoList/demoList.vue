<template>
	<view>
		<base-text-list-view :dataArr="dataArr" @onClick="onClick" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "DemoList",
				dataArr: [{
						title: "ListView",
						url: ''
					},
					{
						title: "GridView",
						url: ''
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
						url: ''
					},
				],
			}
		},
		methods: {
			onClick(item) {
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
