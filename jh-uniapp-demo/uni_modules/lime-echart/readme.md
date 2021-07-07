# echarts 图表
> 一个基于 JavaScript 的开源可视化图表库 [查看更多](http://liangei.gitee.io/limeui/#/echart) <br>
> 基于 echarts 做了兼容处理，更多示例请访问 [uni示例](http://liangei.gitee.io/limeui/#/echart-example) [官方示例](https://echarts.apache.org/examples/zh/index.html) <br>
> Q群：1046793420 <br>
> echarts v5.1.1


## 平台兼容

| H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ 小程序 | App  |
| --- | ---------- | ------------ | ---------- | ---------- | --------- | ---- |
| √   | √          | √         | √      | √       | √      | √ |


* ✨ **注意**
* 🔔 插件用到了 css 预编译器 [stylus](https://ext.dcloud.net.cn/plugin?name=compile-stylus) 请安装
* 📦 本插件没有对 echarts 内部的方法和样式做过改动，只是使其兼容uniapp。
* 🔔 若 echarts 无法满足于你或有需要特殊能力的请直接去 echarts 提建议
* 👉 若 echarts 有兼容问题可向我反馈。
* 🌈 本插件使用了 `webview` 支持 `nvue`。

## 安装
在uniapp 插件市场 找到 [百度图表](https://ext.dcloud.net.cn/plugin?id=4899) 导入即可

## 使用方式
1、通过`ref`获取节点组件内部 **init** 方法生成图表
```html
<l-echart ref="chart"></l-echart>
```
```js
this.$refs.chart.init(config => {...code})
```

2、通过`ref`获取节点组件内部 **setChart** 方法并 设置 `is-enable`(启用初始化) 生成图表
```html
<l-echart ref="chart" is-enable></l-echart>
```
```js
this.$refs.chart.setChart(chart => {...code})
```

3、通过props 的 **onInit**
```html
<l-echart :onInit="onInit"></l-echart>
```
```js
data() {
	return {
		onInit: config => {
			...code
		}
	}
}
```
4、通过 props 的 **ec**
```html
<l-echart :ec="ec"></l-echart>
```
```js
data() {
	return {
		ec: {
			option: {
				...code
			}
		}
	}
}
```


## 代码演示
### 基础用法
```html
<view style="width: 100%; height:500rpx"><l-echart ref="chart"></l-echart></view>
```

```js
import * as echarts from '@/uni_modules/lime-echart/components/lime-echart/echarts';
import lEchart from '@/uni_modules/lime-echart/components/lime-echart/'
export default {
	components: {lEchart},
	data() {
		return {
			option: {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							// 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						},
						confine: true
					},
					legend: {
						data: ['热度', '正面', '负面']
					},
					grid: {
						left: 20,
						right: 20,
						bottom: 15,
						top: 40,
						containLabel: true
					},
					xAxis: [
						{
							type: 'value',
							axisLine: {
								lineStyle: {
									color: '#999999'
								}
							},
							axisLabel: {
								color: '#666666'
							}
						}
					],
					yAxis: [
						{
							type: 'category',
							axisTick: { show: false },
							data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
							axisLine: {
								lineStyle: {
									color: '#999999'
								}
							},
							axisLabel: {
								color: '#666666'
							}
						}
					],
					series: [
						{
							name: '热度',
							type: 'bar',
							label: {
								normal: {
									show: true,
									position: 'inside'
								}
							},
							data: [300, 270, 340, 344, 300, 320, 310],
							itemStyle: {
								// emphasis: {
								//   color: '#37a2da'
								// }
							}
						},
						{
							name: '正面',
							type: 'bar',
							stack: '总量',
							label: {
								normal: {
									show: true
								}
							},
							data: [120, 102, 141, 174, 190, 250, 220],
							itemStyle: {
								// emphasis: {
								//   color: '#32c5e9'
								// }
							}
						},
						{
							name: '负面',
							type: 'bar',
							stack: '总量',
							label: {
								normal: {
									show: true,
									position: 'left'
								}
							},
							data: [-20, -32, -21, -34, -90, -130, -110],
							itemStyle: {
								// emphasis: {
								//   color: '#67e0e3'
								// }
							}
						}
					]
				},
		};
	},
	mounted() {
		this.$refs.chart.init(config => {
			const { canvas } = config;
			const chart = echarts.init(canvas, null, config);
			canvas.setChart(chart);
			chart.setOption(this.option);
			// 需要把 chart 返回
			return chart;
		});
	}
}
```

### Nvue
本插件通过 `webview` 组件使得 `echarts` 能在 `nvue` 里使用。

* ✨ **温馨提示**
* 👉 webview使用了网络路径，可自行下载放置根目录下的`hybrid`文件夹里再修改路径即可。
* 🛡  **不需要引用echarts JS文件**
* ⚙️ 在函数外面的数据需要通过 props `params` 或 ref `init` | `setChart` 方法的第二个参数传递数据

```html
<view style="height: 750rpx">
	<l-echart ref="chart" isEnable></l-echart>
</view>
```
```js
export default {
	data() {
		return {
			option: {
				// backgroundColor: '#000000',
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						// 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					},
					confine: true
				},
				legend: {
					data: ['热度', '正面', '负面']
				},
				grid: {
					left: 20,
					right: 20,
					bottom: 15,
					top: 40,
					containLabel: true
				},
				xAxis: [
					{
						type: 'value',
						axisLine: {
							lineStyle: {
								color: '#999'
							}
						},
						axisLabel: {
							color: '#666'
						}
					}
				],
				yAxis: [
					{
						type: 'category',
						axisTick: { show: false },
						data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
						axisLine: {
							lineStyle: {
								color: '#999'
							}
						},
						axisLabel: {
							color: '#666'
						}
					}
				],
				series: [
					{
						name: '热度',
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'inside'
							}
						},
						data: [300, 270, 340, 344, 300, 320, 310],
						itemStyle: {
							// emphasis: {
							//   color: '#37a2da'
							// }
						}
					},
					{
						name: '正面',
						type: 'bar',
						stack: '总量',
						label: {
							normal: {
								show: true
							}
						},
						data: [120, 102, 141, 174, 190, 250, 220],
						itemStyle: {
							// emphasis: {
							//   color: '#32c5e9'
							// }
						}
					},
					{
						name: '负面',
						type: 'bar',
						stack: '总量',
						label: {
							normal: {
								show: true,
								position: 'left'
							}
						},
						data: [-20, -32, -21, -34, -90, -130, -110],
						itemStyle: {
							// emphasis: {
							//   color: '#67e0e3'
							// }
						}
					}
				]
			}
		};
	},
	methods: {
		init() {
			this.$refs.chart.setChart(chart => {
				chart.setOption(option)
			}, {option: this.option});
		}
	},
	onReady() {
		this.init();
	}
};
```
## Nvue 使用注意事项
- 由于 nvue 使用的是字符串模板传输，打包的时候会被混淆压缩
- 所在要保持 **关键词** 不被 **混淆压缩**

#### 1、echarts、ecStat 不需要被引入

👎 错误，只会无效的增加打包体积

```js
import * as echarts from '@/uni_modules/lime-echart/components/lime-echart/echarts';
import ecStat from 'echarts-stat';
export default {
	...code
}
```

👍 正确

```js
export default {
	...code
}
```

#### 2、引用函数外面数据的**关键词**不需要声明

👎 错误

```js
const {option} = this
this.$refs.chart.init(config => {
	chart.setOption(option);
})

```

👍 正确

```js
// 所有用函数外里的数据，只要保持跟 this 里的一致
this.$refs.chart.init(config => {
	chart.setOption(option);
})

- or -

this.$refs.chart.init(config => {
	chart.setOption(this.option);
})
```

#### 3、引用函数外面的数据需要通过**params**或函数的第二个参数传递 

👎 错误

```html
<l-f2 />

- or -

this.$refs.chart.init(config => {...code})
```

👍 正确

```html
<l-f2 :params="{option}"/>

- or -

this.$refs.chart.init(config => {...code}, {option: this.option})
```



## 数据更新
- 1、如果是使用ec.option的方式，并设置`is-auto-play`会自动更新图表
- 2、如果是使用 `ref` 的 `init` 创建方式，可获取`setOption`设置更新

```js
this.$refs.chart.setOption(data)
```


## 常见问题
- 微信小程序 `2d` 不支持 真机调试
- 头条系小程序 `2d` 不支持 开发工具预览，也存在划动图表页面无法滚动的问题。
- 通过ec的方式是不支持传递函数
- `toolbox` 不支持
- `echarts-gl` 不支持

## Props

| 参数             | 说明                                                            | 类型             | 默认值        | 版本 	|
| ---------------  | --------                                                        | -------         | ------------ | ----- 	|
| custom-style     | 自定义样式                                                      |   `string`       | -            | -     	|
| type             | 指定 canvas 类, 仅支持微信和头条                                 |    `string`      | `2d`         |   	    |
| ec.option        | [图表配置项](https://echarts.apache.org/zh/option.html#title)   |    `object`      | -            |   	    |
| ec.clear         | 是否开启更新时先删除图表样式                                      |    `boolean`      | `false`            |   	    |
| ec.lazyLoad      | 是否开启延时加载                                                 |    `boolean`      | `false`            |   	    |
| params           | 仅针对nvue的数据传递,同init函数的第二个参数，两选一               |    `object`    | -            | -     	|
| webviewStyles    | 仅针对nvue的webview设置样式                                      |    `object`    | -            | -     	|
| onInit           | 初始化函数                                                      |    `function`    | -            |   	    |
| is-auto-play     | 是否自动更新，`ec.option` 数据 发生改动就更新图表                 |    `boolean`     | `false`     |   	    |
| is-enable        | 是否启用初始化，启用后无须使用`init`                              |    `boolean`     | `false`     |   	    |
| is-clickable     | 是否派发点击事件                                                 |    `boolean`     | `true`     |   	    |
| is-disable-scroll | 触摸图表时是否禁止页面滚动                                       |    `boolean`     | `false`     |   	    |

## 事件

| 参数                    | 说明                                                                                                             |
| ---------------        | ---------------                                                                                                  |
| init(callback)         | 初始化调用函数，**callback**: 回调函数                                           |  
| setChart(chart)        | 已经初始化后，请使用这个函数，**chart**：回调函数参数是图表实例                    |  
| setOption(data)        | [图表配置项](https://echarts.apache.org/zh/option.html#title)，用于更新 ，传递是数据 `option`  |  
| clear()                | 清空当前实例，会移除实例中所有的组件和图表。  |  
| dispose()              | 销毁实例  |  
| showLoading()          | 显示加载  |  
| hideLoading()          | 隐藏加载  |  
| canvasToTempFilePath(opt)  | 用于生成图片  |  


## 打赏
如果你觉得本插件，解决了你的问题，赠人玫瑰，手留余香。  

![输入图片说明](https://cdn.jsdelivr.net/gh/liangei/image@latest/222521_bb543f96_518581.jpeg "微信图片编辑_20201122220352.jpg")