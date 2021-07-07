<template>
	<view class="l-echart" :style="customStyle" v-if="canvasId">
		<!-- #ifndef APP-NVUE -->
		<canvas
			class="l-echart__canvas"
			v-if="use2dCanvas"
			type="2d"
			:id="canvasId"
			:style="'width:' + width + 'px;height:' + height + 'px'"
			:disable-scroll="isDisableScroll"
			@touchstart="touchStart"
			@touchmove="touchMove"
			@touchend="touchEnd"
		/>
		<canvas
			class="l-echart__canvas"
			v-else
			:width="nodeWidth"
			:height="nodeHeight"
			:style="'width:' + width + 'px;height:' + height + 'px'"
			:canvas-id="canvasId"
			:id="canvasId"
			:disable-scroll="isDisableScroll"
			@touchstart="touchStart"
			@touchmove="touchMove"
			@touchend="touchEnd"
		/>
		<!-- #endif -->
		<!-- #ifdef APP-NVUE -->
		<web-view
			class="l-echart__canvas"
			:id="canvasId"
			:webview-styles="webviewStyles"
			ref="webview"
			src="http://liangei.gitee.io/limeui/hybrid/html/lime-ui/lime-echart/index.html?v=0.2.3"
			@pagefinish="finished = true"
			@onPostMessage="onMessage"
		></web-view>
		<!-- #endif -->
	</view>
</template>
<script>
// #ifndef APP-NVUE
import Canvas from './canvas';
import * as echarts from './echarts';
import { compareVersion, wrapTouch, devicePixelRatio } from './utils';
// #endif
// #ifdef APP-NVUE
import { base64ToPath } from './utils';
// #endif
export default {
	// version: '0.2.9' 
	name: 'l-echart',
	props: {
		// #ifdef MP-WEIXIN || MP-TOUTIAO
		type: {
			type: String,
			default: '2d'
		},
		// #endif
		ec: {
			type: Object,
			default: () => {}
		},
		onInit: Function,
		// #ifdef APP-NVUE
		webviewStyles: Object,
		params: {
			type: Object,
			default: () => {}
		},
		// #endif
		customStyle: String,
		isAutoPlay: Boolean,
		isDisableScroll: Boolean,
		isEnable: Boolean,
		isClickable: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			// #ifdef MP-WEIXIN || MP-TOUTIAO
			use2dCanvas: true,
			// #endif
			// #ifndef MP-WEIXIN || MP-TOUTIAO
			use2dCanvas: false,
			// #endif
			width: null,
			height: null,
			nodeWidth: null,
			nodeHeight: null,
			canvasNode: null,
			config: {},
			inited: false,
			finished: false,
			file: '',
			platform: ''
		};
	},
	computed: {
		canvasId() {
			return `l-echart${this._uid}`
		}
	},
	watch: {
		'ec.option': {
			deep: true,
			handler(val, oldVal) {
				if(this.isAutoPlay) {
					if(this.ec.clear){this.clear()}
					this.setOption(val);
				}
			}
		}
	},
	beforeDestroy() {
		this.clear()
		this.dispose()
	},
	created() {
		// #ifdef APP-NVUE
		// this.parent = this.getParent()
		// #endif
		// #ifndef APP-NVUE
		echarts.registerPreprocessor(option => {
			if (option && option.series) {
				if (option.series.length > 0) {
					option.series.forEach(series => {
						series.progressive = 0;
					});
				} else if (typeof option.series === 'object') {
					option.series.progressive = 0;
				}
			}
		});
		// #ifdef MP-WEIXIN || MP-TOUTIAO
		const { SDKVersion, version, platform, environment } = uni.getSystemInfoSync();
		// #endif
		// #ifdef MP-WEIXIN
		this.isPC = /windows/i.test(platform)
		this.use2dCanvas = this.type === '2d' && compareVersion(SDKVersion, '2.9.2') >= 0 && !((/ios/i.test(platform) && /7.0.20/.test(version)) || /wxwork/i.test(environment)) && !this.isPC;
		// #endif
		// #ifdef MP-TOUTIAO
		this.isPC = /devtools/i.test(platform)
		this.use2dCanvas = this.type === '2d' && compareVersion(SDKVersion, '1.78.0') >= 0;
		// #endif
		// #endif
	},
	
	mounted() {
		if(this.ec && !this.ec?.lazyLoad || this.isEnable) {
			if(!this.onInit) {
				this.init();
				return
			}
		}
		if(this.onInit) {
			this.init(this.onInit)
		}
	},
	methods: {
		// #ifdef APP-NVUE
		getParent() {
			let parent = this.$parent;
			let parentRefs = Object.values(parent.$refs)
			while(!parentRefs.length || parentRefs.find((v) => v._uid && v.uid == this._uid)) {
				parent = parent.$parent
				parentRefs = Object.values(parent.$refs)
				if (!parent) return false
			}
			return parent;
		},
		getWebview() {
			if(this.finished) {
				return Promise.resolve(this.finished)
			}
			return new Promise(resolve => {
				this.$watch('finished', (val) => {
					if(val) {
						resolve(this.finished)
					}
				})
			})
		},
		onMessage(e) {
			const res = e?.detail?.data[0] || null;
			if (res?.event) {
				if(res.event === 'inited') {
					this.inited = true
				}
				this.$emit(res.event, JSON.parse(res.data));
			} else if(res?.file){
				this.file = res.data
			} else if(!res[0] && JSON.stringify(res[0]) != '{}'){
				console.error(res);
			}
		},
		// #endif
		async setChart(callback, params) {
			await this.enabled()
			// #ifndef APP-NVUE
			if(typeof callback === 'function' && this.chart) {
				await callback(this.chart);
			}
			// #endif
			// #ifdef APP-NVUE
			if(typeof callback === 'function') {
				this.$refs.webview.evalJs(`setChart(${JSON.stringify(callback.toString())}, ${JSON.stringify(params || this.params)})`);
			}
			// #endif
		},
		async setOption(val) {
			await this.enabled()
			// #ifndef APP-NVUE
			if (!this.chart || !this.chart.setOption) {
				console.warn(`组件还未初始化`)
			} else {
				this.chart.setOption(val);
			}
			// #endif
			// #ifdef APP-NVUE
			if(val) {
				this.$refs.webview.evalJs(`setOption(${JSON.stringify(val)}`);
			}
			// #endif
		},
		async showLoading() {
			// #ifndef APP-NVUE
			await this.enabled()
			if(this.chart) {
				this.chart.showLoading()
			}
			// #endif
			// #ifdef APP-NVUE
			this.$refs.webview.evalJs(`showLoading()`);
			// #endif
		},
		hideLoading() {
			// #ifndef APP-NVUE
			if(this.chart) {
				this.chart.hideLoading()
			}
			// #endif
			// #ifdef APP-NVUE
			this.$refs.webview.evalJs(`hideLoading()`);
			// #endif
		},
		clear() {
			// #ifndef APP-NVUE
			if(this.chart) {
				this.chart.clear()
			}
			// #endif
			// #ifdef APP-NVUE
			this.$refs.webview.evalJs(`clear()`);
			// #endif
		},
		dispose() {
			// #ifndef APP-NVUE
			if(this.chart) {
				this.chart.dispose()
			}
			// #endif
			// #ifdef APP-NVUE
			this.$refs.webview.evalJs(`dispose()`);
			// #endif
		},
		canvasToTempFilePath(args = {}) {
			// #ifndef APP-NVUE
			const { use2dCanvas, canvasId, canvasNode } = this;
			return new Promise((resolve, reject) => {
				const copyArgs = Object.assign({
					canvasId,
					success: resolve,
					fail: reject
				}, args);
				if (use2dCanvas) {
					delete copyArgs.canvasId;
					copyArgs.canvas = canvasNode;
				}
				uni.canvasToTempFilePath(copyArgs, this);
			});
			// #endif
			// #ifdef APP-NVUE
			this.file = ''
			this.$refs.webview.evalJs(`canvasToTempFilePath()`);
			return new Promise((resolve, reject) => {
				this.$watch('file', async (file) => {
					if(file) {
						const tempFilePath = await base64ToPath(file)
						resolve(args.success({tempFilePath}))
					} else {
						reject(args.fail({error: ``}))
					}
				})
			})
			// #endif
		},
		async init(callback, params) {
			
			
			
			// #ifndef APP-NVUE
			let config = await this.getContext();
			if(typeof callback === 'function') {
				this.chart = await callback(config);
			} else {
				const {canvas} = config
				this.chart = echarts.init(canvas, null, config);
				canvas.setChart(this.chart);
				if(this.ec && this.ec.option) {
					this.setOption(this.ec.option)
				}
				this.inited = true
				this.$emit('inited', true)
			}
			// #endif
			// #ifdef APP-NVUE
			await this.getWebview()
			if(typeof callback === 'function') {
				this.$refs.webview.evalJs(`init(${JSON.stringify(callback.toString())}, ${JSON.stringify(params || this.params)})`);
			} else {
				this.$refs.webview.evalJs(`init()`);
				if(this.ec && this.ec.option) {
					this.setOption(this.ec.option)
				}
			}
			// #endif
		},
		async enabled() {
			if(this.isEnable) {
				// #ifndef APP-NVUE
				await this.getContext();
				// #endif
				// #ifdef APP-NVUE
				if(this.inited) {
					return Promise.resolve(this.inited)
				}
				return new Promise(resolve => {
					this.$watch('inited', (val) => {
						if(val) {
							resolve(this.inited)
						}
					})
				})
				// #endif
			}
		},
		// #ifndef APP-NVUE
		getContext() {
			const { use2dCanvas, type = '2d', config } = this;
			let dpr = devicePixelRatio
			if (config.canvas) {
				return Promise.resolve(config);
			}
			if (use2dCanvas) {
				return new Promise(resolve => {
					uni.createSelectorQuery()
						.in(this)
						.select(`#${this.canvasId}`)
						.fields({
							node: true,
							size: true
						})
						.exec(res => {
							let { node, width, height } = res[0];
							width = width || 300;
							height = height || 300;
							const ctx = node.getContext(type);
							// #ifdef MP-WEIXIN
							node.width = width * dpr;
							node.height = height * dpr;
							// #endif
							// #ifdef MP-TOUTIAO
							// dpr = 1
							// #endif
							const canvas = new Canvas(ctx, this.canvasId, true, node);
							echarts.setCanvasCreator(() => canvas);
							this.canvasNode = node
							this.config = { canvas, width, height, devicePixelRatio: dpr };
							resolve(this.config);
						});
				});
			}
			return new Promise(resolve => {
				uni.createSelectorQuery()
					.in(this)
					.select(`#${this.canvasId}`)
					.boundingClientRect()
					.exec(res => {
						if (res) {
							let { width, height } = res[0];
							width = width || 300;
							height = height || 300;
							// #ifdef MP-TOUTIAO
							dpr = !this.isPC ? devicePixelRatio : 1// 1.25
							// #endif
							// #ifdef MP-ALIPAY
							dpr = devicePixelRatio
							// #endif
							// #ifndef MP-ALIPAY || MP-TOUTIAO
							dpr = this.isPC ? devicePixelRatio : 1
							// #endif
							this.nodeWidth = width * dpr ;
							this.nodeHeight = height * dpr ;
							const ctx = uni.createCanvasContext(this.canvasId, this);
							const canvas = new Canvas(ctx, this.canvasId, false);
							echarts.setCanvasCreator(() => canvas);
							this.config = { canvas, width, height, devicePixelRatio: dpr };
							resolve(this.config);
						}
					});
			});
		},
		touchStart(e) {
			if (this.chart && e.touches.length > 0) {
				var touch = e.touches[0];
				var handler = this.chart.getZr().handler;
				handler.dispatch('mousedown', {
					zrX: touch.x,
					zrY: touch.y
				});
				handler.dispatch('mousemove', {
					zrX: touch.x,
					zrY: touch.y
				});
				handler.processGesture(wrapTouch(e), 'start');
			}
		},
		touchMove(e) {
			if (this.chart && e.touches.length > 0) {
				var touch = e.touches[0];
				var handler = this.chart.getZr().handler;
				handler.dispatch('mousemove', {
					zrX: touch.x,
					zrY: touch.y
				});
				handler.processGesture(wrapTouch(e), 'change');
			}
		},
		touchEnd(e) {
			if (this.chart) {
				const touch = e.changedTouches ? e.changedTouches[0] : {};
				var handler = this.chart.getZr().handler;
				handler.dispatch('mouseup', {
					zrX: touch.x,
					zrY: touch.y
				});
				if(this.isClickable) {
					handler.dispatch('click', {
						zrX: touch.x,
						zrY: touch.y
					});
				}
				handler.processGesture(wrapTouch(e), 'end');
			}
		}
		// #endif
	}
};
</script>
<style scoped lang="stylus">
full()
	// #ifndef APP-NVUE
	width 100%
	height 100%
	// #endif
	// #ifdef APP-NVUE
	flex 1
	// #endif
.l-echart
	full()
	position relative
	&__canvas
		full()
</style>
