<template>
	<view class="house-info-container" v-if="info">
		<info-custom-nav :title="info.money + '元/月'"  :scrollTop="scrollTop" @backClick="$back()"></info-custom-nav>
		<info-swiper :images="info.images"></info-swiper>
		<view class="info-wrapper bg-white padding-sm">
			<view class='cu-tag light bg-green round'>
				{{isHouse ? '租房' : isCar ? '车位' : '储藏室'}}
			</view>
			<view v-if="isHouse" class='cu-tag light bg-yellow round'>
				{{info.room_type === 0 ? '隔间' : info.room_type === 1 ? '次卧' : '主卧'}}
			</view>
			<view class="text-lg text-black text-bold margin-tb-sm text-cut">
				<text v-if="isHouse">{{info.renting_type === 0 ? '合租' : '整租'}} | </text> {{info.house_content}}
			</view>
			<view class="text-gray text-sm margin-bottom-sm"><text class="cuIcon-location"></text>{{info.community_name}}</view>
			<view style="width: 100%; height: 1px; background-color: #f5f5f5; margin-bottom: 20rpx;"></view>
			<view class="flex">
				<view class="flex-sub text-center">
					<view class="text-red text-bold text-lg text-price">{{info.money}}/月</view>
					<view class="text-black text-df margin-top-sm">租金</view>
				</view>
				<view style="width: 1px; height: 50px; background-color: #F5F5F5;">
				</view>
				<view class="flex-sub text-center" v-if="isHouse">
					<view class="text-red text-bold text-lg">{{info.house_layout || '暂无' }}</view>
					<view class="text-black text-df margin-top-sm">户型</view>
				</view>
				<view class="flex-sub text-center" v-if="isCar">
					<view class="text-red text-bold text-lg">{{info.garage_num || '暂无' }}</view>
					<view class="text-black text-df margin-top-sm">车位编号</view>
				</view>
				<view style="width: 1px; height: 50px; background-color: #F5F5F5;" v-if="isHouse || isStorage"></view>
				<view class="flex-sub text-center" v-if="isHouse || isStorage">
					<view class="text-red text-bold text-lg">{{info.house_area}}m<text class="text-sup">2</text></view>
					<view class="text-black text-df margin-top-sm">面积</view>
				</view>
			</view>
			<view style="width: 100%; height: 1px; background-color: #f5f5f5; margin-top: 20rpx;"></view>
			<view class="flex margin-tb-sm">
				<view class="flex-sub">
					<text class="text-gray text-df">朝向</text>
					<text class="text-black text-df margin-left-sm">{{info.house_info.direction ? info.house_info.direction[0] : '暂无'}}</text>
				</view>
				<view class="flex-sub">
					<text class="text-gray text-df">装修</text>
					<text class="text-black text-df margin-left-sm">{{info.house_info.decoration ? info.house_info.decoration[0] : '暂无'}}</text>
				</view>
			</view>
			<view class="flex margin-top-sm">
				<view class="flex-sub">
					<text class="text-gray text-df">特色</text>
					<text class="text-black text-df margin-left-sm">{{info.house_info.feature ? info.house_info.feature.join(',') : '暂无'}}</text>
				</view>
				<view class="flex-sub">
					<text class="text-gray text-df">入住时间</text>
					<text class="text-black text-df margin-left-sm">{{info.house_info.time ? info.house_info.time[0] : '暂无'}}</text>
				</view>
			</view>
		</view>
		<view class="margin-top-sm bg-white padding-sm">
			<view class="text-black text-bold text-lg">描述</view>
			<view class="text-black text-df margin-tb-sm">
				{{info.house_content}}
			</view>
			<view style="width: 100%; height: 1px; background-color: #f5f5f5;"></view>
			<view class="margin-top-sm flex justify-between align-center">
				<text class="text-black text-bold text-lg">配置</text>
				<text v-if="info.browser_num > 0" class="text-grey text-sm">浏览：{{info.browser_num}}</text>
			</view>
			<view class="grid col-6">
				<view v-for="(item, index) of configs" :key="index" class="flex flex-direction justify-center align-center margin-top-sm">
					<view class="cu-avatar df round" :class="item.isInclude ? 'bg-blue' : ''">{{item.logo}}</view>
					<view class="text-gray text-sm" :class="item.isInclude ? 'text-black' : ''" style="margin-top: 10rpx;">{{item.name}}</view>
				</view>
			</view>
			<view style="width: 100%; height: 1px; background-color: #f5f5f5; margin-top: 20rpx;"></view>
			<view class="text-black text-bold text-lg margin-top-sm">期望要求</view>
			<view class="grid margin-top-sm" v-if="info.house_info.exception && info.house_info.exception.length > 0">
				<view class="margin-tb-sm text-center" style="margin-left: 3px; margin-right: 3px;" v-for="(item,index) in info.house_info.exception" :key="index">
					<button class="cu-btn round df" :class="item.isCheck ? 'bg-yellow' : ''">{{item}}</button>
				</view>
			</view>
			<view v-else>
				<view class="margin-tb-sm" style="margin-left: 3px; margin-right: 3px;">
					<button class="cu-btn round sm" >没有要求</button>
				</view>
			</view>
		</view>
		<view style="width: 100%; height: 100rpx; background-color: #f5f5f5; margin-top: 20rpx;"></view>
		<view class="cu-bar bg-white tabbar border shop foot">
			<button class="action" open-type="contact">
				<view class="cuIcon-service text-green">
				</view> 客服
			</button>
			<view class="action">
			</view>
			<view class="btn-group">
				<view class="text-black">联系人：{{info.concat_name}}</view>
				<button class="cu-btn round shadow-blur margin-right-sm" :class="info.status === 1 ? 'bg-red' : ''">
					{{stateTip}}
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import InfoCustomNav from '../../components/info-custom-nav.vue'
	import InfoSwiper from '../../components/info-swiper.vue'
	export default {
		name: 'HouseInfo',
		components: {
			InfoCustomNav,
			InfoSwiper
		},
		data() {
			return {
				info: null,
				stateTip: '联系房主',
				scrollTop: 0,
				isHouse: false,
				isCar: false,
				isStorage: false,
				configs: [
					{
						logo: '视',
						name: '电视机',
						isInclude: false
					},
					{
						logo: '微',
						name: '微波炉',
						isInclude: false
					},
					{
						logo: '暖',
						name: '暖气',
						isInclude: false
					},
					{
						logo: '洗',
						name: '洗衣机',
						isInclude: false
					},
					{
						logo: '热',
						name: '热水器',
						isInclude: false
					},
					{
						logo: '阳',
						name: '阳台',
						isInclude: false
					},
					{
						logo: '空',
						name: '空调',
						isInclude: false
					},
					{
						logo: '柜',
						name: '衣柜',
						isInclude: false
					},
					{
						logo: '冰',
						name: '冰箱',
						isInclude: false
					},
					{
						logo: '燃',
						name: '燃气灶',
						isInclude: false
					},
					{
						logo: 'W',
						name: 'WIFI',
						isInclude: false
					},
					{
						logo: '卫',
						name: '独卫',
						isInclude: false
					}
				]
			}
		},
		methods: {
			getData () {
				this.$http({
					url: this.$urlPath.getRentingHouseInfo,
					params: {
						hid: this.$routeParams.hid
					},
					onRequestSuccess: (res) => {
						if (res.data) {
							this.info = res.data
							//0=审核,1=上架,2=下架,3=已售出,4=审核失败,
							switch (this.info.status) {
								case 0:
									this.stateTip = '审核中'
								break
								case 1:
									this.stateTip = '联系房主'
								break
								case 2:
									this.stateTip = '已下架'
									uni.showModal({
										content: '该房源已下架，查看其它的吧~',
										success: (res) => {
											if (res.confirm) {
												this.$back()
											}
										}
									})
								break
								case 3:
									this.stateTip = '已租出'
									uni.showModal({
										content: '该房源已租出，查看其它的吧~',
										success: (res) => {
											if (res.confirm) {
												this.$back()
											}
										}
									})
								break
							}
							this.info.images = this.info.images.split(',')
							this.isHouse = this.info.house_type === 0
							this.isCar = this.info.house_type === 1
							this.isStorage = this.info.house_type === 2
							if (this.info.house_info) {
								this.info.house_info = JSON.parse(this.info.house_info)
								const infoConfigs = this.info.house_info.configs
								this.configs.forEach(it => {
									it.isInclude = infoConfigs.some(i => i.indexOf(it.logo) !== -1)
								})
							}
						}
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
.info-wrapper
	position relative
	border-top-left-radius 30rpx
	border-top-right-radius 30rpx
	margin-top -10px
</style>
