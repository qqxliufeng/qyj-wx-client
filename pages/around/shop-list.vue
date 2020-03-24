<template>
	<view>
		<block v-for="item of list" :key="item.id">
			<view class="item-wrapper padding-sm bg-white flex" @click="itemClick(item)">
				<view class="image-wrapper">
					<image mode="aspectFill" :src="item.logo"></image>
				</view>
				<view class="info-wrapper flex-sub padding-left-sm flex flex-direction justify-between">
					<view class="text-black text-bold text-df text-cut">{{item.name}}</view>
					<view>
						<view class='cu-tag sm round' :class="index % 2 === 0 ? 'line-red' : 'line-blue'" v-for="(tag, index) of item.tags" :key="index">{{tag}}</view>
					</view>
					<view class="text-xs text-back text-cut">
						“{{item.slogan}}”
					</view>
					<view class="flex justify-between align-center">
						<view class="text-xs text-gray text-cut flex-sub margin-right-sm">
							{{item.address}}
						</view>
						<view class="text-yellow text-sm">
							{{item.distance}}km
						</view>
					</view>
				</view>
			</view>
		</block>
		<load-more :status="loadingType"></load-more>
	</view>
</template>

<script>
	import List from '../../mixins/List.js'
	import {getDistance} from '../../utils/utils.js'
	export default {
		name: 'ShopList',
		mixins: [List],
		methods: {
			getData () {
				this.$http({
					url: this.$urlPath.getAroundBusiness,
					params: {
						cid: this.$routeParams.cid || '',
						lng: this.$routeParams.lng || 0,
						lat: this.$routeParams.lat || 0,
						page: this.page.num
					},
					loadingTip: null,
					onRequestSuccess: (res) => {
						res.data.forEach(it => {
							if (it.tags) {
								it.tags = it.tags.split(',')
							}
							it.distance = getDistance(this.$routeParams.lat, this.$routeParams.lng, it.lat, it.lng).toFixed(2)
						})
						this.loadSuccess(res.data)
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					},
					onRequestComplete: () => {
						uni.stopPullDownRefresh()
					}
				})
			},
			itemClick (item) {
				this.$push('/pages/around/shop-info?bid=' + item.id + '&lng=' + this.$routeParams.lng + '&lat=' + this.$routeParams.lat)
			}
		},
		onLoad() {
			uni.startPullDownRefresh()
		}
	}
</script>

<style lang="stylus" scoped>
.item-wrapper
	border-bottom #F5F5F5 solid 1px
	.image-wrapper
		width 25%
		height 170rpx
		& > image
			width 100%
			height 100%
			border-radius 8rpx
	.info-wrapper
		overflow hidden
		.location-wrapper
			background-color #F5F5F5
			border-radius 50%
			width 40rpx
			height 40rpx
			display flex
			justify-content center
			align-items center
</style>
