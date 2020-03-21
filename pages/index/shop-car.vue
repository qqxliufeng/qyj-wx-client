<template>
	<view class="activity-contaner">
		<cu-custom :isBack="false" bgColor="bg-orange">
			<block slot="content">购物车</block>
		</cu-custom>
		<block v-if="isLogin">
			<view class="empty-wrapper">
				<view class="image-wrapper">
					<image src="../../static/img_icon_shop_empty.png"></image>
				</view>
				<view class="text-center margin-top-sm text-gray">
					购物车空空如也~
				</view>
			</view>
		</block>
		<block v-else>
			<login title="登录后可查看“购物车”页面"></login>
		</block>
	</view>
</template>

<script>
	import LoginMixin from '../../mixins/login.js'
	import Login from './components/login.vue'
	export default {
		name: 'Activity',
		mixins: [LoginMixin],
		components: {
			Login
		}
	}
</script>

<style lang="stylus" scoped>
.empty-wrapper
	height 85vh
	display flex
	flex-direction column
	justify-content center
	align-items center
	.image-wrapper
		width 200rpx
		height 133rpx
		& > image
			width 100%
			height 100%
</style>
