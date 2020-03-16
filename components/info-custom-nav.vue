<template>
	<view class="fixed" :style="{backgroundColor: bgColor, height: customBar + 'px'}">
		<view class="text-white cu-bar text-left" :style="{marginTop: (statusBar - 5) + 'px'}">
			<text class="cuIcon-back back" :style="{color: backColor}" @click="back"></text>
			<text class="content" :style="{color: contentColor}">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'InfoCustomNav',
		props: {
			title: {
				type: String,
				default: ''
			},
			scrollTop: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				bgColor: 'rgba(250, 250, 250, 0)',
				contentColor: 'rgba(0, 0, 0, 0)',
				backColor: '#ffffff',
				statusBar: this.StatusBar,
				customBar: this.CustomBar,
			}
		},
		watch: {
			scrollTop (newVal, oldVal) {
				const r = Math.min(newVal / 200, 1)
				this.bgColor = `rgba(250, 250, 250, ${r})`
				this.contentColor = `rgba(0, 0, 0, ${r})`
				this.backColor = newVal > 30 ? '#333333' : '#ffffff'
			}
		},
		methods: {
			back () {
				this.$emit('backClick')
			}
		}
	}
</script>

<style lang="stylus" scoped>
.fixed
	position fixed
	top 0
	left 0
	right 0
	z-index 99
	.back
		display inline-block
		font-size 40rpx
		color #fff
		line-height 88rpx
		padding 0 20rpx
</style>
