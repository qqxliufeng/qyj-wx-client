<template>
	<view class="my-house-container">
		<fab title="发布" @click.native="publish" v-if="items.some(it => it.show)"></fab>
		<block v-for="item of list" :key="item.id">
			<view class="item-wrapper bg-white padding-sm" @click="itemClick(item)">
				<view class="image-wrapper">
					<image :src="item.images[0] | imagePath" mode="aspectFill"></image>
					<view class="rent-type-wrapper text-white text-bold text-sm" :class="item.house_type === 1 ? 'bg-olive' : item.house_type === 0 ? 'bg-blue' : 'bg-cyan'">
						{{houseType(item.house_type)}}
					</view>
				</view>
				<view class="info-wrapper padding-left-sm flex-sub">
					<view class="flex align-center">
						<text class="text-black text-bold text-lg text-cut flex-sub">{{item.house_content}}</text>
						<text v-if="item.status === 3" class="text-red text-bold text-lg">
							已租出
						</text>
						<text v-else class="cuIcon-more text-gray text-bold padding-left-sm padding-right-sm" @click.stop="moreClick(item)"></text>
					</view>
					<view class="text-df">{{item.community_name}}</view>
					<view v-if="item.house_type === 0">
						<view class='cu-tag radius sm line-olive text-olive'>{{Number(item.renting_type) === 0 ? '合租' : '整租'}}</view>
						<view class='cu-tag radius sm line-orange text-orange'>{{roomType(item.room_type)}}</view>
					</view>
					<view class="flex align-center">
						<view class="text-red margin-right-sm">
							<text class="text-bold text-lg">{{item.money}}</text>
							<text class="text-sm" style="margin-left: 1px;">元/月</text>
						</view>
						<view class="margin-right-sm" v-if="item.house_type === 1">编号:{{item.garage_num}}</view>
						<view class="margin-right-sm" v-if="item.house_type === 0">{{item.house_layout}}</view>
						<view v-if="item.house_type !== 1">
							<text class="text-df">{{item.house_area}}m</text>
							<text class="text-sup">2</text>
						</view>
					</view>
				</view>
			</view>
		</block>
		<load-more :status="loadingType"></load-more>
	</view>
</template>

<script>
	import List from '../../../mixins/List.js'
	export default {
		name: 'MyHouse',
		mixins: [List],
		data() {
			return {
				items: [
					{
						name: '房屋',
						url: '/pages/house/mine/publish-house',
						show: false
					},
					{
						name: '车位',
						url: '/pages/house/mine/publish-car-house',
						show: false
					},
					{
						name: '储藏室',
						url: '/pages/house/mine/publish-store-house',
						show: false
					}
				]
			}
		},
		methods: {
			roomType (type) {
				if (type === 0) {
					return '隔断'
				} else if (type === 1) {
					return '次卧'
				} else {
					return '主卧'
				}
			},
			houseType (type) {
				if (type === 0) {
					return '房屋'
				} else if (type === 1) {
					return '车位'
				} else {
					return '储藏室'
				}
			},
			getData () {
				this.$http({
					url: this.$urlPath.getRentingHouseByUId,
					params: {
						page: this.page.num
					},
					onRequestSuccess: (res) => {
						const data = res.data
						data.forEach(it => {
							if (it.images) {
								it.images = it.images.split(',')
							}
						})
						this.loadSuccess(data)
						this.items[0].show = !this.list.some(it => it.house_type === 0)
						this.items[1].show = !this.list.some(it => it.house_type === 1)
						this.items[2].show = !this.list.some(it => it.house_type === 2)
					},
					onRequestFail: (errorCode, error) => {
						this.loadFail()
					}
				})
			},
			changeStatus (item, status) {
				this.$http({
					url: this.$urlPath.changeRentingState,
					params: {
						hid: item.id,
						action: status,
					},
					onRequestSuccess: (res) => {
						if (status === 3) { // 判断是不是已经租出
							item.status = 3
						} else {
							this.list.splice(this.list.indexOf(item), 1)
						}
					},
					onRequestFail: (errorCode, error) => {
						this.$toast('操作失败，请稍后重试…')
					}
				})
			},
			publish () {
				const tempItems = this.items.filter(it => it.show)
				if (tempItems.length === 1) {
					this.$push(tempItems[0].url)
					return
				}
				uni.showActionSheet({
					itemList: tempItems.map(it => it.name),
					success: (res) => this.$push(tempItems[res.tapIndex].url)
				})
			},
			itemClick (item) {
				this.$push('/pages/house/house-info?hid=' + item.id)
			},
			moreClick (item) {
				uni.showActionSheet({
					itemList: ['已租出', '删除'],
					success: (res) => {
						if (res.tapIndex === 0) {
							uni.showModal({
								content: '确定要关闭该信息吗？',
								success: (r) => {
									if (r.confirm) {
										this.changeStatus(item, 3)
									}
								}
							})
						} else {
							uni.showModal({
								content: '确定要删除该信息吗？',
								success: (r) => {
									if (r.confirm) {
										this.changeStatus(item, 5)
									}
								}
							})
						}
					}
				})
			}
		},
		onLoad() {
			uni.$on(this.$events.REFRESH_HOUSE, () => {
				this.page.num = 1
				this.getData()
			})
			this.getData()
		},
		onUnload () {
			uni.$off(this.$events.REFRESH_HOUSE)
		}
	}
</script>

<style lang="stylus" scoped>
.my-house-container
	.item-wrapper
		display flex
		border-bottom #F5F5F5 solid 1px
		margin-top 2px
		.image-wrapper
			min-width 30%
			height 170rpx
			position relative
			background-color #F5F5F5
			& > image
				width 100%
				height 100%
				border-radius 10rpx
			.rent-type-wrapper
				border-top-left-radius 30rpx
				border-bottom-left-radius 30rpx
				position absolute
				top 0
				right 0
				padding 5rpx 20rpx
		.info-wrapper
			overflow hidden
			display flex
			flex-direction column
			justify-content space-between
</style>
