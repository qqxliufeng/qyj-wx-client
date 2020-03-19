<template>
	<view>
		<block v-for="(item, index) of 5" :key="index">
			<view class="item-wrapper padding-sm bg-white solid-bottom flex" @click="itemClick">
				<view class="image-wrapper">
					<image mode="aspectFill" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"></image>
				</view>
				<view class="info-wrapper flex-sub padding-left-sm flex flex-direction justify-between">
					<view class="text-black text-bold text-df text-cut">超意兴（印象济南店）</view>
					<view>
						<view class='cu-tag line-blue sm round'>便宜</view>
						<view class='cu-tag line-red sm round'>便宜</view>
						<view class='cu-tag line-red sm round'>便宜</view>
					</view>
					<view class="text-xs text-back text-cut">
						“好吃的不得了，快快来吧”
					</view>
					<view class="flex justify-between align-center">
						<view class="text-xs text-gray">
							海亮艺术华府1号楼商铺
						</view>
						<view class="cuIcon-location location-wrapper text-yellow"></view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: 'ShopList',
		data() {
			return {
				list: [],
				lat: 0,
				lng: 0
			}
		},
		methods: {
			itemClick () {
				// uni.openLocation({
				// 	latitude: this.lat,
				// 	longitude: this.lng,
				// 	name: '印象济南',
				// 	address: '泉世界',
				// 	scale: 18
				// })
				this.$push('/pages/around/shop-info')
			}
		}
	}
</script>

<style lang="stylus" scoped>
.item-wrapper
	.image-wrapper
		width 25%
		height 150rpx
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
