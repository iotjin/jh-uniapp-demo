<template>
	<view>
		<view class="grid-bg">
			<view class='grid-item-bg' v-for="(item, index) in dataArr" :key="index" @click="onClickItem(item, index)">
				<view class="image">{{item.img}}</view>
				<view class="text">{{item.text}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "GridView3 - 自定义多列",
				selectIndex: 0,
				dataArr: this.getData()
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.title
			})
		},
		methods: {
			onClickItem(item, index) {
				this.selectIndex = index
				console.log('点击了宫格：' + index);
				console.log('item' + JSON.stringify(item));
			},
			getData() {
				let dataArr = []
				for (let index = 0; index < 18; index++) {
					dataArr.push({ text: "text" + index, url: "url" })
				}
				return dataArr
			}
		}
	}
</script>

<style lang="scss" scoped>
	$grid-boder-width: 1px;
	$grid-border-color:#E6E6E6;

	.grid-bg {
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		background: white;
		background: yellow;
		margin: 20rpx;
		border-left: $grid-boder-width solid $grid-border-color;
		border-top: $grid-boder-width solid $grid-border-color;
	}

	.grid-item-bg {
		@include grid-column(3);
		padding: 5px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-content: space-between;
		border-right: $grid-boder-width solid $grid-border-color;
		border-bottom: $grid-boder-width solid $grid-border-color;
	}

	.image {
		margin-top: 10px;
		background: orange;
		width: 25px;
		height: 25px;
	}

	.text {
		margin-top: 10px;
		display: block;
		text-align: center;
		font-weight: bold;
		color: #000;
		font-size: 14px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
