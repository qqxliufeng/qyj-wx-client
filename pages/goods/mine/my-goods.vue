<template>
	<view class="my-goods-contianer">
		<view v-for="item of list" :key="item.id" class="flex padding-sm bg-white" style="border-bottom: #F5F5F5 solid 1px" @click="goodsItemClick(item)">
			<view class="image-wrapper">
				<image :src="item.goods_images[0] | imagePath" mode="aspectFill"></image>
			</view>
			<view class="flex-sub info-wrapper">
				<view class="text-black text-bold text-lg flex justify-between">
					<text class="text-cut">{{item.goods_des}}</text>
					<text class="cuIcon-more text-gray" @click.stop="moreClick(item)"></text>
				</view>
				<view v-if="item.goods_tags && item.goods_tags.length > 0" class="tag-wrapper">
					<text v-for="(it, index) of item.goods_tags" :key="index" class='cu-tag sm round' :class="index % 2 === 0 ? 'line-yellow' : 'line-cyan'">{{it}}</text>
				</view>
				<view>
					<text class="text-gray text-df">邮费：</text>
					<text class="text-black">{{item.delivery_type === 0 ? '包邮' : '买家付'}}</text>
				</view>
				<view class="flex justify-between">
					<text class="text-price text-red text-bold">{{item.goods_price}}</text>
					<text class="text-price text-gray margin-left-sm old-price">{{item.goods_origin_price}}</text>
					<text class="flex-sub"></text>
					<text v-if="item.status === 2" class="text-red text-bold">已售出</text>
				</view>
			</view>
		</view>
		<fab title="发布" @click.native="publish"></fab>
		<load-more :status="loadingType"></load-more>
	</view>
</template>

<script>
	import List from '../../../mixins/List.js'
	export default {
		name: 'MyGoods',
		mixins: [List],
		data() {
			return {
				actions: [
					{
						title: '已售出',
						status: 2,
						isShow: true
					},
					{
						title: '删除',
						status: 5,
						isShow: true
					}
				]
			}
		},
		methods: {
			publish () {
				this.$push('/pages/goods/mine/publish-goods')
			}
		},
		methods: {
			getData () {
				this.$http({
					url: this.$urlPath.getMyGoodsList,
					params: {
						page: this.page.num
					},
					onRequestSuccess: (res) => {
						res.data.forEach(it => {
							it.goods_images = it.goods_images.split(',')
							it.goods_tags = it.goods_tags ? it.goods_tags.split(',') : ''
						})
						this.loadSuccess(res.data)
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					}
				})
			},
			changeStatus (item, status) {
				this.$http({
					url: this.$urlPath.changeGoodsStatus,
					params: {
						gid: item.id,
						status: status
					},
					onRequestSuccess: (res) => {
						this.page.num = 1
						this.getData()
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					}
				})
			},
			moreClick (item) {
				this.actions[0].isShow = item.status !== 2
				const temp = this.actions.filter(it => it.isShow)
				uni.showActionSheet({
					itemList: temp.map(it => it.title),
					success: (res) => {
						uni.showModal({
							content: '确定要关闭此信息吗',
							success: (r) => {
								if (r.confirm) {
									this.changeStatus(item, temp[res.tapIndex].status)
								}
							}
						})
					}
				})
			},
			goodsItemClick (item) {
				this.$push('/pages/goods/goods-info?gid=' + item.id)
			}
		},
		onLoad() {
			this.getData()
		}
	}
</script>

<style lang="stylus" scoped>
.my-goods-contianer
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
