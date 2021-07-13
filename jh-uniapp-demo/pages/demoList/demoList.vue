<template>
	<view>
		<base-text-list-view :dataArr="dataArr" @onClick="onClickItem" />
	</view>
</template>

<script>
	const ProjectConfig = require('../../common/configs/projectConfig.js')
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
						url: './other/otherDemoList'
					},
				],
			}
		},
		methods: {

			onClickItem(item) {
				console.log(getApp().globalData.name)
				getApp().globalData.name = '123'
				console.log(getApp().globalData.name)
				console.log('---------');
				console.log(ProjectConfig.kAppName);
				ProjectConfig.kAppName = "哈哈哈"
				console.log(ProjectConfig.kAppName);

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
