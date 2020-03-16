<template>
	<view class="index-type-container">
		<view v-for="item of types" :key="item.id" class="type-item text-black" @click="clickItem">
			<text class="nav-name name text-black">{{item.name}}</text>
			<text class="iconfont icon" :class="[item.icon, item.color]"></text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'IndexType',
		data() {
			return {
				types: [
					{
						id: 0,
						name: '房源',
						icon: 'iconhouse',
						color: 'text-yellow'
					},
					{
						id: 1,
						name: '闲置',
						icon: 'iconshangpin1',
						color: 'text-mauve'
					},
					{
						id: 2,
						name: '寻物',
						icon: 'iconyishenbaochaxun03',
						color: 'text-green'
					},
					{
						id: 3,
						name: '互助',
						color: 'text-blue',
						icon: 'iconwendashixin'
					}
				]
			}
		},
		methods: {
			clickItem () {
				console.log('item')
				uni.showModal({
					title: '提示',
					content: '这是一行\n这是一行\n这是一行'
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
.index-type-container
	display flex
	.type-item
		flex 1
		display flex
		align-items flex-start
		height 140rpx
		margin 20rpx
		border-radius 20rpx
		box-shadow: 0 5px 4px rgba(0,0,0,0.02)
		background-color #FFFFFF
		position relative
		.name
			margin-left 30rpx
			margin-bottom 30rpx
		.icon
			position absolute
			bottom 10rpx
			right 10rpx
			background-color #f5f5f5
			border-radius 50%
			padding 10rpx
			width 30rpx
			height 30rpx
</style>
