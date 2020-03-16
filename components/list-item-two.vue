<template>
	<view class="item-wrapper" @click="itemClick(item)">
		<view class="item-wrapper1">
			<view class="text-lg text-black title title1" style="overflow: hidden; flex: 1;">
				{{item.title}}
			</view>
			<view class="image-wrapper1">
				<image mode="aspectFill" class="image1" :src="item.images[0] | imagePath"></image>
			</view>
		</view>
		<foot :info="item"></foot>
	</view>
</template>

<script>
	import Foot from './list-item-foot.vue'
	export default {
		name: 'ListItemTwo',
		components: {
			Foot
		},
		props: {
			item: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		methods: {
			itemClick (item) {
				this.$emit('itemClick', item)
			}
		}
	}
</script>

<style lang="stylus" scoped>
.item-wrapper
	border-bottom 1px solid #f5f5f5
	padding 20rpx 0
	.title
		margin-bottom 20rpx
	.image-wrapper
		display flex
		margin-bottom 20rpx
		.image
			margin 0 5rpx
			height 160rpx
			width calc(calc(100% - 20rpx) / 3)
			border-radius 10rpx
			background-color #F5F5F5
	.item-wrapper1
		display flex
		flex-direction row
		.title1
			overflow : hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 4;
			-webkit-box-orient: vertical;
		.image-wrapper1
			height 160rpx
			width calc(calc(100% - 40rpx) / 3)
			margin-left 10rpx
			.image1
				width 100%
				height 100%
				border-radius 10rpx
				background-color #F5F5F5
</style>
