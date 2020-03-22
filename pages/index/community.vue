<template>
	<view class="community-container">
		<cu-custom :isBack="false" bgColor="bg-orange">
			<block slot="content">小区</block>
		</cu-custom>
		<block v-if="isLogin">
			<view class="bind-tip-wrapper text-sm light bg-red" v-if="showTip">
				<text class="cuIcon-close text-black" @click="closeTip"></text>
				<text class="text-black margin-left-sm">
					绑定小区后，展示更精彩
				</text>
				<text style="flex: 1;"></text>
				<text class="bind margin-left-sm" @click="bindCommunity">
					绑定
				</text>
			</view>
			<block v-if="currentCommunity">
				<view class="padding-sm bg-white flex align-center shadow-sm">
					<text class="text-black text-bold text-xl">{{currentCommunity.name}}</text>
					<text class="flex-sub"></text>
					<picker :range="communityNames" @change="communityChange" v-if="communities.length > 1">
						<text class="text-gray text-df">切换<text class="cuIcon-order exchange"></text></text>
					</picker>
				</view>
				<view class="grid col-4 bg-white margin-top-sm shadow-sm">
					<view v-for="(item, index) of types" :key="index" class="padding-sm">
						<view @click="typeItemClick(item.onClick)">
							<view class="iconfont item-type-icon text-white" style="font-size: 22px;" :class="[item.cuIcon, item.color]"></view>
							<view class="text-black text-bold text-df text-center margin-top-xs">{{item.title}}</view>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white margin-top-sm" style="min-height: 40px;">
					<view class="action sub-title">
						<text class="text-xl text-bold text-yellow">最新活动</text>
						<text class="bg-yellow" style="width:2rem"></text>
					</view>
				</view>
				<block>
					<block v-for="(item, index) of activities" :key="index">
						<activity-item></activity-item>
					</block>
					<view class="text-center padding-sm bg-white" style="margin-top: 1px;">
						<text class="see-more-mobile">查看更多<text class="cuIcon-right"></text></text>
					</view>
				</block>
				<view class="cu-bar bg-white margin-top-xs" style="min-height: 40px;">
					<view class="action sub-title">
						<text class="text-xl text-bold text-yellow">今日团购</text>
						<text class="bg-yellow" style="width:2rem"></text>
					</view>
				</view>
			</block>
		</block>
		<block v-else>
			<login title="登录后可查看“我的小区”页面"></login>
		</block>
	</view>
</template>

<script>
	import ActivityItem from '../activity/components/activity-item.vue'
	import LoginMixin from '../../mixins/login.js'
	import Login from './components/login.vue'
	export default {
		name: 'Community',
		mixins: [LoginMixin],
		components: {
			ActivityItem,
			Login
		},
		data() {
			return {
				showTip: !this.$userInfo.isBindCommunity(),
				currentCommunity: this.$userInfo.getPrimaryCommunity(),
				communities: this.$userInfo.getCommunities(),
				types: [
					{
						title: '消息',
						color: 'bg-gradual-blue',
						cuIcon: 'iconxiaoxi1-copy',
						onClick: () => {
							this.$push('/pages/around/shop-list')
						}
					},
					{
						title: '通讯录',
						color: 'bg-gradual-green',
						cuIcon: 'icondianhua1',
						onClick: () => {
							this.$push('/pages/community/community-phone?' + this.$paramsToString({
								id: this.currentCommunity.id,
								name: this.currentCommunity.name 
							}))
						}
					},
					{
						title: '服务/资讯',
						color: 'bg-gradual-orange',
						cuIcon: 'iconlinju',
						onClick: () => {
							this.$push('/pages/around/shop-list')
						}
					},
					{
						title: '附近',
						color: 'bg-gradual-purple',
						cuIcon: 'iconfujin',
						onClick: () => {
							this.$push('/pages/around/shop-list')
						}
					}
				],
				activities: [
					{
						id: 0
					},
					{
						id: 1
					},
					{
						id: 2
					}
				]
			}
		},
		computed: {
			communityNames () {
				if (this.communities) {
					return this.communities.map(it => {
						return it.name
					})	
				} else {
					return []
				}				
			}
		},
		methods: {
			closeTip () {
				this.showTip = false
			},
			typeItemClick (click) {
				click()
			},
			communityChange (e) {
				this.currentCommunity = this.communities[e.detail.value]
			},
			expand () {
				this.mobileExpand = !this.mobileExpand
			},
			onLogin () {
				this.currentCommunity = this.$userInfo.getPrimaryCommunity()
				if (this.currentCommunity) {
					this.showTip = !this.$userInfo.isBindCommunity()
					this.communities = this.$userInfo.getCommunities()
				} else {
					uni.showModal({
						content: '您还未添加任何小区，是否立即添加？',
						confirmText: '添加',
						cancelText: '暂不添加',
						success: (res) => {
							if (res.confirm) {
								this.$push('/pages/common/bind-community')
							} 
						}
					})
				}
			},
			bindCommunity () {
				this.$push('/pages/common/bind-community')
			}
		},
		onLoad() {
			uni.$on(this.$events.REFRESH_BIND_COMMUNITY, () => {
				this.currentCommunity = this.$userInfo.getPrimaryCommunity()
				this.showTip = !this.$userInfo.isBindCommunity()
				this.communities = this.$userInfo.getCommunities()
			})
		},
		onUnload() {
			uni.$off(this.$events.REFRESH_BIND_COMMUNITY)
		}
	}
</script>

<style lang="stylus" scoped>
.community-container
	.bind-tip-wrapper
		padding 10rpx 20rpx
		display flex
		align-items center
		.bind
			padding 0 10rpx
			color #FF9700
	.current-community
		position fixed
		top 90rpx
		left 0
		right 0
		z-index 1
	.see-more-mobile
		padding 10rpx 40rpx
		background-color #F5F5F5
		color #666
		border-radius 30rpx
		font-size 24rpx
	.item-type-icon
		border-radius 20rpx
		width 80rpx
		height 80rpx
		display flex
		justify-content center
		align-items center
		opacity .8
		margin 0 auto
</style>
