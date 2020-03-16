<template>
	<view class="bg-white container">
		<view class="index-search-container">
			<text class="cuIcon-search text-gray"></text>
			<text class="hint-text text-grey">房源、问答</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'index-search'
	}
</script>

<style lang="stylus" scoped>
.container
	padding 20rpx
	padding-bottom -3rpx
	.index-search-container
		border #F1F1F1 solid 1px
		border-radius 60rpx
		padding 12rpx
		box-shadow: 0 5px 4px rgba(0,0,0,0.04)
		text-align center
		.hint-text
			margin-left 20rpx
			font-size 30rpx
</style>
