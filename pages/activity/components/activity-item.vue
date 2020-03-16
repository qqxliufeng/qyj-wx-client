<template>
	<view class="activity-item-wrapper padding-left-sm padding-right-sm padding-top-xs padding-bottom-xs bg-white" style="margin-top: 3px;"
		@click="clickItem">
		<view class="image-wrapper">
			<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg" mode="aspectFill"></image>
			<view class="status-wrapper text-center padding-top-xs padding-bottom-xs">
				<text class="text-white text-bold text-sm">进行中</text>
			</view>
		</view>
		<view class="info-wrapper padding-left-sm">
			<view class="text-black text-lg text-bold text-cut">这是一个标题</view>
			<view class="text-df">
				<text>时间：</text>
				<text class="text-red">2019-1-1</text>
				<text class="margin-left-xs margin-right-xs">至</text>
				<text class="text-red">2019-1-1</text>
			</view>
			<view class="text-df flex">
				<text>地点：</text>
				<text class="text-red text-cut flex-sub">1号楼前面</text>
			</view>
			<view class="flex align-center text-df">
				<text>人数：</text>
				<text class="text-red">不限</text>
				<text class="flex-sub"></text>
				<button class="cu-btn sm bg-gradual-orange" @click.stop="btnClick">我要报名</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ActivityItem',
		methods: {
			clickItem () {
				this.$push('/pages/activity/activity-info')
			},
			btnClick () {
				this.$emit('btnClick')
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
