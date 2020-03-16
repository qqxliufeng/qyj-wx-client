<template>
	<view>
		<my-tab :items='items' :current="current" @onTabSelect="onTabSelect"></my-tab>
		<view style="background-color: #f5f5f5; height: 10rpx;"></view>
		<fab title="发布" @click.native="publish"></fab>
		<swiper class="content-wrapper" :current="current" @animationfinish="animationfinish">
			<swiper-item>
				<my-join-activity></my-join-activity>
			</swiper-item>
			<swiper-item>
				<my-publish-activity></my-publish-activity>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import MyTab from '../../../components/my-tab.vue'
	import MyJoinActivity from '../components/my-join-activity.vue'
	import MyPublishActivity from '../components/my-publish-activity.vue'
	export default {
		name: 'MyActivity',
		components: {
			MyTab,
			MyJoinActivity,
			MyPublishActivity
		},
		data() {
			return {
				items: ['我参加的', '我发布的'],
				current: 0
			}
		},
		methods: {
			onTabSelect (index) {
				this.current = index
			},
			animationfinish (e) {
				if (e.detail.current === this.current) {
					return
				}
				this.current = e.detail.current
			}
		}
	}
</script>

<style lang="stylus" scoped>
.content-wrapper
	margin-top 90rpx
	height calc(100vh - 90rpx)
</style>
