<template>
	<view>
		<view style="width: 100%; height:500rpx">
			<l-echart ref="myChart1"></l-echart>
		</view>
		<view style="width: 100%; height:500rpx">
			<l-echart ref="myChart2"></l-echart>
		</view>
		<view style="width: 100%; height:500rpx">
			<l-echart ref="myChart3"></l-echart>
		</view>

		<view class="btn" @click="onClick">获取数据</view>
	</view>
</template>

<script>
	import * as echarts from '@/uni_modules/lime-echart/components/lime-echart/echarts';
	import lEchart from '@/uni_modules/lime-echart/components/lime-echart/'
	export default {
		components: {
			lEchart
		},
		data() {
			return {
				title: "多图表",
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.title
			})
		},
		onReady() {
			this.init_echarts1();
			this.init_echarts2();
			this.init_echarts3();
			setTimeout(() => {
				this.requestData()
			}, 1000);
		},
		methods: {
			onClick() {
				console.log();
				this.requestData();
			},
			//初始化图表
			init_echarts1() {
				var chartData = {
					title: "某地区蒸发量和降水量",
					legendData: ["蒸发量", "降水量"],
					xData: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
					yUnit: ' ml',
					seriesData: [],
				};
				this.$refs.myChart1.init(config => {
					const {
						canvas
					} = config;
					const chart = echarts.init(canvas, null, config);
					canvas.setChart(chart);
					chart.setOption(this.getOption1_Bar(chartData));
					// 需要把 chart 返回
					return chart;
				});
			},
			init_echarts2() {
				var chartData2 = {
					title: 'ECharts-饼图',
					centerText: '总数',
					centerNum: 0,
					legendData: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
					seriesData: [{}, {}, {}, {}, {}, {}]
				};
				this.$refs.myChart2.init(config => {
					const {
						canvas
					} = config;
					const chart = echarts.init(canvas, null, config);
					canvas.setChart(chart);
					chart.setOption(this.getOption2_Pie(chartData2));
					// 需要把 chart 返回
					return chart;
				});
			},
			init_echarts3() {
				var chartData = {
					title: "某地区蒸发量和降水量",
					legendData: ["蒸发量", "降水量"],
					xData: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
					yUnit: ' ml',
					seriesData: [],
				};
				this.$refs.myChart3.init(config => {
					const {
						canvas
					} = config;
					const chart = echarts.init(canvas, null, config);
					canvas.setChart(chart);
					chart.setOption(this.getOption3_Bar(chartData));
					// 需要把 chart 返回
					return chart;
				});
			},
			//柱状图配置
			getOption1_Bar: function(chartData) {
				var option = {
					color: ['#3398DB', '#EB5E5E'],
					title: {
						left: 'center',
						text: chartData.title,
					},
					grid: {
						left: '3%',
						right: '2%',
						containLabel: true
					},
					//坐标轴触发，。   'item'  , 'axis' ,'none'
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						bottom: 10,
						data: chartData.legendData
					},
					xAxis: [{
						data: chartData.xData,
						axisLabel: {
							interval: 0
						}
					}],
					yAxis: {
						name: chartData.yUnit ? chartData.yUnit : '',
						axisLine: {
							show: true,
						},
						axisTick: {
							show: true
						}
					},
					series: chartData.seriesData
				}
				return option
			},
			//饼图配置
			getOption2_Pie: function(chartData) {
				var option = {
					title: {
						left: 'center',
						text: chartData.title,
					},
					grid: {
						left: '5%',
						right: '5%',
						containLabel: true
					},
					//提示
					tooltip: {
						trigger: 'item',
						formatter: '{b}: {d}%'
					},
					// legend: {
					//   orient: 'vertical',
					//   left: 10,
					//   data: chartData.legendData,
					// },
					// 设置环形中间的数据。默认center为中间，如果图表位置变化了，中间文字是不变的。
					graphic: [{
						type: 'text',
						left: 'center',
						top: '45%',
						style: {
							fill: '#686868',
							text: chartData.centerText
						}
					}, {
						type: 'text',
						left: 'center',
						top: '50%',
						z: 10,
						style: {
							// fontSize: '30px',
							text: chartData.centerNum,
						}
					}],
					series: [{
						name: '访问来源',
						type: 'pie',
						minShowLabelAngle: 10, //小于10度不展示
						stillShowZeroSum: true, //数据和为0 显示扇区。
						center: ['50%', '50%'], //圆心坐标
						radius: ['40%', '60%'],
						avoidLabelOverlap: false, //避免标注重叠
						labelLine: { //设置延长线的长度
							normal: {
								length: 3, //设置延长线的长度
								length2: 5, //设置第二段延长线的长度
							}
						},
						label: {
							// normal: {
							//   show: true,
							// }
							// formatter: '{b}: {d}%',
							formatter: '{b|{b}:} \n {d|{d}%}',
							rich: {
								b: {
									color: '#646464',
									fontSize: 10,
								},
								d: {
									color: '#3398DB',
									fontSize: 12,
								}
							}
						},
						data: chartData.seriesData
					}]
				}
				return option
			},
			//柱状图配置 2
			getOption3_Bar: function(chartData) {
				var option = {
					color: ['#3398DB', '#EB5E5E'],
					title: {
						left: 'center',
						text: chartData.title,
					},
					grid: {
						left: '3%',
						right: '4%',
						containLabel: true
					},
					//坐标轴触发，。   'item'  , 'axis' ,'none'
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						bottom: 10,
						data: chartData.legendData
					},
					xAxis: [{
						data: chartData.xData
					}],
					yAxis: {
						name: chartData.yUnit ? chartData.yUnit : '',
						axisLine: {
							show: true,
						},
						axisTick: {
							show: true
						}
					},
					series: [{
						type: 'bar',
						label: {
							show: true,
							position: 'top'
						},
						name: chartData.legendData,
						data: chartData.seriesData
					}]
				}
				return option
			},
			//网络请求
			requestData() {
				this.requestChartData1()
				this.requestChartData2()
				this.requestChartData3()
			},
			requestChartData1() {
				this.$refs.myChart1.showLoading()
				var dataArr = [{
						name: "蒸发量",
						data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3, ],
						barGap: 0,
						barMaxWidth: 6,
					},
					{
						name: "降水量",
						data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3, ],
						barGap: 0,
						barMaxWidth: 6,
					},
				];
				for (var i = 0; i < dataArr.length; i++) {
					var dic = dataArr[i];
					dic["type"] = "bar";
					dic["label"] = {
						show: true, //开启显示
						position: "top", //在上方显示
						distance: i == 0 ? 5 : 10,
						// rotate: 15,
						// offset: [20, 0],
						formatter: function(val) {
							if (val.value !== 0) {
								return val.value;
							} else {
								return "";
							}
						},
						fontSize: 12,
						color: "black",
					};
				}
				var chartData = {
					title: "某地区蒸发量和降水量",
					legendData: ["蒸发量", "降水量"],
					xData: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
					yUnit: ' ml',
					seriesData: dataArr,
				};
				setTimeout(() => {
					this.$refs.myChart1.setOption(this.getOption1_Bar(chartData), true);
					this.$refs.myChart1.hideLoading()
				}, 2000);
			},
			requestChartData2() {
				this.$refs.myChart2.showLoading()
				var chartData = [{
						value: 335,
						name: '直接访问'
					},
					{
						value: 310,
						name: '邮件营销'
					},
					{
						value: 234,
						name: '联盟广告'
					},
					{
						value: 135,
						name: '视频广告'
					},
					{
						value: 1548,
						name: '搜索引擎'
					}
				];
				var chartData2 = {
					title: 'ECharts-饼图',
					centerText: '总数',
					centerNum: 3221,
					legendData: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
					seriesData: chartData
				};
				setTimeout(() => {
					this.$refs.myChart2.setOption(this.getOption2_Pie(chartData2), true);
					this.$refs.myChart2.hideLoading()
				}, 2000);
			},
			requestChartData3() {
				this.$refs.myChart3.showLoading()
				var chartData3 = {
					title: '柱状图',
					legendData: ['类型'],
					xData: ['2019', '2020'],
					yUnit: ' ml',
					seriesData: [120, 200]
				};
				setTimeout(() => {
					this.$refs.myChart3.setOption(this.getOption3_Bar(chartData3), true);
					this.$refs.myChart3.hideLoading()
				}, 2000);
			}

		},
	}
</script>

<style>
	.btn {
		width: 100px;
		height: 30px;
		background: yellow;
	}
</style>
