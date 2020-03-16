<template>
	<view class="item-wrapper bg-white" @click="bindCommunity">
		<view class="image-wrapper">
			<image :src="item.images[0] | imagePath" mode="aspectFill"></image>
		</view>
		<view class="info-wrapper">
			<view class="title-wrapper">
				<view class="text-bold text-lg title text-black text-cut">{{item.name}}</view>
				<button class="cu-btn round sm" :class="{'bg-gradual-blue': !item.isBind}" @click="bindCommunity(item)" :disabled="item.isBind">{{item.isBind ? '已绑定' : '绑定'}}</button>
			</view>
			<view class="location text-sm text-cut text-black">{{item.city}} . {{item.town}}</view>
			<view class="address text-sm text-cut"><text class="cuIcon-location text-yellow" style="margin-right: 4rpx;"></text>{{item.address}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'CommunityItem',
		props: {
			item: Object
		},
		methods: {
			bindCommunity () {
				this.$emit('bindCommunity', this.item)
			}
		}
	}
</script>

<style lang="stylus" scoped>
.item-wrapper
	display flex
	padding 20rpx
	border-top 1px solid #f5f5f5
	.image-wrapper
		width 150rpx
		height 130rpx
		background-color #f5f5f5
		& > image
			width 100%
			height 100%
			border-radius 10rpx
	.info-wrapper
		flex 1
		display flex
		flex-direction column
		justify-content space-between
		margin-left 10rpx
		overflow hidden
		.title-wrapper
			display flex
			justify-content space-around
			.title
				flex 1
</style>
