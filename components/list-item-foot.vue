<template>
	<view class="foot-container">
		<text class="text-sm" style="color:#666">{{info.nickname}}</text>
		<text class="circle"></text>
		<text class="text-sm comments" style="color:#666">{{info.commentInfo}}</text>
		<text class="circle"></text>
		<text class="text-sm" style="color:#666">{{info.create_time | timeFilter}}</text>
	</view>
</template>

<script>
	export default {
		name: 'ListItemFoot',
		props: {
			info: {
				type: Object,
				default: () => {
					return {}
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
.foot-container
	display flex
	align-items center
	.circle
		display inline-block
		margin 0 20rpx
		width 8rpx
		height 8rpx
		border-radius 50%
		background-color #666666
</style>
