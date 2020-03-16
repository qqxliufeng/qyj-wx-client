<template>
	<view class="swiper-container">
		<swiper class="swiper-wrapper" :autoplay="true" @change="change" :circular="true">
			<block v-for="(image,index) of images" :key="index">
				<swiper-item class="swiper-item-wrapper">
					<image :src="image | imagePath" mode="aspectFill" @click="imagePriview(index)"></image>
				</swiper-item>
			</block>
		</swiper>
		<view class="index-wrapper">{{currentImage + 1}} / {{images.length}}</view>
	</view>
</template>

<script>
	export default {
		name: 'InfoSwiper',
		props: {
			images: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				currentImage: 0
			}
		},
		methods: {
			change (e) {
				this.currentImage = e.detail.current
			},
			imagePriview (index) {
				const images = this.images.map(it => {
					return this.$urlPath.imageUrl + it
				})
				uni.previewImage({
					current: index,
					urls: images
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
.swiper-container
	position relative
	.swiper-wrapper
		width 100%
		height 480rpx
		.swiper-item-wrapper
			& > image
				width 100%
				height 100%
	.index-wrapper
		position absolute
		bottom 40rpx
		right 20rpx
		border-radius 30rpx
		background-color rgba(100, 100, 100, .5)
		color #FFFFFF
		font-size 24rpx
		padding 10rpx 20rpx
</style>
