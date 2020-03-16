<template>
	<view class="lost-info-container" v-if="info">
		<fab title="帮助" @click.native="openHelpWindow" v-if="!isSelf"></fab>
		<view class="bg-white" style="padding: 20rpx;">
			<view class="user-info-wrapper" style="display: flex; align-items: center;">
				<view class="cu-avatar round" :style="avatarPath"></view>
				<text class="nickname text-black text-bold">{{info.user_info.nickname}}</text>
				<text class="text-red text-sm margin-left" v-if="Number(info.thx_money) > 0">酬谢金：<text class="text-price text-lg">{{info.thx_money}}</text></text>
				<view style="flex: 1;"></view>
				<!-- <view class="cuIcon-more" style="font-size: 44rpx; color: #666;"></view> -->
				<button class="cu-btn round sm" @click="edit" v-if="isSelf">
						<text class="cuIcon-edit" style="margin-right: 10rpx;"></text>
						编辑
				</button>
			</view>
			<view class="text-lg text-black title-wrapper">
				{{info.description}}
			</view>
			<view class="image-wrapper" v-if="info.images.length > 0">
				<image v-for="(path, index) of info.images" :key="index" mode="aspectFill" class="image" :src="path | imagePath" @click="priview(index)"></image>
			</view>
			<view class="foot-wrapper">
				<view class="concat-name text-red text-lg">联系人：<text>{{info.concat_name}}</text></view>
				<button class="round sm cu-btn bg-gradual-orange margin-left" @click="makePhone">打电话</button>
				<view style="flex: 1;"></view>
				<text class="text-gray text-sm">创建于：{{info.create_time | timeFilter}}</text>
			</view>
		</view>
		<view class="help-wrapper">
			<block v-if="list && list.length > 0">
				<view class="replay-item-wrapper bg-white" v-for="it of list" :key="it.id">
					<view class="item-header">
						<view class="cu-avatar round" style="height: 40px; width: 40px;">
							<image :src="it.avatar | imagePath"></image>
						</view>
						<view class="nickname-wrapper">
							<text class="nickname text-black text-bold">{{it.nickname}}</text>
							<text class="cu-time text-gray text-sm">回复于：{{it.create_time | timeFilter}}</text>
						</view>
					</view>
					<view class="text-black text-lg margin-top">{{it.content}}</view>
				</view>
			</block>
			<load-more :status="loadingType"></load-more>
		</view>
		<view class="cu-modal bottom-modal" :class="isOpenHelpWindow ? 'show' : ''">
			<view class="cu-dialog bg-white">
				<view class="header-wrapper">
					<view class="text-gray padding text-lg" @click="hidenModal">取消</view>
					<view class="text-yellow padding text-lg" @click="replyHelp">发布</view>
				</view>
				<view class="reply-content-wrapper">
					<textarea class="text-black" maxlength="400" placeholder="爱心回复(5~400)字" v-model="replyContent"></textarea>
					<view v-show="errorInfo" class="text-red text-left">{{errorInfo}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Fab from '../../components/my-fab.vue'
	import LoadMore from '../../components/uni-load-more.vue'
	import List from '../../mixins/List.js'
	export default {
		name: 'LostInfo',
		mixins: [List],
		components: {
			Fab,
			LoadMore
		},
		data() {
			return {
				info: null,
				isSelf: false,
				avatarPath: '',
				isOpenHelpWindow: false,
				replyContent: '',
				errorInfo: null
			}
		},
		methods: {
			getData () {
				this.$http({
					url: this.$urlPath.getLostInfo,
					params: {
						lid: this.$routeParams.lid
					},
					onRequestSuccess: (res) => {
						this.info = res.data
						this.isSelf = Number(this.$userInfo.state.id) === Number(this.info.uid)
						if (this.info) {
							this.isSelf = Number(this.$userInfo.state.id) === Number(this.info.uid)
							if (this.info.images) {
								this.info.images = this.info.images.split(',')
							}
							this.avatarPath = `background-image: url(${this.$urlPath.imageUrl}${this.info.user_info.avatar});`
							this.page.num = 1
							this.getHelpList()
						}
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					}
				})
			},
			edit () {
				uni.showActionSheet({
					itemList: ['编辑', '删除'],
					itemColor: '#333333',
					success: (res) => {
						if (res.tapIndex === 0) {
							this.$push('/pages/lost/edit-lost?lid=' + this.$routeParams.lid)
						} else {
							uni.showModal({
								title: '提示',
								content: '是否要删除此求助信息？',
								success: (res) => {
									if (res.confirm) {
										this.closeLost()
									}
								}
							})
						}
					}
				})
			},
			getHelpList () {
				this.$http({
					url: this.$urlPath.getLostHelps,
					params: {
						lid: this.$routeParams.lid,
						page: this.page.num
					},
					onRequestSuccess: (res) => {
						this.loadSuccess(res.data)
					},
					onRequestFail: (code, e) => {
						this.loadFail()
					}
				})
			},
			closeLost () {
				this.$http({
					url: this.$urlPath.closeLost,
					params: {
						lid: this.$routeParams.lid
					},
					onRequestSuccess: (res) => {
						this.$toast('删除成功')
						uni.$emit('refreshLost')
						this.$back()
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					}
				})
			},
			openHelpWindow () {
				this.isOpenHelpWindow = true
			},
			hidenModal () {
				this.isOpenHelpWindow = false
			},
			replyHelp () {
				if (!this.replyContent) {
					this.errorInfo = '请输入回复内容'
					return
				}
				if (this.replyContent.length < 5) {
					this.errorInfo = '回复内容至少5个字'
					return
				}
				this.$http({
					url: this.$urlPath.addHelpContent,
					params: {
						lid: this.$routeParams.lid,
						content: this.replyContent
					},
					onRequestSuccess: (res) => {
						this.$toast('添加成功，感谢您的爱心帮助')
						this.page.num = 1
						this.getHelpList()
						this.errorInfo = null
						this.isOpenHelpWindow = false
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					}
				})
			},
			makePhone () {
				uni.makePhoneCall({
					phoneNumber: this.info.concat_phone
				})
			}
		},
		onReachBottom() {
			if (this.loadingType === 'noMore') {
				return
			}
			this.page.num = this.page.num + 1
			this.loadingType = 'loading'
			this.getHelpList()()
		},
		onLoad () {
			uni.$on('refreshLost', () => {
				this.getData()
			})
			this.getData()
		},
		onUnload() {
			uni.$off('refreshLost')
		}
	}
</script>

<style lang="stylus" scoped>
.lost-info-container
	.user-info-wrapper
		.nickname
			margin-left 20rpx
	.title-wrapper
		padding 20rpx 0
	.desc-wrapper
		.desc-tip
			font-size 26rpx
			margin-bottom 10rpx
			display flex
			align-items center
			&::before
				content ''
				display inline-block
				width 6rpx
				height 24rpx
				background-color #39B54A
				margin-right 20rpx
	.image-wrapper
		display flex
		margin 20rpx 0
		.image
			margin 0 5rpx
			height 160rpx
			width calc(calc(100% - 20rpx) / 3)
			border-radius 10rpx
			background-color #F5F5F5
	.foot-wrapper
		margin-top 10rpx
		display flex
		align-items center
	.help-wrapper
		margin-top 20rpx
		.replay-item-wrapper
			padding 20rpx
			border-top 1px solid #f5f5f5
			.item-header
				display flex
				.nickname-wrapper
					margin-left 20rpx
					display flex
					flex-direction column
					justify-content space-between
	.reply-wrapper
		margin-top 20rpx
	.reply-content-wrapper
		margin 20rpx
		height calc(90vh - 44px)
		& > textarea
			display block
			width 100%
			border-radius 10rpx
			height 15em
			text-align left
			font-size 30rpx
			padding 10rpx
			font-size 32rpx
	.header-wrapper
		display flex
		justify-content space-between
		border-bottom #f5f5f5 solid 1px
	.replay-item-wrapper
		padding 20rpx
		border-top 1px solid #f5f5f5
		.item-header
			display flex
			.nickname-wrapper
				margin-left 20rpx
				display flex
				flex-direction column
				justify-content space-between
</style>
