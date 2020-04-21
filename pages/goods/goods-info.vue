<template>
	<view>
		<block v-if="info">
			<view v-if="info.status === 1" class="bg-white">
				<view class="header-wrapper margin-top-sm padding-sm flex">
					<image class="cu-avatar round lg" :src="info.avatar | imagePath" mode="aspectFill"></image>
					<view class="flex justify-between flex-direction padding-left-sm">
						<view class="text-bold text-black text-lg">{{info.nickname}}</view>
						<view>{{info.city}}.{{info.town}}.{{info.community_name}}</view>
					</view>
				</view>
				<view style="background-color: #f5f5f5; width: 95%; height: 1px; margin: 0 auto;"></view>
				<view class="padding-sm flex align-center">
					<text class="text-red text-bold text-lg text-price">{{info.goods_price}}</text>
					<text class="text-gray text-df text-price margin-left-sm" style="text-decoration: line-through;">{{info.goods_origin_price}}</text>
					<view v-if="this.info.goods_tags" class="margin-left-sm">
						<text v-for="(item, index) of info.goods_tags" :key="index" class="cu-tag radius sm" :class="index % 2 === 0 ? 'line-cyan' : 'line-yellow'">
							{{item}}
						</text>
					</view>
				</view>
				<view class="padding-sm">
					<view class=" text-black text-lg">
						{{info.goods_des}}
					</view>
					<view v-for="(item, index) of info.goods_images" :key="index">
						<image :src="item | imagePath" mode="aspectFill" style="width: 100%;margin-top: 10rpx;" @click="priviewImage(index)"></image>
					</view>
					<view style="height: 55px;"></view>
				</view>
				<view class="cu-bar bg-white tabbar border shop foot">
					<button class="action" open-type="contact">
						<view class="cuIcon-service text-green">
						</view> 客服
					</button>
					<view class="action">
					</view>
					<view class="btn-group">
						<view class="text-black">联系人：{{info.concat_name}}</view>
						<button class="cu-btn round shadow-blur" :class="info.status === 1 ? 'bg-red' : ''">
							我想要
						</button>
					</view>
				</view>
			</view>
			<view v-else class="screen-swiper flex justify-center align-center text-gray">该商品已下架</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: 'GoodsInfo',
		data () {
			return {
				info: null
			}
		},
		methods: {
			getData () {
				this.$http({
					url: this.$urlPath.getGoodsInfo,
					params: {
						gid: this.$routeParams.gid
					},
					onRequestSuccess: (res) => {
						this.info = res.data
						if (this.info.goods_tags) {
							this.info.goods_tags = this.info.goods_tags.split(',')
						}
						this.info.goods_images = this.info.goods_images.split(',')
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					}
				})
			},
			priviewImage (index) {
				const tempImage = this.info.goods_images.map(it => this.$urlPath.imageUrl + it)
				uni.previewImage({
					current: index,
					urls: tempImage
				})
			}
		},
		onLoad() {
			this.getData()
		}
	}
</script>

<style>
</style>
