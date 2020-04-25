<template>
	<view class="bg-white">
		<swiper class="swiper-container square-dot" style="height: 300rpx !important;"
		 :circular="true"
		 :autoplay="true" 
		 interval="5000" 
		 duration="500" 
		 indicator-dots
		 @change="cardSwiper"
		 indicator-color="#fff"
		 indicator-active-color="#fbbd08">
			<swiper-item class="item" v-for="(item,index) in bannerList" :key="index" :class="cardCur==index?'cur':''">
				<view>
					<image style="width: 100%;" class="shadow-blur" :src="item.image_url | imagePath" mode="aspectFill" @click="itemClick(item)"></image>
					<!-- <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video> -->
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default{
		name: 'IndexSwiper',
		props: {
			bannerList: {
				type: Array,
				default: () => { return [] }
			}
		},
		data() {
			return {
				cardCur: 0
			}
		},
		methods: {
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			itemClick (item) {
				if (item.action_url) {
					this.$push('/pages/common/web-view?path=' + item.action_url)
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
.swiper-container
	margin 0 20rpx
	.item
		border-radius 10rpx
</style>
