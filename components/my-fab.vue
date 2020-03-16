<template>
	<view :class="bgColor" class="fab-container shadow-blur">
		{{title}}
	</view>
</template>

<script>
	export default {
		name: 'MyFab',
		props: {
			bgColor: {
				type: String,
				default: 'bg-gradual-orange'
			},
			title: String
		}
	}
</script>

<style lang="stylus" scoped>
.fab-container
	border-radius 50%
	width 100rpx
	height 100rpx
	position fixed
	right 40rpx
	bottom 40rpx
	display flex
	justify-content center
	align-items center
	z-index 999
</style>
