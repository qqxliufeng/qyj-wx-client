<template>
	<view class="feed-back-container">
		<textarea placeholder="请输入您的宝贵意见，我们将不断优化您的体验(1~200)" maxlength="200" placeholder-class="placeholder" v-model="feedBackConent"></textarea>
		<view class="num">{{numCount}}</view>
		<view class="phone-wrapper">
			<text class="phone-title">联系方式：</text>
			<input placeholder="请输入手机号(非必填)" v-model="phone" type="number" class="phone-input" maxlength="11"/>
		</view>
		<button class="submit bg-gradual-orange" @click="submit">提交</button>
	</view>
</template>

<script>
	export default {
		name: 'FeedBack',
		data() {
			return {
				feedBackConent: '',
				numCount: '0/200',
				phone: '',
			}
		},
		watch: {
			feedBackConent () {
				this.numCount = Math.min(this.feedBackConent.length, 200) + '/' + 200
			}
		},
		methods: {
			submit () {
				if (!this.feedBackConent) {
					this.$toast('请输入您的宝贵意见')
					return
				}
				if (this.phone && !this.$utils.validator.isPhone(this.phone)) {
					this.$toast('请输入合法的手机号')
					return
				}
				const uploadData = {
					content: this.feedBackConent,
					mobile: this.phone
				}
				this.$http({
					url: this.$urlPath.addFeedBack,
					params: {
						content: this.feedBackConent,
						mobile: this.phone
					},
					onRequestSuccess: (res) => {
						uni.showModal({
							content: '感谢您的宝贵意见，我们将努力提高您的服务体验！',
							showCancel: false,
							success: (res) => {
								this.$back()
							}
						})	
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					}
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
.feed-back-container
	background-color #f5f5f5
	padding 20rpx
	height 100vh
	.title
		font-size 24rpx
		color #888
		padding 20rpx
		background-color #fff
	.num
		font-size 24rpx
		color #666
		padding 10rpx
		text-align right
	.phone-wrapper
		background-color #fff
		padding 20rpx
		margin 20rpx 0
		display flex
		align-items center
		line-height 50rpx
		.phone-title
			font-size 30rpx
			color #333
		.phone-input
			display inline-block
			font-size 30rpx
			color #888
			flex 1
	& > textarea
		font-size 28rpx
		color #333
		border 1px solid #f5f5f5
		padding 20rpx
		width 100%
		padding: 20rpx
		box-sizing: border-box;
		background-color #FFF
	.placeholder
		font-size 28rpx
		color #888
	.submit
		display block
		margin-top 50rpx
		line-height 80rpx
		font-size 32rpx
		position fixed
		bottom 40rpx
		left 20rpx
		right 20rpx
	.image-wrapper
		background-color #fff
		padding 20rpx
		overflow hidden
		display flex
		flex-direction row
		.add-wrapper
			border 1px dashed #CCCCCC
			width 25vw
			height 25vw
			display flex
			box-sizing border-box
			justify-content center
			align-items center
			& > image
				width 50%
				height 50%
		.image-item-wrapper
			width 25vw
			height 25vw
			display inline-block
			margin-right 5vw
			position relative
			& > image
				width 100%
				height 100%
			.clear
				position absolute
				top 0
				right 0
</style>
