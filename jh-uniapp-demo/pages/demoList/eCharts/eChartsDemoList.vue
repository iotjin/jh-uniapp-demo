<template>
	<view>
		<base-text-list-view :dataArr="dataArr" @onClick="onClick" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "EChartsDemoList",
				dataArr: [{
						title: "柱状图-异步加载",
						url: './eCharts1'
					},
					{
						title: "柱状图-异步加载2",
						url: './eCharts2'
					},
					{
						title: "多图表",
						url: './eCharts3'
					},
					{
						title: "柱状图折线图混合图表",
						url: './eCharts4'
					},
					{
						title: "渐变折线图",
						url: './eCharts5'
					},
				],
			}
		},
		methods: {
			onClick(item) {
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
