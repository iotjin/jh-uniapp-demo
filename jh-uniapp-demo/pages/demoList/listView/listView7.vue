<template>
	<view>
		<base-swiper-tabs :url="url" :params="params" @returnData="onReturnData" :tabs="tabs">
			<view id="cell" class="cell" v-for="(item,key) in dataArr" :key="key" @click="onClickItem(item,key)">
				<view class="left-view">
					<img class="img" src="https://img.yzcdn.cn/vant/cat.jpeg">
				</view>
				<view class="right-view">
					<view class="name">{{item.name2}}</view>
					<view class="content">{{item.content}}</view>
				</view>
			</view>
		</base-swiper-tabs>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "ListView7 - 分页1 - base-swiper-tabs",
				tabs: [{ name: '标题1' },
					{ name: '标题2' },
					{ name: '标题3', count: 0 }, ],
				url: 'https://www.fastmock.site/mock/1010b262a743f0b06c565c7a31ee9739/root/mock/pages',
				params: {
					// noData: true,
				},
				dataArr: []
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
			onReturnData(data) {
				this.dataArr = data
			},
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
