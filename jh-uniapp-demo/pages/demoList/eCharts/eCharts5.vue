<template>
	<view>
		<view style="width: 100%; height:500rpx">
			<l-echart ref="myChart1"></l-echart>
		</view>
		<view class="s">
			<view>

			</view>
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
				title: "渐变折线图",
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.title
			})
		},
		onReady() {
			this.init_echarts1();
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
					title: "今日温度",
					legendData: ["最高温度", "最低温度", "平均温度"],
					xData: ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00',
						'11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
						'21:00', '22:00', '23:00', '00:00'],
					seriesData: [],
				};
				this.$refs.myChart1.init(config => {
					const {
						canvas
					} = config;
					const chart = echarts.init(canvas, null, config);
					canvas.setChart(chart);
					chart.setOption(this.getOption1(chartData));
					// 需要把 chart 返回
					return chart;
				});
			},
			//图表配置
			getOption1(chartData) {
				var option = {
					title: {
						left: 'center',
						text: chartData.title,
					},
					color: ['#527FFD', '#00DEB7', '#FBEC4B'],
					grid: {
						left: '3%',
						right: '2%',
						containLabel: true
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							crossStyle: {
								color: '#999'
							}
						},
						formatter: function(params) {
							var relVal = params[0].name
							for (var i = 0, l = params.length; i < l; i++) {
								// relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value + '°C'
								relVal += '\n' + params[i].marker + params[i].seriesName + ' : ' + params[i]
									.value + '°C'
							}
							return relVal
						},
					},
					legend: {
						bottom: 10,
						data: chartData.legendData,
						icon: "circle",
						itemWidth: 10,
						itemHeight: 10,
						selected: {
							'最高温度': true,
							'最低温度': true,
							'平均温度': false
						}
					},
					xAxis: [{
						type: 'category',
						data: chartData.xData,
						axisPointer: {
							type: 'shadow'
						}
					}],
					yAxis: [{
						type: 'value',
						name: '摄氏度',
						min: 0,
						max: 120,
						interval: 20,
						axisLabel: {
							formatter: '{value}'
						}
					}, ],
					series: chartData.seriesData
				}
				return option
			},
			requestData() {
				this.$refs.myChart1.showLoading()
				var dataArr = [{
						name: '最高温度',
						type: 'line',
						symbol: 'none', //去掉折线图中的节点
						smooth: true, //true 为平滑曲线，false为直线
						areaStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
										offset: 0,
										color: '#6884CD' // 0% 处的颜色 
									},
									{
										offset: 1,
										color: '#FFFFFF' // 100% 处的颜色
									}
								],
							}
						},
						data: [2.8, 6.9, 8.4, 25.4, 26.7, 80.7, 78.6, 65.2, 50.7, 20.8, 10.0, 5.3, 4.6,
						6.9, 10.0, 25.4, 26.7, 75.7, 80.6, 70.2, 66.7, 20.8, 8.0, 3.3]
					},
					{
						name: '最低温度',
						type: 'line',
						symbol: 'none', //去掉折线图中的节点
						smooth: true, //true 为平滑曲线，false为直线
						areaStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
										offset: 0,
										color: '#00DEB7' // 0% 处的颜色 
									},
									{
										offset: 1,
										color: '#FFFFFF' // 100% 处的颜色
									}
								],
							}
						},
						data: [2.0, 2.2, 3.3, 4.5, 6.3, 20.2, 30.3, 43.4, 33.0, 26.5, 12.0, 6.2, 2.0,
						2.2, 3.3, 4.5, 6.3, 20.2, 30.3, 43.4, 33.0, 26.5, 12.0, 6.2]
					},
					{
						name: '平均温度',
						type: 'line',
						symbol: 'none', //去掉折线图中的节点
						smooth: true, //true 为平滑曲线，false为直线
						areaStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
										offset: 0,
										color: '#fdc43c' // 0% 处的颜色 
									},
									{
										offset: 1,
										color: '#FFFFFF' // 100% 处的颜色
									}
								],
							}
						},
						data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 78.6, 60.2, 48.7, 18.8, 6.0, 2.3,
						 2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 78.6, 60.2, 48.7, 18.8, 6.0, 2.3]
					}
				];
				var chartData = {
					title: "今日温度",
					legendData: ["最高温度", "最低温度", "平均温度"],
					xData: ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
						'17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00'],
					seriesData: dataArr,
				};
				setTimeout(() => {
					this.$refs.myChart1.setOption(this.getOption1(chartData), true);
					this.$refs.myChart1.hideLoading()
				}, 1000);
			},
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
