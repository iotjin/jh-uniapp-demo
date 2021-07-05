<template>
<uni-shadow-root class="vant-field-index"><van-cell :size="size" :icon="leftIcon" :center="center" :border="border" :is-link="isLink" :required="required" :clickable="clickable" :title-width="titleWidth" title-style="margin-right: 12px;" :custom-style="customStyle" :arrow-direction="arrowDirection" custom-class="van-field">
  <slot name="left-icon" slot="icon"></slot>
  <view v-if="label" :class="'label-class '+(utils.bem('field__label', { disabled }))" slot="title">
    {{ label }}
  </view>
  <slot v-else name="label" slot="title"></slot>
  <view :class="utils.bem('field__body', [type])">
    <view :class="utils.bem('field__control', [inputAlign, 'custom'])" @click="onClickInput">
      <slot name="input"></slot>
    </view>
    <include v-if="type === 'textarea'" src="textarea.wxml"></include>
    <include v-else src="input.wxml"></include>

    <van-icon v-if="showClear" name="clear" class="van-field__clear-root van-field__icon-root" @touchstart.native.stop.prevent="onClear"></van-icon>
    <view class="van-field__icon-container" @click="onClickIcon">
      <van-icon v-if="rightIcon || icon" :name="rightIcon || icon" :class="'van-field__icon-root '+(iconClass)" custom-class="right-icon-class"></van-icon>
      <slot name="right-icon"></slot>
      <slot name="icon"></slot>
    </view>
    <view class="van-field__button">
      <slot name="button"></slot>
    </view>
  </view>
  <view v-if="showWordLimit && maxlength" class="van-field__word-limit">
    <view :class="utils.bem('field__word-num', { full: value.length >= maxlength })">{{ value.length >= maxlength ? maxlength : value.length }}</view>/{{ maxlength }}
  </view>
  <view v-if="errorMessage" :class="utils.bem('field__error-message', [errorMessageAlign, { disabled, error }])">
    {{ errorMessage }}
  </view>
</van-cell></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs><wxs src="./index.wxs" module="computed"></wxs>
<script>
import VanCell from '../cell/index.vue'
import VanIcon from '../icon/index.vue'
global['__wxVueOptions'] = {components:{'van-cell': VanCell,'van-icon': VanIcon}}

global['__wxRoute'] = 'vant/field/index'
import { nextTick } from '../common/utils';
import { VantComponent } from '../common/component';
import { commonProps, inputProps, textareaProps } from './props';
VantComponent({
  field: true,
  classes: ['input-class', 'right-icon-class', 'label-class'],
  props: Object.assign(
    Object.assign(
      Object.assign(Object.assign({}, commonProps), inputProps),
      textareaProps
    ),
    {
      size: String,
      icon: String,
      label: String,
      error: Boolean,
      center: Boolean,
      isLink: Boolean,
      leftIcon: String,
      rightIcon: String,
      autosize: null,
      required: Boolean,
      iconClass: String,
      clickable: Boolean,
      inputAlign: String,
      customStyle: String,
      errorMessage: String,
      arrowDirection: String,
      showWordLimit: Boolean,
      errorMessageAlign: String,
      readonly: {
        type: Boolean,
        observer: 'setShowClear',
      },
      clearable: {
        type: Boolean,
        observer: 'setShowClear',
      },
      border: {
        type: Boolean,
        value: true,
      },
      titleWidth: {
        type: String,
        value: '6.2em',
      },
    }
  ),
  data: {
    focused: false,
    innerValue: '',
    showClear: false,
  },
  created() {
    this.value = this.data.value;
    this.setData({ innerValue: this.value });
  },
  methods: {
    onInput(event) {
      const { value = '' } = event.detail || {};
      this.value = value;
      this.setShowClear();
      this.emitChange();
    },
    onFocus(event) {
      this.focused = true;
      this.setShowClear();
      this.$emit('focus', event.detail);
    },
    onBlur(event) {
      this.focused = false;
      this.setShowClear();
      this.$emit('blur', event.detail);
    },
    onClickIcon() {
      this.$emit('click-icon');
    },
    onClickInput(event) {
      this.$emit('click-input', event.detail);
    },
    onClear() {
      this.setData({ innerValue: '' });
      this.value = '';
      this.setShowClear();
      nextTick(() => {
        this.emitChange();
        this.$emit('clear', '');
      });
    },
    onConfirm(event) {
      const { value = '' } = event.detail || {};
      this.value = value;
      this.setShowClear();
      this.$emit('confirm', value);
    },
    setValue(value) {
      this.value = value;
      this.setShowClear();
      if (value === '') {
        this.setData({ innerValue: '' });
      }
      this.emitChange();
    },
    onLineChange(event) {
      this.$emit('linechange', event.detail);
    },
    onKeyboardHeightChange(event) {
      this.$emit('keyboardheightchange', event.detail);
    },
    emitChange() {
      this.setData({ value: this.value });
      nextTick(() => {
        this.$emit('input', this.value);
        this.$emit('change', this.value);
      });
    },
    setShowClear() {
      const { clearable, readonly } = this.data;
      const { focused, value } = this;
      this.setData({
        showClear: !!clearable && !!focused && !!value && !readonly,
      });
    },
    noop() {},
  },
});
export default global['__wxComponents']['vant/field/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-field{--cell-icon-size:16px;--cell-icon-size:var(--field-icon-size,16px)}.van-field__label{color:#646566;color:var(--field-label-color,#646566)}.van-field__label--disabled{color:#c8c9cc;color:var(--field-disabled-text-color,#c8c9cc)}.van-field__body{display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center}.van-field__body--textarea{box-sizing:border-box;padding:3.6px 0;line-height:1.2em;min-height:24px;min-height:var(--cell-line-height,24px)}.van-field__control:empty+.van-field__control{display:block}.van-field__control{position:relative;display:none;box-sizing:border-box;width:100%;margin:0;padding:0;line-height:inherit;text-align:left;background-color:initial;border:0;resize:none;color:#323233;color:var(--field-input-text-color,#323233);height:24px;height:var(--cell-line-height,24px);min-height:24px;min-height:var(--cell-line-height,24px)}.van-field__control:empty{display:none}.van-field__control--textarea{height:18px;height:var(--field-text-area-min-height,18px);min-height:18px;min-height:var(--field-text-area-min-height,18px)}.van-field__control--error{color:#ee0a24;color:var(--field-input-error-text-color,#ee0a24)}.van-field__control--disabled{background-color:initial;opacity:1;color:#c8c9cc;color:var(--field-input-disabled-text-color,#c8c9cc)}.van-field__control--center{text-align:center}.van-field__control--right{text-align:right}.van-field__control--custom{display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;min-height:24px;min-height:var(--cell-line-height,24px)}.van-field__placeholder{position:absolute;top:0;right:0;left:0;pointer-events:none;color:#c8c9cc;color:var(--field-placeholder-text-color,#c8c9cc)}.van-field__placeholder--error{color:#ee0a24;color:var(--field-error-message-color,#ee0a24)}.van-field__icon-root{display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;min-height:24px;min-height:var(--cell-line-height,24px)}.van-field__clear-root,.van-field__icon-container{line-height:inherit;vertical-align:middle;padding:0 8px;padding:0 var(--padding-xs,8px);margin-right:-8px;margin-right:-var(--padding-xs,8px)}.van-field__button,.van-field__clear-root,.van-field__icon-container{-webkit-flex-shrink:0;flex-shrink:0}.van-field__clear-root{font-size:16px;font-size:var(--field-clear-icon-size,16px);color:#c8c9cc;color:var(--field-clear-icon-color,#c8c9cc)}.van-field__icon-container{font-size:16px;font-size:var(--field-icon-size,16px);color:#969799;color:var(--field-icon-container-color,#969799)}.van-field__icon-container:empty{display:none}.van-field__button{padding-left:8px;padding-left:var(--padding-xs,8px)}.van-field__button:empty{display:none}.van-field__error-message{text-align:left;font-size:12px;font-size:var(--field-error-message-text-font-size,12px);color:#ee0a24;color:var(--field-error-message-color,#ee0a24)}.van-field__error-message--center{text-align:center}.van-field__error-message--right{text-align:right}.van-field__word-limit{text-align:right;margin-top:4px;margin-top:var(--padding-base,4px);color:#646566;color:var(--field-word-limit-color,#646566);font-size:12px;font-size:var(--field-word-limit-font-size,12px);line-height:16px;line-height:var(--field-word-limit-line-height,16px)}.van-field__word-num{display:inline}.van-field__word-num--full{color:#ee0a24;color:var(--field-word-num-full-color,#ee0a24)}
</style>