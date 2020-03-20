<template>
	<view>
		<cu-custom bgColor="bg-orange">
			<block slot="left">
				<text class="cuIcon-location location" style="margin-left: 10rpx;"></text>
				<text style="margin-left: 10rpx;" @click="showPop">{{currentCity}}</text>
				<text class="circle" v-if="currentCommunity"></text>
				<text class="text-cut" v-if="currentCommunity">{{currentCommunity}}</text>
			</block>
			<block slot="content">居易</block>
		</cu-custom>
		<view class="cu-modal top-modal text-left" :style="style" :class="showModal ? 'show' : ''" @click="hidenModal">
			<view class="cu-dialog" style="min-height: 40vh;">
				<button class="cu-btn round margin-sm" :class="item.isCheck ? 'bg-yellow' : ''" v-for="(item, index) of cities" :key="index" @click.stop="cityItemClick(item)">
					{{item.name}}
				</button>
			</view>
		</view>
		<index-search></index-search>
		<index-swiper></index-swiper>
		<index-notice></index-notice>
		<index-type></index-type>
		<block v-if="house">
			<view class="item-shadow bg-white flex align-center padding-left-sm padding-right-sm" style="height: 90rpx;">
				<text class="cuIcon-titles text-green"></text>
				<text class="text-df text-black text-bold">房源信息</text>
			</view>
			<view class="grid col-2">
				<view v-for="item of house" :key="item.id">
					<view class="margin-sm item-shadow" @click="houseItemClick(item)">
						<view style="height: 350rpx">
							<image style="background-color: #F5F5F5; width: 100%; height: 100%;" :src="item.images[0] | imagePath" mode="aspectFill" class="house-item-image"></image>
						</view>
						<view class="bg-white house-item-info">
							<view class="text-black text-df item-title">
								{{item.content}}
							</view>
							<view class="text-df flex justify-between align-center" style="margin: 10rpx 0;">
								<text class="text-red text-price text-bold">{{item.money + '/月'}}</text>
								<text class="cu-tag line-yellow round sm">{{item.layout}}</text>
							</view>
							<view class="text-sm text-gray">
								<text class="cuIcon-location">{{item.community_name}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<block v-if="goods">
			<view class="item-shadow bg-white flex align-center padding-left-sm padding-right-sm margin-bottom-sm" style="height: 90rpx;">
				<text class="cuIcon-titles text-green"></text>
				<text class="text-df text-black text-bold">闲置商品</text>
			</view>
			<view v-for="item of goods" :key="item.id" class="flex padding-sm bg-white" style="border-bottom: #F5F5F5 solid 1px" @click="goodsItemClick(item)">
				<view class="image-wrapper">
					<image class="item-shadow" :src="item.images[0] | imagePath" mode="aspectFill"></image>
				</view>
				<view class="flex-sub info-wrapper">
					<view class="text-black text-bold text-lg flex justify-between">
						<text class="text-cut">{{item.content}}</text>
					</view>
					<view v-if="item.tags && item.tags.length > 0" class="tag-wrapper">
						<text v-for="(it, index) of item.tags" :key="index" class='cu-tag sm round' :class="index % 2 === 0 ? 'line-yellow' : 'line-cyan'">{{it}}</text>
					</view>
					<view>
						<text class="cuIcon-location"></text>
						<text class="text-black">{{item.community_name}}</text>
					</view>
					<view class="flex justify-between align-center">
						<text class="text-price text-gray old-price">{{item.origin_price}}</text>
						<text class="text-price text-red text-bold text-lg">{{item.price}}</text>
					</view>
				</view>
			</view>
		</block>
		<block v-else>
			<view class="text-gray margin-tb-sm text-center">加载中…</view>
		</block>
		<no-login-tip v-if="!isLogin"></no-login-tip>
	</view>
</template>
<script>
	import IndexSearch from './components/IndexSearch.vue'
	import IndexSwiper from './components/IndexSwiper.vue'
	import IndexNotice from './components/IndexNotice.vue'
	import IndexType from './components/IndexType.vue'
	import NoLoginTip from './components/NoLoginTip.vue'
	import LoginMixin from '../../mixins/login.js'
	export default {
		mixins: [LoginMixin],
		components: {
			IndexSearch,
			IndexSwiper,
			IndexNotice,
			IndexType,
			NoLoginTip
		},
		data() {
			return {
				currentCity: '济南',
				currentCommunity: '',
				house: null,
				goods: null,
				showModal: false,
				style: `padding-top:${this.CustomBar}px;`,
				cities: [
					{
						name: '济南市',
						isCheck: true
					},
					{
						name: '济南市',
						isCheck: false
					},
					{
						name: '济南市',
						isCheck: false
					}
				]
			}
		},
		methods: {
			selectCommunity (e) {
				this.currentCommunity = this.communities[e.detail.value]
			},
			showPop () {
				this.showModal = true
			},
			hidenModal () {
				this.showModal = false
			},
			cityItemClick (item) {
				this.hidenModal()
				this.cities.forEach(it => {
					it.isCheck = it === item
				})
			},
			getData () {
				this.$http({
					url: this.$urlPath.indexInfo,
					params: {
						area: '济南市'
					},
					onRequestSuccess: (res) => {
						this.house = res.data.house_list
						if (this.house.length % 2 === 1) {
							this.house.splice(this.house.lastIndexOf(), 1)
						}
						this.house.forEach(it => {
							it.images = it.images.split(',')
						})
						this.goods = res.data.goods_list
						this.goods.forEach(it => {
							it.images = it.images.split(',')
							if (it.tags) {
								it.tags = it.tags.split(',')
							}
						})
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					},
					onRequestComplete: () => {
						uni.stopPullDownRefresh()
					}
				})
			},
			houseItemClick (item) {
				this.$push('/pages/house/house-info?hid=' + item.id)
			},
			goodsItemClick (item) {
				this.$push('/pages/goods/goods-info?gid=' + item.id)
			}
		},
		onLoad() {
			uni.startPullDownRefresh()
		},
		onPullDownRefresh() {
			this.getData()
		}
	}
</script>

<style lang="stylus" scoped>
.left-action
	display flex
	align-items center
	.location
		color #FFFFFF
	.circle
		display inline-block
		width 10rpx
		height 10rpx
		background-color #FFFFFF
		border-radius 50%
		margin 0 10rpx
		vertical-align middle
.house-item-image
	border-top-right-radius 10rpx
	border-top-left-radius 10rpx
	height 350rpx
.house-item-info
	border-bottom-right-radius 10rpx
	border-bottom-left-radius 10rpx
	padding 10rpx
	.item-title
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
.item-shadow
	box-shadow: 0 5px 4px rgba(0,0,0,0.04)
.image-wrapper
	min-width 30%
	height 170rpx
	position relative
	background-color #F5F5F5
	& > image
		width 100%
		height 100%
		border-radius 10rpx
.info-wrapper
	overflow hidden
	margin-left 10rpx
	display flex
	justify-content space-between
	flex-direction column
	.tag-wrapper
		margin 10rpx 0
	.old-price
		text-decoration line-through
</style>
