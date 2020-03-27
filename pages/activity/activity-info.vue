<template>
	<view>
		<block v-if="info">
			<view class="image-wrapper">
				<image :src="info.images | imagePath" mode="aspectFill"></image>
				<view class="activity-status text-white text-sm">{{getStatus}}</view>
			</view>
			<view class="bg-white padding-sm">
				<view class="text-black text-bold text-lg">
					{{info.content}}
				</view>
				<view class="flex justify-between align-center margin-top-sm">
					<view>
						<text class="title">已报名：</text>
						<text class="text-red text-bold">{{info.count}}</text>
					</view>
					<view class="cu-avatar-group">
						<view class="cu-avatar round sm" v-for="(item,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]"></view>
					</view>
				</view>
			</view>
			<view class="bg-white padding-sm" v-if="info.max_count > 0">
				<view class="cu-progress round sm progress-wrapper" :class="info.status === 1 ? 'striped active' : ''">
					<view :class="info.status === 1 ? 'bg-green' : 'bg-yellow'" :style="{width: progressStyle}"></view>
					<text class="release-count text-sm" v-if="info.max_count !== -1">
						<text v-if="info.max_count > info.count">
							仅剩{{info.max_count - info.count}}人
						</text>
						<text v-else>
							人数已满
						</text>
					</text>
				</view>
			</view>
			<view class="bg-white padding-left-sm padding-right-sm margin-top-sm">
				<view class="cu-bar bg-white">
					<view class="action border-title" style="margin-left: 0;">
						<text class="text-lg text-bold text-red">活动信息</text>
						<text class="bg-gradual-red" style="width:3rem"></text>
					</view>
				</view>
				<view class="solid-bottom padding-bottom-sm padding-top-sm">
					<text class="text-yellow text-df">活动时间：</text>
					<text class="text-black">{{info.start_time * 1000 | dateFormat}}~{{info.end_time  * 1000 | dateFormat}}</text>
				</view>
				<view class="solid-bottom padding-bottom-sm padding-top-sm">
					<text class="text-yellow text-df">活动地点：</text>
					<text class="text-black">{{info.address}}</text>
				</view>
				<view class="solid-bottom padding-bottom-sm padding-top-sm">
					<text class="text-yellow text-df">活动人数：</text>
					<text class="text-black">{{info.min_count + '人'}}~{{info.max_count === -1 ? '不限' : info.max_count + '人'}}</text>
				</view>
				<view class="solid-bottom padding-bottom-sm padding-top-sm">
					<text class="text-yellow text-df">发&nbsp;&nbsp;起&nbsp;&nbsp;人：</text>
					<text class="text-black">平台</text>
				</view>
			</view>
			<view class="bg-white padding-left-sm padding-right-sm margin-top-sm">
				<view class="cu-bar bg-white">
					<view class="action border-title" style="margin-left: 0;">
						<text class="text-lg text-bold text-red">活动详情</text>
						<text class="bg-gradual-red" style="width:3rem"></text>
					</view>
				</view>
				<view class="title padding-bottom-sm text-lg">
					{{info.description}}
				</view>
			</view>
			<view class="cu-bar">
			</view>
			<view class="cu-bar foot bg-white tabbar border shop">
				<button class="action" open-type="contact">
					<view class="cuIcon-service text-green">
					</view>
					客服
				</button>
				<view class="flex-sub text-right padding-right-sm">
					
				</view>
				<view class="margin-right-sm">
					<button class="cu-btn round shadow-blur" :class="(info.status === 1 && Number(info.join_status) === 0) ? 'bg-red' : 'bg-yellow'" @click="signup">{{actionTip()}}</button>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: 'ActivityInfo',
		data() {
			return {
				avatar: null,
				info: null,
				progressStyle: '0%'
			}
		},
		computed: {
			getStatus () {
				if (this.info) {
					const status = this.info.status
					switch (status) {
						case 0:
							return '活动还未开始'
						case 1:
							if (this.info.end_time * 1000 > new Date().getTime()) {
								return '活动进行中'
							} else {
								return '活动已结束'
							}
						case 2:
							return '活动人数已满'
						case 3:
							return '活动已结束'
						case 4:
							return '活动已下架'
						default:
							return '活动已下架'
					}
				}
			}
		},
		methods: {
			getData () {
				this.$http({
					url: this.$urlPath.getActivityInfo,
					params: {
						aid: this.$routeParams.aid
					},
					onRequestSuccess: (res) => {
						this.info = res.data
						if (this.info) {
							this.avatar = this.info.users.map(it => {
								return this.$urlPath.imageUrl + it.avatar
							})
							this.progressStyle = this.info.max_count === -1 ? '100%' : Number(this.info.count / this.info.max_count) * 100 + '%'
						}
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					}
				})
			},
			actionTip () {
				const status = Number(this.info.join_status)
				switch (status) {
					case 0:
						return '立即报名'
					case 1:
						return '报名成功'
				}
			},
			signup () {
				if (this.info.status === 1 && Number(this.info.join_status) === 0) {
					uni.showModal({
						title: '提示',
						content: '是否报名此活动？',
						confirmText: '报名',
						success: (res) => {
							if (res.confirm) {
								this.$http({
									url: this.$urlPath.joinActivity,
									params: {
										aid: this.info.id
									},
									onRequestSuccess: (res) => {
										this.$toast('恭喜, 您已成功报名该活动')
										this.getData()
									},
									onRequestFail: (errorCode, error) => {
										this.$toast(error)
									}
								})
							}
						}
					})
				}
			}
		},
		onLoad() {
			this.getData()
		}
	}
</script>

<style lang="stylus" scoped>
.image-wrapper
	height 400rpx
	width 100%
	background-color #F5F5F5
	position relative
	& > image
		width 100%
		height 100%
	.activity-status
		position absolute
		right 0
		bottom 20rpx
		background-color rgba(0, 0, 0, 0.5)
		border-top-left-radius 60rpx
		border-bottom-left-radius 60rpx
		padding 5rpx 40rpx
.progress-wrapper
	position relative
	.release-count
		position absolute
		right 10rpx
		top 0
		bottom 0
</style>
