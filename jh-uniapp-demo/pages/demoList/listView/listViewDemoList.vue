<template>
	<view>
		<base-text-list-view :dataArr="dataArr" @onClick="onClickItem" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "ListViewDemoList",
				dataArr: [{ title: "ListView1 - 动态假数据", url: './listView1' },
					{ title: "ListView2 - 默认下拉刷新假数据", url: './listView2' },
					{ title: "ListView3 - mescroll分页-默认样式", url: './listView3' },
					{ title: "ListView4 - mescroll分页-微博样式", url: './listView4' },
					{ title: "ListView5 - base-refresh-view", url: './listView5' },
					{ title: "ListView6 - base-refresh-view - 固定头尾", url: './listView6' },
					// { title: "ListView7 - 分页1 - base-swiper-tabs", url: './listView7' },
					// { title: "ListView8 - 分页2 - base-top-tabs", url: './listView8' },
					 ],
			}
		},
		methods: {
			onClickItem(item) {
				console.log(item.title);
				uni.navigateTo({
					url: item.url
				})
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.title
			})
		}
	}
</script>

<style>

</style>
