<template>
	<view v-if="communityInfo">
		<info-custom-nav :title="communityInfo.name"  :scrollTop="scrollTop" @backClick="$back()"></info-custom-nav>
		<info-swiper :images="communityInfo.images"></info-swiper>
		<view class="bg-white padding-sm">
			<view class="text-bold text-xl text-black">{{communityInfo.name}}</view>
			<view class="location text-black" style="padding: 10rpx 0;">
				<text class="text-black">{{communityInfo.city}} . {{communityInfo.town}} . {{communityInfo.address}}</text>
			</view>
			<view class="horizental-line"></view>
			<view class="bottom-info-wrapper">
				<view class="bottom-info-item-wrapper">
					<text class="text-sm text-gray item-title">楼栋总数</text>
					<text class="text-lg text-black">{{tags['楼栋总数']}}</text>
				</view>
				<view class="vertial-line"></view>
				<view class="bottom-info-item-wrapper">
					<text class="text-sm text-gray item-title">房屋总数</text>
					<text class="text-lg text-black">{{tags['房屋总数']}}</text>
				</view>
				<view class="vertial-line"></view>
				<view class="bottom-info-item-wrapper">
					<text class="text-sm text-gray item-title">车位个数</text>
					<text class="text-lg text-black">{{tags['车位个数']}}</text>
				</view>
			</view>
		</view>
		<view class="margin-top-sm bg-white padding-sm">
			<view class="text-bold text-xl text-black padding-bottom-xs">小区概况</view>
			<view class="k-v-wrapper  padding-top-xs  padding-bottom-xs" v-for="(key, index) in simpleTags" :key="index">
				<text class="text-gray text-df" style="display: inline-block; width: 120rpx;">{{index}}</text>
				<text class="text-black text-df margin-left-sm">{{key}}</text>
			</view>
		</view>
		<view class="margin-top-sm bg-white padding-bottom-sm">
			<view class="text-bold text-xl text-black padding-sm">小区位置</view>
			<map class="map" 
				:longitude="Number(communityInfo.lng)" 
				:latitude="Number(communityInfo.lat)"
				:markers="markers">
			</map>
		</view>
	</view>
</template>

<script>
	import InfoCustomNav from '../../components/info-custom-nav.vue'
	import InfoSwiper from '../../components/info-swiper.vue'
	import {bMapTransqqMap} from '../../utils/utils.js'
	export default {
		name: 'CommunityInfo',
		components: {
			InfoCustomNav,
			InfoSwiper
		},
		data() {
			return {
				communityInfo: null,
				tags: null,
				simpleTags: {},
				markers: [],
				scrollTop: 0
			}
		},
		methods: {
			back () {
				this.$back()
			},
			change (e) {
				this.currentImage = e.detail.current
			},
			imagePriview (index) {
				const images = this.communityInfo.images.map(it => {
					return this.$urlPath.imageUrl + it
				})
				uni.previewImage({
					current: index,
					urls: images
				})
			},
			getData () {
				this.$http({
					url: this.$urlPath.communityInfo,
					params: {
						cid: this.$routeParams.cid
					},
					onRequestSuccess: (res) => {
						this.communityInfo = res.data
						this.tags = JSON.parse(this.communityInfo.tags)
						for(let item in this.tags) {
							if (item === '楼栋总数' || item === '房屋总数' || item === '车位个数') {
								continue
							}
							this.simpleTags[item] = this.tags[item]
						}
						this.communityInfo.images = this.communityInfo.images.split(',')
						const {lng, lat} = bMapTransqqMap(this.communityInfo.lng, this.communityInfo.lat)
						this.communityInfo.lng = lng
						this.communityInfo.lat = lat
						this.markers = [
							{
								latitude: lat,
								longitude: lng,
								iconPath: '../../static/image_location.png'
							}
						]
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					}
				})
			}
		},
		onLoad() {
			this.getData()
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop
		}
	}
</script>

<style lang="stylus" scoped>
.fixed
	position fixed
	top 0
	left 0
	right 0
	z-index 99
	.back
		display inline-block
		font-size 40rpx
		color #fff
		line-height 88rpx
		padding 0 20rpx
.swiper-container
	position relative
	.swiper-wrapper
		width 100%
		height 480rpx
		.swiper-item-wrapper
			& > image
				width 100%
	.index-wrapper
		position absolute
		bottom 20rpx
		right 20rpx
		border-radius 30rpx
		background-color rgba(100, 100, 100, .5)
		color #FFFFFF
		font-size 24rpx
		padding 10rpx 20rpx
.horizental-line
	width 95%
	height 1px
	margin 10rpx auto
	background-color #f0f0f0
.bottom-info-wrapper
	display flex
	.bottom-info-item-wrapper
		padding-top 20rpx
		flex 1
		display flex
		flex-direction column
		justify-content center
		align-items center
		.item-title
			margin-bottom 10rpx
	.vertial-line
		width 1px
		background-color #f0f0f0
		margin 20rpx 0
.map
	width 100%
	height 420rpx
</style>
