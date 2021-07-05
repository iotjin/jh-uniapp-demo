<template>
<uni-shadow-root class="vant-divider-index"><view :class="'custom-class '+(utils.bem('divider', [{ dashed, hairline }, contentPosition]))" :style="computed.rootStyle({ borderColor, textColor, fontSize, customStyle })">
  <slot></slot>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs><wxs src="./index.wxs" module="computed"></wxs>
<script>

global['__wxVueOptions'] = {components:{}}

global['__wxRoute'] = 'vant/divider/index'
import { VantComponent } from '../common/component';
VantComponent({
  props: {
    dashed: Boolean,
    hairline: Boolean,
    contentPosition: String,
    fontSize: String,
    borderColor: String,
    textColor: String,
    customStyle: String,
  },
});
export default global['__wxComponents']['vant/divider/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-divider{display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;margin:16px 0;margin:var(--divider-margin,16px 0);color:#969799;color:var(--divider-text-color,#969799);font-size:14px;font-size:var(--divider-font-size,14px);line-height:24px;line-height:var(--divider-line-height,24px);border:0 solid #ebedf0;border-color:var(--divider-border-color,#ebedf0)}.van-divider:after,.van-divider:before{display:block;-webkit-flex:1;flex:1;box-sizing:border-box;height:1px;border-color:inherit;border-style:inherit;border-width:1px 0 0}.van-divider:before{content:""}.van-divider--hairline:after,.van-divider--hairline:before{-webkit-transform:scaleY(.5);transform:scaleY(.5)}.van-divider--dashed{border-style:dashed}.van-divider--center:before,.van-divider--left:before,.van-divider--right:before{margin-right:16px;margin-right:var(--divider-content-padding,16px)}.van-divider--center:after,.van-divider--left:after,.van-divider--right:after{content:"";margin-left:16px;margin-left:var(--divider-content-padding,16px)}.van-divider--left:before{max-width:10%;max-width:var(--divider-content-left-width,10%)}.van-divider--right:after{max-width:10%;max-width:var(--divider-content-right-width,10%)}
</style>