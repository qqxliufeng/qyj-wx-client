<template>
	<view>
		<block v-for="(item, index) of 5" :key="index">
			<view class="" @click="itemClick">
				打开地图
			</view>
		</block>
	</view>
</template>

<script>
	import { bMapTransqqMap as transfromLocation } from '../../utils/utils.js'
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
				uni.openLocation({
					latitude: this.lat,
					longitude: this.lng,
					name: '印象济南',
					address: '泉世界',
					scale: 18
				})
			}
		},
		onLoad() {
			const {lng, lat} = transfromLocation(116.915347, 36.681681)
			this.lat = lat
			this.lng = lng
			console.log(this.lat, this.lng)
		}
	}
</script>

<style lang="stylus" scoped>
</style>
