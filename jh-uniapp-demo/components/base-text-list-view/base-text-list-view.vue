<template>
	<view>
		<u-cell-group>
			<u-cell-item :title="item.title" :value="item.value || ''" :arrow="true" v-for="item in dataArr" :key="item.title" @click="onClick(item)">
				<template v-if="item.icon" slot="icon">
					<image class="icon" :src="item.icon"></image>
				</template>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		name: "base-text-list-view",
		props: {
			// 数组，包含title和url、左侧icon、右侧value
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
	.icon {
		width: 34rpx;
		height: 34rpx;
		padding-right: 15rpx;
	}
</style>
