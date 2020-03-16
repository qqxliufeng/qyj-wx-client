<template>
	<view class="container">
		<text class="text-white">主人，您还未登录呢~我不会离开</text>
		<view style="flex: 1;"></view>
		<button class="cu-btn round sm bg-yellow" @click="login">立即登录</button>
	</view>
</template>

<script>
	export default {
		name: 'NoLoginTip',
		methods: {
			login () {
				// this.$toast('登录了')
				uni.switchTab({
					url: '/pages/index/mine'
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
.container
	display flex
	position fixed
	bottom 0
	left 0
	right 0
	align-items center
	height 80rpx
	padding 20rpx
	background rgba(0,0,0,0.7)
/*#ifdef H5 */
.container
	display flex
	position fixed
	bottom 50px
	left 0
	right 0
/* #endif */
</style>
