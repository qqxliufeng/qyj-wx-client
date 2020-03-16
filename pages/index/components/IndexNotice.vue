<template>
	<view class="index-notice-container shadow shadow-lg">
		<swiper :indicator-dots="false" 
				:autoplay="true" 
				:interval="3000" 
				:duration="1000"
				:vertical="true"
				:circular="true"
				:disable-touch="true"
				:touchable="true"
				class="swiper-container">
			<swiper-item v-for="item of list" :key="item.id">
				<view class="swiper-item text-black text-bold text-cut bg-white">
					<text class="iconfont text-yellow" style="margin-right: 20rpx;vertical-align: bottom;">&#xe670;</text>
					{{item.text}}
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: 'IndexNotice',
		data() {
			return {
				list: [
					{
						id: 0,
						text: '最新消息，请立即马上还款，否则将会对你采取强制措施最新消息，请立即马上还款，否则将会对你采取强制措施'
					},
					{
						id: 1,
						text: 'this is text2'
					},
					{
						id: 2,
						text: 'this is text3'
					}
				]
			}
		}
	}
</script>

<style lang="stylus" scoped>
.index-notice-container
	.swiper-container
		height 80rpx
		.swiper-item
			height 100%
			line-height 80rpx
			padding 0 20rpx
			box-sizing border-box
			overflow hidden
</style>
