<template>
	<view>
		<base-text-list-view :dataArr="dataArr" @onClick="onClickItem" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "Map",
				dataArr: [{
					title: "Map - 腾讯地图",
					url: './map/map1',
				}, {
					title: "Map - 标注点连线计算距离2",
					url: './map/map4',
				}, ],
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.title
			})
		},
		methods: {
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

</style>
