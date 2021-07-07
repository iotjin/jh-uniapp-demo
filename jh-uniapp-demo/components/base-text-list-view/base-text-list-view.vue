<template>
	<view>
		<u-cell-group>
			<u-cell-item :title="item.title" :arrow="true" v-for="item in dataArr" :key="item.title"
				@click="onClick(item)"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		name: "base-text-list-view",
		props: {
			// 数组，包含title和url
			dataArr: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {

			};
		},
		methods: {
			onClick(item) {
				this.$emit("onClick", item); //往外传值
			}
		}
	}
</script>

<style>

</style>
