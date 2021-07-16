<template>
	<view>
		<view id="cell" class="cell" v-for="item in dataArr" :key="item.name" @click="onClickItem(item)">
			<view class="left-view">
				<img class="img" src="https://img.yzcdn.cn/vant/cat.jpeg">
			</view>
			<view class="right-view">
				<view class="name">{{item.name}}</view>
				<view class="content">{{item.content}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "ListView1 - 动态假数据",
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
				console.log('点击了cell：' + index);
				console.log('item' + JSON.stringify(item));
			},
			getData() {
				let dataArr = []
				for (let index = 0; index < 18; index++) {
					dataArr.push({ name: "姓名" + index, content: "这是内容这是内容这是内容这是内容这是内容这是内容这是内容" })
				}
				return dataArr
			}
		}
	}
</script>

<style>
	.cell {
		display: flex;
		width: 100%;
		background-color: white;
		border-bottom: 1px solid rgb(230, 230, 230);
	}

	.left-view {
		width: 70px;
		text-align: center;
		line-height: 70px;
	}

	.img {
		width: 50px;
		height: 50px;
		vertical-align: middle;
	}

	.right-view {
		flex: 1;
	}

	.name {
		margin-top: 10px;
		margin-left: 8px;
		font-size: 18px;
	}

	.content {
		margin-top: 8px;
		margin-left: 8px;
		margin-right: 10px;
		margin-bottom: 10px;
		color: gray;
		font-size: 15px;
	}
</style>
