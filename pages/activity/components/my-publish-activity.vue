<template>
	<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="scrolltolower">
		<view class="container bg-white">
			<block v-if="list && list.length !== 0">
				<activity-item v-for="item of list" :key="item.id" @btnClick="joinPersonInfo"></activity-item>
			</block>
			<load-more :status="loadingType"></load-more>
		</view>
	</scroll-view>
</template>

<script>
	import List from '../../../mixins/List.js'
	import ActivityItem from './activity-item.vue'
	export default {
		name: 'MyPublishActivity',
		mixins: [List],
		components: {
			ActivityItem
		},
		data() {
			return {
				list: [
					{
						id: 0
					},
					{
						id: 1
					}
				]
			}
		},
		methods: {
			joinPersonInfo () {
				this.$push('/pages/activity/activity-info')
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
