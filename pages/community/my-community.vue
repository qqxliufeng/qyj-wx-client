<template>
	<view class="my-community-container">
		<block v-if="defaultCommunity">
			<view class="item-wrapper" style="border-bottom: 10rpx solid #f5f5f5;" @click="communityClick(defaultCommunity)">
				<view class="image-wrapper">
					<image :src="defaultCommunity.images[0] | imagePath" mode="aspectFill"></image>
				</view>
				<view class="info-wrapper">
					<view class="title-wrapper">
						<view class="text-bold text-lg title text-black text-cut">{{defaultCommunity.name}}</view>
						<button class="cu-btn round sm bg-gradual-red text-white">
								默认小区
						</button>
					</view>
					<view class="location text-sm text-cut text-black">{{defaultCommunity.city}} . {{defaultCommunity.town}}</view>
					<view class="address text-sm text-cut">
						<text class="cuIcon-location text-yellow" style="margin-right: 4rpx;">{{defaultCommunity.address}}</text>
					</view>
				</view>
			</view>
		</block>
		<block v-for="item of communities" :key="item.id">
			<view class="item-wrapper bg-white" @click="communityClick(item)">
				<view class="image-wrapper">
					<image :src="item.images[0] | imagePath" mode="aspectFill"></image>
				</view>
				<view class="info-wrapper">
					<view class="title-wrapper">
						<view class="text-bold text-lg title text-black text-cut">{{item.name}}</view>
						<button class="cu-btn round sm" 
								:class="{'bg-gradual-red': Number(item.pivot.is_primary) === 1}" 
								@click="setPrimaryCommunity(item)" 
								:disabled="item.isBind">
								{{Number(item.pivot.is_primary) === 1 ? '默认小区' : '设为默认'}}
						</button>
					</view>
					<view class="location text-sm text-cut text-black">{{item.city}} . {{item.town}}</view>
					<view class="address text-sm text-cut">
						<text class="cuIcon-location text-yellow" style="margin-right: 4rpx;">{{item.address}}</text>
						<text class="text-yellow text-sm" v-if="Number(item.pivot.is_primary) !== 1" @click="unBindCommunity(item)">解除小区</text>
					</view>
				</view>
			</view>
		</block>
		<button class="cu-btn bg-gradual-orange margin-tb-sm lg add-button" v-if="communities.length < 2" @click="bindCommunity">
			<text class="cuIcon-add"></text>添加小区
		</button>
	</view>
</template>

<script>
	export default {
		name: 'MyCommunity',
		data() {
			return {
				communities: this.$userInfo.getCommunities(),
				defaultCommunity: null,
				defaultIndex: -1
			}
		},
		methods: {
			handleCommunity (arr) {
				arr.forEach((item, index) => {
					if (item.images) {
						item.images = item.images.split(',')
					}
					if (Number(item.pivot.is_primary) === 1) {
						this.defaultIndex = index
					}
				})
				this.defaultCommunity = arr.splice(this.defaultIndex, 1)[0]
			},
			setPrimaryCommunity (item) {
				if (Number(item.pivot.is_primary) === 1) {
					return
				}
				this.$http({
					url: this.$urlPath.setPrimaryCommunity,
					params: {
						cid: item.id
					},
					onRequestSuccess: (res) => {
						this.$userInfo.saveCommunities(res.data)
						this.handleCommunity(res.data)
						this.communities = res.data
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					}
				})
			},
			unBindCommunity (item) {
				uni.showModal({
					content: '是否要解绑该小区？默认小区不可解绑。',
					success: (res) => {
						if (res.confirm) {
							this.$http({
								url: this.$urlPath.unBindCommunity,
								params: {
									cid: item.id
								},
								onRequestSuccess: (res) => {
									this.$userInfo.saveCommunities(res.data)
									this.handleCommunity(res.data)
									this.communities = res.data
								},
								onRequestFail: (errorCode, error) => {
									this.$toast(error)
								}  
							})
						}
					}
				})	
			},
			bindCommunity () {
				this.$push('/pages/common/bind-community')
			},
			communityClick (item) {
				this.$push('/pages/community/community-info?cid='+item.id)
			}
		},
		onLoad() {
			uni.$on('refreshBindCommunity', () => {
				this.communities = this.$userInfo.getCommunities()
				this.handleCommunity(this.communities)
			})
			this.handleCommunity(this.communities)
		}
	}
</script>

<style lang="stylus" scoped>
.my-community-container
	.item-wrapper
		display flex
		padding 20rpx
		border-top 1px solid #f5f5f5
		.image-wrapper
			width 150rpx
			height 130rpx
			background-color #f5f5f5
			& > image
				width 100%
				height 100%
				border-radius 10rpx
		.info-wrapper
			flex 1
			display flex
			flex-direction column
			justify-content space-between
			margin-left 10rpx
			overflow hidden
			.title-wrapper
				display flex
				justify-content space-around
				.title
					flex 1
			.address
				display flex
				justify-content space-between
	.add-button
		position fixed
		bottom 20rpx
		left 20rpx
		right 20rpx
</style>
