<template>
	<view>
		<u-navbar :is-back="isBack" :back-icon-color="backColor" :title="title" :title-color="titleColor" :background="background" :is-fixed="isFixed">

			<template v-if="$slots.left">
				<slot name="left"></slot>
			</template>
			<template v-else-if="leftImg">
				<image class="nav-item-img" :src="leftImg" @click="onClickNavLeftItem"></image>
			</template>
			<template v-else-if="leftText">
				<view class="nav-item-text" @click="onClickNavLeftItem">{{leftText}}</view>
			</template>

			<template v-if="$slots.right" slot="right">
				<slot name="right"></slot>
			</template>
			<template v-else-if="rightImg" slot="right">
				<image class="nav-item-img" :src="rightImg" @click="onClickNavRightItem"></image>
			</template>
			<template v-else-if="rightText" slot="right">
				<view class="nav-item-text" @click="onClickNavRightItem">{{rightText}}</view>
			</template>

		</u-navbar>
	</view>
</template>

<script>
	export default {
		name: "base-navbar",
		props: {
			// 是否显示返回按钮，默认为true
			isBack: { type: Boolean, default: true },
			title: { type: String, default: '' },
			// 右侧图片地址，优先级高于rightText，低于右侧slot 
			rightImg: { type: String, default: '' },
			rightText: { type: String, default: '' },
			// 左侧图片地址，优先级高于leftText，低于左侧slot
			leftImg: { type: String, default: '' },
			leftText: { type: String, default: '' },
			isFixed: { type: Boolean, default: true },
		},
		data() {
			return {
				backColor: "white",
				titleColor: "white",
				background: {
					// backgroundColor: '#38BC9D',
					// // 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// // 还可以设置背景图size属性
					// backgroundSize: 'cover',
					// 渐变色
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				}
			};
		},
		methods: {
			onClickNavLeftItem() {
				this.$emit("clickLeftItem", {});
			},
			onClickNavRightItem() {
				this.$emit("clickRightItem", {});
			}
		}
	}
</script>

<style>
	.nav-item-text {
		color: white;
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-item-img {
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
	}
</style>
