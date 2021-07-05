<template>
<uni-shadow-root class="vant-progress-index"><view class="van-progress custom-class" :style="computed.rootStyle({ strokeWidth, trackColor })">
  <view class="van-progress__portion" :style="computed.portionStyle({ percentage, inactive, color })">
    <view v-if="showPivot && computed.pivotText(pivotText, percentage)" :style="computed.pivotStyle({ textColor, pivotColor, inactive, color, right })" class="van-progress__pivot">
      {{ computed.pivotText(pivotText, percentage) }}
    </view>
  </view>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs><wxs src="./index.wxs" module="computed"></wxs>
<script>

global['__wxRoute'] = 'vant/progress/index'
import { VantComponent } from '../common/component';
import { BLUE } from '../common/color';
import { getRect } from '../common/utils';
VantComponent({
  props: {
    inactive: Boolean,
    percentage: {
      type: Number,
      observer: 'setLeft',
    },
    pivotText: String,
    pivotColor: String,
    trackColor: String,
    showPivot: {
      type: Boolean,
      value: true,
    },
    color: {
      type: String,
      value: BLUE,
    },
    textColor: {
      type: String,
      value: '#fff',
    },
    strokeWidth: {
      type: null,
      value: 4,
    },
  },
  data: {
    right: 0,
  },
  mounted() {
    this.setLeft();
  },
  methods: {
    setLeft() {
      Promise.all([
        getRect(this, '.van-progress'),
        getRect(this, '.van-progress__pivot'),
      ]).then(([portion, pivot]) => {
        if (portion && pivot) {
          this.setData({
            right: (pivot.width * (this.data.percentage - 100)) / 100,
          });
        }
      });
    },
  },
});
export default global['__wxComponents']['vant/progress/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-progress{position:relative;height:4px;height:var(--progress-height,4px);border-radius:4px;border-radius:var(--progress-height,4px);background:#ebedf0;background:var(--progress-background-color,#ebedf0)}.van-progress__portion{position:absolute;left:0;height:100%;border-radius:inherit;background:#1989fa;background:var(--progress-color,#1989fa)}.van-progress__pivot{position:absolute;top:50%;box-sizing:border-box;min-width:3.6em;text-align:center;word-break:keep-all;border-radius:1em;-webkit-transform:translateY(-50%);transform:translateY(-50%);color:#fff;color:var(--progress-pivot-text-color,#fff);padding:0 5px;padding:var(--progress-pivot-padding,0 5px);font-size:10px;font-size:var(--progress-pivot-font-size,10px);line-height:1.6;line-height:var(--progress-pivot-line-height,1.6);background-color:#1989fa;background-color:var(--progress-pivot-background-color,#1989fa)}
</style>