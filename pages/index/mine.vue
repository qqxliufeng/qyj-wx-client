<template>
	<view class="mine-container">
		<view v-if="isLogin">
			<view class="mine-top bg-gradual-orange">
				<!-- <view class="right-actions">
					<text class="cuIcon-service"></text>
					<text class="cuIcon-settings"></text>
				</view> -->
				<view class="cu-avatar lg round margin-left border-avatar" :style="{'background-image': 'url(' + urlPath + ')'}" @click="personInfo"></view>
				<view class="info-wrapper" @click="personInfo">
					<view class="text-bold text-lg">{{nickName}}</view>
					<view class="text-sm" style="margin-top: 10rpx;">查看并编辑个人信息<text class="cuIcon-edit" style="margin-left: 10rpx;"></text></view>
				</view>
			</view>
			<view class="bg-white menu-wrapper">
				<view class="item-wrapper" v-for="(item, index) of menu1" :key="index" @click="menuClick(item.click)">
					<text class="iconfont icon" :class="[item.color, item.icon, item.bgColor]" style="opacity: .5;"></text>
					<text class="name text-black text-bold">{{item.name}}</text>
				</view>
			</view>
			<view class="bg-white menu-wrapper2">
				<view class="text-black text-lg title">我的订单</view>
				<view class="menu-wrapper3">
					<view class="item-wrapper" v-for="(item, index) of myOrders" :key="index" @click="menuClick(item.click)">
						<text class="iconfont icon" :class="[item.color, item.icon, item.bgColor]"></text>
						<text class="name name1">{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="bg-white menu-wrapper2">
				<view class="text-black text-lg title">常用信息</view>
				<view class="menu-wrapper3">
					<view class="item-wrapper" v-for="(item, index) of myCommunity" :key="index" @click="menuClick(item.click)">
						<text class="iconfont icon" :class="[item.color, item.icon, item.bgColor]"></text>
						<text class="name name1">{{item.name}}</text>
					</view>
				</view>
			</view>
			<swiper class="swiper-ad" :class="true?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item class="swiper-item" v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'" class="image-ad"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper>
			<view class="bg-white menu-wrapper2">
				<view class="text-black text-lg title">常用工具</view>
				<view class="menu-wrapper3">
					<view class="item-wrapper" v-for="(item, index) of myUtils" :key="index" @click="menuClick(item.click)">
						<text class="iconfont icon" :class="[item.color, item.icon, item.bgColor]"></text>
						<text class="name name1">{{item.name}}</text>
					</view>
				</view>
			</view>
			<view style="height: 20rpx;"></view>
		</view>
		<view v-else>
			<cu-custom bgColor="bg-gradual-orange">
				<block slot="content">个人中心</block>
			</cu-custom>
			<login title="登录后可查看“我的”页面"></login>
		</view>
	</view>
</template>

<script>
	import Login from './components/login.vue'
	import LoginMixin from '../../mixins/login.js'
	export default {
		name: 'Mine',
		mixins: [LoginMixin],
		components: {
			Login
		},
		data() {
			return {
				menu1: [
					{
						name: '互助',
						icon: 'iconwendashixin',
						color: 'text-white',
						bgColor: 'bg-blue',
						click: () => {
							this.$push('/pages/question/mine/my-question')
						}
					},
					{
						name: '租房',
						icon: 'iconhouse',
						color: 'text-white',
						bgColor: 'bg-yellow',
						click: () => {
							this.$push('/pages/house/mine/my-house')
						}
					},
					{
						name: '闲置',
						icon: 'iconshangpin1',
						color: 'text-white',
						bgColor: 'bg-mauve',
						click: () => {
							this.$push('/pages/goods/mine/my-goods')
						}
					},
					{
						name: '寻物',
						icon: 'iconyishenbaochaxun03',
						color: 'bg-green',
						bgColor: 'text-white',
						click: () => {
							this.$push('/pages/lost/mine/my-lost')
						}
					}
				],
				urlPath: this.$urlPath.imageUrl + this.$userInfo.state.avatar,
				nickName: this.$userInfo.state.nickname,
				myOrders: [
					{
						name: '待付款',
						icon: 'icondaifukuan',
						color: 'text-yellow',
						bgColor: 'bg-white',
						click: () => {
							if (!this.$userInfo.isBindCommunity()) {
								uni.showModal({
									content: '您还未绑定任何小区，是否立即绑定？',
									success: (res) => {
										if (res.confirm) {
											this.$push('/pages/common/bind-community')
										}
									}
								})
							} else {
								this.$push('/pages/community/my-community')
							}
						}
					},
					{
						name: '待收货',
						icon: 'icondaishouhuo',
						color: 'text-yellow',
						bgColor: 'bg-white'
					},
					{
						name: '已完成',
						icon: 'icondingdanyiwancheng',
						color: 'text-yellow',
						bgColor: 'bg-white',
						click: () => {
							if (!this.$userInfo.isBindCommunity()) {
								uni.showModal({
									content: '您还未绑定任何小区，是否立即绑定？',
									success: (res) => {
										if (res.confirm) {
											this.$push('/pages/common/bind-community')
										}
									}
								})
							} else {
								this.$push('/pages/activity/mine/my-activity')
							}
						}
					},
					{
						name: '退款/售后',
						icon: 'icontuikuan',
						color: 'text-yellow',
						bgColor: 'bg-white'
					}
				],
				myCommunity: [
					{
						name: '我的小区',
						icon: 'iconxiaoqu',
						color: 'text-black',
						bgColor: 'bg-white',
						click: () => {
							// this.$push('/pages/common/bind-community')
							if (!this.$userInfo.isBindCommunity()) {
								uni.showModal({
									content: '您还未绑定任何小区，是否立即绑定？',
									success: (res) => {
										if (res.confirm) {
											this.$push('/pages/common/bind-community')
										}
									}
								})
							} else {
								this.$push('/pages/community/my-community')
							}
						}
					},
					{
						name: '我的认证',
						icon: 'iconrenzheng',
						color: 'text-black',
						bgColor: 'bg-white'
					},
					{
						name: '我的活动',
						icon: 'iconhuodong2',
						color: 'text-black',
						bgColor: 'bg-white',
						click: () => {
							if (!this.$userInfo.isBindCommunity()) {
								uni.showModal({
									content: '您还未绑定任何小区，是否立即绑定？',
									success: (res) => {
										if (res.confirm) {
											this.$push('/pages/common/bind-community')
										}
									}
								})
							} else {
								this.$push('/pages/community/community-phone')
							}
						}
					},
					{
						name: '联系客服',
						icon: 'iconkefu',
						color: 'text-black',
						bgColor: 'bg-white'
					}
				],
				myUtils: [
					{
						name: '我要推广',
						icon: 'icontuiguang',
						color: 'text-black',
						bgColor: 'bg-white',
						click: () => {
							if (!this.$userInfo.isBindCommunity()) {
								uni.showModal({
									content: '您还未绑定任何小区，是否立即绑定？',
									success: (res) => {
										if (res.confirm) {
											this.$push('/pages/common/bind-community')
										}
									}
								})
							} else {
								this.$push('/pages/community/my-community')
							}
						}
					},
					{
						name: '我要入驻',
						icon: 'iconruzhu1',
						color: 'text-black',
						bgColor: 'bg-white'
					},
					{
						name: '意见反馈',
						icon: 'iconfankui',
						color: 'text-black',
						bgColor: 'bg-white',
						click: () => {
							this.$push('/pages/mine/feedback')
						}
					},
					{
						name: '系统设置',
						icon: 'iconshezhi',
						color: 'text-black',
						bgColor: 'bg-white',
						click: () => {
							this.$push('/pages/mine/setting')
						}
					}
				],
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
			}
		},
		methods: {
			menuClick (click) {
				click()
			},
			personInfo () {
				this.$push('/pages/mine/person-info')
			},
			onLogin () {
				this.urlPath = this.$urlPath.imageUrl + this.$userInfo.state.avatar
				this.nickName = this.$userInfo.state.nickname
			}
		},
		onLoad () {
			uni.$on('refreshUserInfo', () => {
				this.urlPath = this.$urlPath.imageUrl + this.$userInfo.state.avatar
				this.nickName = this.$userInfo.state.nickname
			})
		},
		onUnload() {
			uni.$off('refreshUserInfo')
		}
	}
</script>

<style lang="stylus" scoped>
.mine-container
	.mine-top
		display flex
		align-items center
		height 300rpx
		position relative
		.info-wrapper
			margin-left 20rpx
		.right-actions
			position absolute
			top 0
			right 0
			& > text
				margin-right 20rpx
	.border-avatar
		border #FFFFFF solid 2px
	.menu-wrapper
		position relative
		z-index 2
		height 150rpx
		border-radius 10rpx
		margin 0 30rpx
		margin-top -60rpx
		box-shadow: 0 5px 4px rgba(0,0,0,0.04)
		display flex
		.item-wrapper
			flex 1
			display flex
			flex-direction column
			justify-content center
			align-items center
			.icon
				font-size 40rpx
				border-radius 20rpx
				width 60rpx
				height 60rpx
				display flex
				justify-content center
				align-items center
			.name
				margin-top 10rpx
				font-size 26rpx
	.menu-wrapper2
		margin 0 30rpx
		margin-top 20rpx
		height auto
		border-radius 10rpx
		box-shadow: 0 5px 4px rgba(0,0,0,0.04)
		.title
			padding 20rpx
			padding-bottom 30rpx
		.menu-wrapper3
			display flex
			flex-direction row
			padding-bottom 20rpx
			.item-wrapper
				flex 1
				display flex
				flex-direction column
				justify-content center
				align-items center
				.icon
					font-size 50rpx
					border-radius 50%
					width 60rpx
					height 60rpx
					display flex
					justify-content center
					align-items center
				.name
					margin-top 10rpx
					font-size 24rpx
					color #555
	.swiper-ad
		margin 0 30rpx
		margin-top 20rpx
		height 200rpx
		.image-ad
			border-radius 10rpx
</style>
