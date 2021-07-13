<template>
	<view>
		<view class='header'>header</view>
		<view class="main">
			<u-grid :col="4" :border="false" class="grid-bg">
				<u-grid-item v-for="(item, index) in dataArr" :index="selectIndex" :key="index" :custom-style="customStyle">
					<view :class="[index === selectIndex? 'itemSel':'item']" @click="onClickItem(item,index)"> {{'宫格' +index}} </view>
				</u-grid-item>
			</u-grid>
		</view>
		<view class='footer'>footer</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "GridView2 - 固定头尾",
				selectIndex: 0,
				customStyle: { padding: '15rpx 0' },
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
				for (let index = 0; index < 188; index++) {
					dataArr.push({ name: "aa" + index, content: "bb" })
				}
				return dataArr
			}
		}
	}
</script>

<style>
	.header {
		background: rgb(8, 117, 94);
		color: #fff;
		height: 100px;
		width: 100vw;
		position: fixed;
		z-index: 1;
	}

	.main {
		padding-top: 100px;
		padding-bottom: 200px;
	}

	.footer {
		background: rgb(8, 117, 94);
		color: #fff;
		height: 200px;
		width: 100vw;
		position: fixed;
		bottom: 0;
	}

	.item {
		width: 90%;
		height: 60rpx;
		border: 1px solid gray;
		background: pink;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.itemSel {
		width: 90%;
		height: 60rpx;
		border: 1px solid gray;
		background: red;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
