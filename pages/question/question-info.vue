<template>
	<view class="queestion-info-container" v-if="info">
		<fab title="回答" @click.native="openReplyWindow"></fab>
		<view class="bg-white" style="padding: 20rpx;">
			<view class="user-info-wrapper" style="display: flex; align-items: center;">
				<view class="cu-avatar round" :style="avatarPath"></view>
				<text class="nickname text-black text-bold">{{info.user_info.nickname}}</text>
				<view style="flex: 1;"></view>
				<!-- <view class="cuIcon-more" style="font-size: 44rpx; color: #666;"></view> -->
				<button class="cu-btn round sm" @click="edit" v-if="isSelf">
						<text class="cuIcon-edit" style="margin-right: 10rpx;"></text>
						编辑
				</button>
			</view>
			<view class="text-lg text-black title-wrapper">
				{{info.title}}
			</view>
			<view class="desc-wrapper" v-if="info.content">
				<view class="text-gray desc-tip">详细信息：</view>
				<view class="title text-black">{{info.content}}</view>
			</view>
			<view class="image-wrapper" v-if="info.images.length > 0">
				<image v-for="(path, index) of info.images" :key="index" mode="aspectFill" class="image" :src="path | imagePath" @click="priview(index)"></image>
			</view>
			<view class="foot-wrapper text-right">
				<text class="text-gray text-sm">提问于：{{info.create_time | timeFilter}}</text>
			</view>
		</view>
		<view class="reply-wrapper">
			<block v-if="list && list.length > 0">
				<view class="replay-item-wrapper bg-white" v-for="it of list" :key="it.id">
					<view class="item-header">
						<view class="cu-avatar round" style="height: 40px; width: 40px;">
							<image :src="it.avatar | imagePath"></image>
						</view>
						<view class="nickname-wrapper">
							<text class="nickname text-black text-bold">{{it.nickname}}</text>
							<text class="cu-time text-gray text-sm">回答于：{{it.create_time | timeFilter}}</text>
						</view>
					</view>
					<view class="text-black text-lg margin-top">{{it.content}}</view>
				</view>
			</block>
			<load-more :status="loadingType"></load-more>
		</view>
		<view class="cu-modal bottom-modal" :class="isOpenReplyWindow ? 'show' : ''">
			<view class="cu-dialog bg-white">
				<view class="header-wrapper">
					<view class="text-gray padding text-lg" @click="hidenModal">取消</view>
					<view class="text-yellow padding text-lg" @click="replyQuestion">发布</view>
				</view>
				<view class="reply-content-wrapper">
					<textarea class="text-black" maxlength="400" placeholder="请输入您的回答(5~400)字" v-model="replyContent"></textarea>
					<!-- <button class="cu-btn round xl bg-yellow margin-left">发布</button> -->
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
		name: 'QuestionInfo',
		mixins: [List],
		components: {
			Fab,
			LoadMore
		},
		data() {
			return {
				info: null,
				avatarPath: '',
				isSelf: false,
				isOpenReplyWindow: false,
				replyContent: ''
			}
		},
		methods: {
			getData () {
				this.$http({
					url: this.$urlPath.getQuestionMessageInfo,
					params: {
						qid: this.$routeParams.qid
					},
					onRequestSuccess: (res) => {
						this.info = res.data
						if (this.info) {
							this.isSelf = Number(this.$userInfo.state.id) === Number(this.info.uid)
							if (this.info.images) {
								this.info.images = this.info.images.split(',')
							}
							this.avatarPath = `background-image: url(${this.$urlPath.imageUrl}${this.info.user_info.avatar});`
							this.page.num = 1
							this.getAnswerList()
						}
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					}
				})
			},
			getAnswerList () {
				this.$http({
					url: this.$urlPath.getQuestionAnswerList,
					params: {
						qid: this.$routeParams.qid,
						page: this.page.num
					},
					onRequestSuccess: (res) => {
						this.loadSuccess(res.data)
					},
					onRequestFail: (code, e) => {
						console.log(e)
					}
				})
			},
			priview (index) {
				const images = this.info.images.map(image => {
					return this.$urlPath.imageUrl + image
				})
				uni.previewImage({
					urls: images,
					current: images[index]
				})
			},
			edit () {
				uni.showActionSheet({
					itemList: ['编辑', '删除'],
					itemColor: '#333333',
					success: (res) => {
						if (res.tapIndex === 0) {
							this.$push('/pages/question/quiz-edit?qid=' + this.$routeParams.qid)
						} else {
							uni.showModal({
								title: '提示',
								content: '是否要删除此提问？',
								success: (res) => {
									if (res.confirm) {
										this.closeQustion()
									}
								}
							})
						}
					}
				})
			},
			closeQustion () {
				this.$http({
					url: this.$urlPath.closeQuestion,
					params: {
						qid: this.$routeParams.qid
					},
					onRequestSuccess: (res) => {
						this.$toast('问题删除成功')
						uni.$emit('refreshQuestion')
						this.$back()
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					}
				})
			},
			openReplyWindow () {
				this.isOpenReplyWindow = true
			},
			hidenModal () {
				this.isOpenReplyWindow = false
			},
			replyQuestion () {
				if (!this.replyContent) {
					this.$toast('请输入回答内容')
					return
				}
				if (this.replyContent.length < 5) {
					this.$toast('回答内容至少5个字')
					return
				}
				this.isOpenReplyWindow = false
				this.$http({
					url: this.$urlPath.addAnswer,
					params: {
						qid: this.$routeParams.qid,
						content: this.replyContent
					},
					loadingTip: '正在添加回答…',
					onRequestSuccess: (res) => {
						this.page.num = 1
						this.getAnswerList()
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					}
				})
			}
		},
		onLoad() {
			uni.$on('refreshQuestion', () => {
				this.getData()
			})
			this.getData()
		},
		onReachBottom() {
			if (this.loadingType === 'noMore') {
				return
			}
			this.page.num = this.page.num + 1
			this.loadingType = 'loading'
			this.getAnswerList()
		},
		onUnload() {
			uni.$off('refreshQuestion')
		}
	}
</script>

<style lang="stylus" scoped>
.queestion-info-container
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
	.reply-wrapper
		margin-top 20rpx
	.reply-content-wrapper
		margin 20rpx
		display flex
		height calc(90vh - 44px)
		justify-content space-between
		& > textarea
			border-radius 10rpx
			height 15em
			text-align left
			font-size 30rpx
			padding 10rpx
			flex 1
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
