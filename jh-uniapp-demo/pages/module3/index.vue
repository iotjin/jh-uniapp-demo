<template>
	<view>
		<base-navbar :title="title" :isBack="false" :rightImg="rightImg" @clickRightItem="clickRightItem" />

		<view class="top_bg" bindtap="ClickHeader">
			<image class="img" src="https://img.yzcdn.cn/vant/cat.jpeg"></image>
			<text class="name">小于 </text>
		</view>

		<base-text-list-view :dataArr="dataArr" @onClick="onClickItem" />

	</view>
</template>

<script>
	const img = require("@/static/images/ic_account.png")
	const img_set = require("@/static/images/ic_set.png")

	export default {
		data() {
			return {
				title: '我的',
				rightImg: img_set,
				dataArr: [
					{
						'title': '设置',
						'icon': img,
						'url': './set/set',
				      },
					{
						'title': '关于',
						'icon': img,
						'url': './about/about',
				      },
					{
						'title': '意见反馈',
						'icon': img,
						'url': '',
						// 'url': './feedback/feedback',
						'value': '去反馈'
				      },
				],
			}
		},
		methods: {
			clickRightItem() {
				uni.navigateTo({
					url: './set/set'
				})
			},
			onClickItem(item) {
				if (item.url) {
					uni.navigateTo({
						url: item.url
					})
				}
			}
		}
	}
</script>

<style>
	.top_bg {
		height: 230rpx;
		background-color: rgb(248, 248, 248);
		display: flex;
		align-items: center;
	}

	.img {
		margin-left: 30rpx;
		width: 130rpx;
		height: 130rpx;
		border-radius: 65rpx;
	}

	.name {
		margin-left: 30rpx;
		font-size: 38rpx;
		font-weight: bold;
	}

	.van-cell {
		height: 100rpx;
	}

	.setCellIcon {
		margin-right: 10px;
		width: 50rpx;
		height: 50rpx;
		vertical-align: middle;
	}

	.space-bg {
		height: 6rpx;
		background-color: #f8f8f8;
	}
</style>
