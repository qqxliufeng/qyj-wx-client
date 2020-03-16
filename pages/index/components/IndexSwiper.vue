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
			<swiper-item class="item" v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view>
					<image style="width: 100%;" class="shadow-blur" :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default{
		name: 'IndexSwiper',
		data() {
			return {
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
			}
		},
		methods: {
			cardSwiper(e) {
				this.cardCur = e.detail.current
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
