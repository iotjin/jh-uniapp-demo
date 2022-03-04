<template>
	<view>
		<view v-for="(item,index) in groupDataArr" :key="item.text">
			<view class="group-bg">
				<u-cell-group :title="groupDataArr[index].groupTitle" :border="false">
					<u-grid :col="3" :border="false" class="grid-bg">
						<u-grid-item v-for="(item2, index2) in groupDataArr[index].groupData" :key="index2" @click="onClickItem(item2,index2)">
							<image class="img" :src="item2.img"></image>
							<view class="text">{{item2.text}}</view>
						</u-grid-item>
					</u-grid>
				</u-cell-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "GridView4 - 分组功能列表",
				groupDataArr: [{
						groupTitle: '分组一',
						groupData: [{
							text: '功能1',
							url: './gridView1',
							img: '/static/logo.png',
							// img: '/static/images/ic_account.png'
				        }, {
							text: '功能2',
							url: './gridView2',
							img: '/static/logo.png',
				        }, {
							text: '功能3',
							url: './gridView3',
							img: '../../../static/logo.png'
				        }],
				      },
					{
						groupTitle: '分组二',
						groupData: [{
							text: '功能1',
							url: './gridView1',
							img: '../../../static/logo.png'
				        }, {
							text: '功能2',
							url: './gridView2',
							img: '../../../static/logo.png'
				        }, {
							text: '功能3',
							url: './gridView3',
							img: '../../../static/logo.png'
				        }, {
							text: '功能4',
							url: './gridView4',
							img: '../../../static/logo.png'
				        }],
				      }, {
						groupTitle: '分组三',
						groupData: [{
							text: '功能1',
							url: './gridView1',
							img: '../../../static/logo.png'
				        }, {
							text: '功能2',
							url: './gridView2',
							img: '../../../static/logo.png'
				        }],
				      },
					  ]
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.title
			})
		},
		methods: {
			onClickItem(item, index) {
				console.log(item.url);
				console.log(index);
			},
		}
	}
</script>

<style>
	.bg {
		background: white;
	}

	.img {
		padding-top: 15px;
		width: 80rpx;
		height: 80rpx;
	}

	.text {
		display: block;
		font-size: 13px;
		padding-top: 15px;
		padding-bottom: 15px;
	}
</style>
