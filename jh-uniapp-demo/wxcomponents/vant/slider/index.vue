<template>
<uni-shadow-root class="vant-slider-index"><view :class="'custom-class '+(utils.bem('slider', { disabled }))" :style="style({ background: inactiveColor, height: utils.addUnit(barHeight) })" @click="onClick">
  <view :class="utils.bem('slider__bar')" :style="(barStyle)+'; '+(style({ backgroundColor: activeColor }))">
    <view :class="utils.bem('slider__button-wrapper')" @touchstart="onTouchStart" @touchmove.stop.prevent="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
      <slot v-if="useButtonSlot" name="button"></slot>
      <view v-else :class="utils.bem('slider__button')"></view>
    </view>
  </view>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs><wxs src="../wxs/style.wxs" module="style"></wxs>
<script>

global['__wxRoute'] = 'vant/slider/index'
import { VantComponent } from '../common/component';
import { touch } from '../mixins/touch';
import { canIUseModel } from '../common/version';
import { getRect } from '../common/utils';
VantComponent({
  mixins: [touch],
  props: {
    disabled: Boolean,
    useButtonSlot: Boolean,
    activeColor: String,
    inactiveColor: String,
    max: {
      type: Number,
      value: 100,
    },
    min: {
      type: Number,
      value: 0,
    },
    step: {
      type: Number,
      value: 1,
    },
    value: {
      type: Number,
      value: 0,
      observer(val) {
        if (val !== this.value) {
          this.updateValue(val);
        }
      },
    },
    barHeight: null,
  },
  created() {
    this.updateValue(this.data.value);
  },
  methods: {
    onTouchStart(event) {
      if (this.data.disabled) return;
      this.touchStart(event);
      this.startValue = this.format(this.value);
      this.dragStatus = 'start';
    },
    onTouchMove(event) {
      if (this.data.disabled) return;
      if (this.dragStatus === 'start') {
        this.$emit('drag-start');
      }
      this.touchMove(event);
      this.dragStatus = 'draging';
      getRect(this, '.van-slider').then((rect) => {
        const diff = (this.deltaX / rect.width) * this.getRange();
        this.newValue = this.startValue + diff;
        this.updateValue(this.newValue, false, true);
      });
    },
    onTouchEnd() {
      if (this.data.disabled) return;
      if (this.dragStatus === 'draging') {
        this.updateValue(this.newValue, true);
        this.$emit('drag-end');
      }
    },
    onClick(event) {
      if (this.data.disabled) return;
      const { min } = this.data;
      getRect(this, '.van-slider').then((rect) => {
        const value =
          ((event.detail.x - rect.left) / rect.width) * this.getRange() + min;
        this.updateValue(value, true);
      });
    },
    updateValue(value, end, drag) {
      value = this.format(value);
      const { min } = this.data;
      const width = `${((value - min) * 100) / this.getRange()}%`;
      this.value = value;
      this.setData({
        barStyle: `
          width: ${width};
          ${drag ? 'transition: none;' : ''}
        `,
      });
      if (drag) {
        this.$emit('drag', { value });
      }
      if (end) {
        this.$emit('change', value);
      }
      if ((drag || end) && canIUseModel()) {
        this.setData({ value });
      }
    },
    getRange() {
      const { max, min } = this.data;
      return max - min;
    },
    format(value) {
      const { max, min, step } = this.data;
      return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
    },
  },
});
export default global['__wxComponents']['vant/slider/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-slider{position:relative;height:2px;height:var(--slider-bar-height,2px);border-radius:999px;border-radius:var(--border-radius-max,999px);background-color:#ebedf0;background-color:var(--slider-inactive-background-color,#ebedf0)}.van-slider:before{position:absolute;right:0;left:0;content:"";top:-8px;top:-var(--padding-xs,8px);bottom:-8px;bottom:-var(--padding-xs,8px)}.van-slider__bar{position:relative;width:100%;height:100%;background-color:#1989fa;background-color:var(--slider-active-background-color,#1989fa);border-radius:inherit;transition:all .2s;transition:all var(--animation-duration-fast,.2s)}.van-slider__button{width:24px;width:var(--slider-button-width,24px);height:24px;height:var(--slider-button-height,24px);border-radius:50%;border-radius:var(--slider-button-border-radius,50%);box-shadow:0 1px 2px rgba(0,0,0,.5);box-shadow:var(--slider-button-box-shadow,0 1px 2px rgba(0,0,0,.5));background-color:#fff;background-color:var(--slider-button-background-color,#fff)}.van-slider__button-wrapper{position:absolute;top:50%;right:0;-webkit-transform:translate3d(50%,-50%,0);transform:translate3d(50%,-50%,0)}.van-slider--disabled{opacity:.5;opacity:var(--slider-disabled-opacity,.5)}
</style>