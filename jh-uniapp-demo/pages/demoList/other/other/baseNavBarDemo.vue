<template>
	<view>
		<!-- 实际一个页面只有一个navbar，isFixed 是为了demo展示才放出来的属性，一般不加 -->
		<view class="text"> 默认样式，左侧返回和标题 </view>
		<base-navbar :isFixed="false" title="标题" />

		<!-- 自定义右侧solt，rightImg、rightText 失效 -->
		<view class="text"> 自定义右侧solt，rightImg、rightText 失效 </view>
		<base-navbar :isFixed="false" :title="title" :isBack="false" :rightImg="rightImg" :rightText="rightText">
			<u-icon name="chat" size="38" slot="right" @click="clickRightItem"></u-icon>
		</base-navbar>

		<!-- 右侧图片 -->
		<view class="text"> 右侧图片 </view>
		<base-navbar :isFixed="false" :title="title" :isBack="false" :rightImg="rightImg" @clickRightItem="clickRightItem" />

		<!-- 右侧文字 -->
		<view class="text"> 右侧文字 </view>
		<base-navbar :isFixed="false" :title="title" :isBack="false" :rightText="rightText" @clickRightItem="clickRightItem" />

		<!-- 自定义左侧solt，leftImg、leftText 失效  -->
		<view class="text"> 自定义左侧solt，leftImg、leftText 失效 </view>
		<base-navbar :isFixed="false" :title="title" :isBack="false">
			<u-icon name="chat" size="38" slot="left" @click="clickLeftItem"></u-icon>
		</base-navbar>

		<!-- 左侧图片 -->
		<view class="text"> 左侧图片 </view>
		<base-navbar :isFixed="false" :title="title" :isBack="false" :leftImg="leftImg" @clickLeftItem="clickLeftItem" />

		<!-- 左侧文字 -->
		<view class="text"> 左侧文字 </view>
		<base-navbar :isFixed="false" title="标题" :isBack="false" :leftText="leftText" @clickLeftItem="clickLeftItem" />

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "base-navbar组件",
				isBack: true,
				title: '标题',
				leftImg: require("@/static/images/ic_search.png"),
				leftText: "左侧",
				rightImg: require("@/static/images/ic_set.png"),
				rightText: "右侧"
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.title
			})
		},
		methods: {
			clickLeftItem() {
				console.log('点击左侧标题');
			},
			clickRightItem() {
				console.log('点击右侧标题');
			},
			backChange(index) {
				this.isBack = !!index;
			},
		}
	}
</script>

<style>
	.text {
		display: flex;
		align-items: center;
		padding: 10px;
	}
</style>
