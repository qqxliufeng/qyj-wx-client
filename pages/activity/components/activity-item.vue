<template>
	<view class="activity-item-wrapper padding-left-sm padding-right-sm padding-top-xs padding-bottom-xs bg-white" style="margin-top: 3px;"
		@click="clickItem">
		<view class="image-wrapper">
			<image :src="item.images | imagePath" mode="aspectFill"></image>
			<view class="status-wrapper text-center padding-top-xs padding-bottom-xs">
				<text class="text-white text-bold text-sm">{{getStatusTip()}}</text>
			</view>
		</view>
		<view class="info-wrapper padding-left-sm">
			<view class="text-black text-df text-bold text-cut">{{item.content}}</view>
			<view class="text-sm">
				<text>时间：</text>
				<text class="text-red">{{item.start_time * 1000 | dateFormat(false)}}</text>
				<text class="margin-left-xs margin-right-xs">至</text>
				<text class="text-red">{{item.end_time * 1000 | dateFormat(false)}}</text>
			</view>
			<view class="text-sm flex">
				<text>地点：</text>
				<text class="text-red text-cut flex-sub">{{item.address}}</text>
			</view>
			<view class="flex align-center text-sm">
				<text>人数：</text>
				<text class="text-red">{{item.min_count + '~' + (item.max_count === -1 ? '不限' : item.max_count)}}</text>
				<text class="flex-sub"></text>
				<button v-if="showButton" class="cu-btn sm" :class="Number(item.join_status) === 1 ? 'bg-gradual-blue' : 'bg-gradual-orange'">{{Number(item.join_status) === 1 ? '已经报名' : '立即报名'}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ActivityItem',
		props: {
			item: Object,
			showButton: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			getStatusTip () {
				switch (this.item.status) {
					case 0:
						return '未开始'
					case 1:
						if (this.item.end_time * 1000 > new Date().getTime()) {
							return '进行中'
						} else {
							return '已结束'
						}
					case 2:
						return '已满员'
					case 3:
						return '已结束'
					case 4:
						return '已下架'
					case 5:
						return '已下架'
				}
				return '未知'
			},
			clickItem () {
				this.$push('/pages/activity/activity-info?aid=' + this.item.id)
			}
		}
	}
</script>

<style lang="stylus" scoped>
.activity-item-wrapper
	display flex
	border-bottom #F5F5F5 solid 2px
	.image-wrapper
		width 30%
		height 180rpx
		background-color #F5F5F5
		position relative
		& > image
			width 100%
			height 100%
			border-radius 10rpx
		.status-wrapper
			position absolute
			bottom 0
			right 0
			left 0
			background-color rgba(0,0,0,.4)
			border-bottom-left-radius 10rpx
			border-bottom-right-radius 10rpx
	.info-wrapper
		overflow hidden
		flex 1
		display flex
		flex-direction column
		justify-content space-between
</style>
