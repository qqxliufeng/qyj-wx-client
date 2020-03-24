<template>
	<view v-if="info">
		<view class="base-info bg-white margin-sm padding-sm">
			<view class="text-black text-bold text-lg">
				{{info.shop_name}}
			</view>
			<view class="flex margin-tb-sm">
				<view class="image-wrapper">
					<image mode="aspectFill" :src="info.shop_logo"></image>
				</view>
				<view class="flex-sub margin-left-sm">
					<view class="cu-tag line-yellow sm round" v-for="(tag, index) of info.shop_tags" :key="index">{{tag}}</view>
				</view>
			</view>
			<view class="text-sm text-black flex align-center">
				<text>{{info.shop_address}}<text class="text-red" style="margin-left: 10rpx;">距小区：{{info.distance}}  km</text></text>
			</view>
			<view class="text-black text-sm" style="margin-top: 10rpx;">
				营业时间 {{info.shop_open_time}} - {{info.shop_close_time}}
			</view>
		</view>
		<view class="text-red text-df text-bold padding-left">
			<text class="title">标语</text>
		</view>
		<view class="margin-sm padding-sm text-sm text-black bg-white base-info">
			“{{info.shop_slogan}}“
		</view>
		<block>
			<view class="text-red text-df text-bold padding-left">
				<text class="title">服务信息</text>
			</view>
			<view class="margin-sm padding-sm text-sm text-black bg-white base-info">
				{{info.shop_description}}
			</view>
		</block>
		<block>
			<view class="text-red text-df text-bold padding-left">
				<text class="title">详情</text>
			</view>
			<view class="image-info-wrapper bg-white padding-sm">
				<image mode="aspectFill" :src="image" v-for="(image, index) of info.shop_images" :key="index"></image>
			</view>
		</block>
		<view style="height: 50px;"></view>
		<view class="cu-bar bg-white tabbar border shop foot">
			<view class="flex-sub"></view>
			<button class="cu-btn bg-orange round shadow-blur margin-right" @click="makePhone">联系商家</button>
			<button class="cu-btn bg-red round shadow-blur margin-right" @click="openLocation">到这里去</button>
		</view>
	</view>
</template>

<script>
	import {getDistance} from '../../utils/utils.js'
	export default {
		name: 'ShopInfo',
		data() {
			return {
				info: null
			}
		},
		methods: {
			getData () {
				this.$http({
					url: this.$urlPath.getBusinessInfo,
					params: {
						bid: this.$routeParams.bid || ''
					},
					onRequestSuccess: (res) => {
						this.info = res.data
						if (this.info.shop_tags) {
							this.info.shop_tags = this.info.shop_tags.split(',')
						}
						if (this.info.shop_images) {
							this.info.shop_images = this.info.shop_images.split(',')
						}
						this.info.distance = getDistance(this.$routeParams.lat, this.$routeParams.lng, this.info.shop_lat, this.info.shop_lng).toFixed(2)
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					}
				})
			},
			makePhone () {
				uni.makePhoneCall({
					phoneNumber: this.info.shop_phone
				})
			},
			openLocation () {
				uni.openLocation({
					latitude: Number(this.info.shop_lat),
					longitude: Number(this.info.shop_lng),
					name: this.info.shop_name,
					address: this.info.shop_address,
					scale: 18
				})
			}
		},
		onLoad () {
			this.getData()
		}
	}
</script>

<style lang="stylus" scoped>
.base-info
	border-radius 10rpx
.image-wrapper
	width 150rpx
	height 150rpx
	border #F5F5F5 solid 1px
	background-color #F5F5F5
	& > image
		width 100%
		height 100%
		border-radius 5rpx
.title
	border-bottom #e54d42 solid 2px
	padding-bottom 2px
.image-info-wrapper
	width 100%
	& > image
		width 100%
		border-radius 5rpx
</style>
