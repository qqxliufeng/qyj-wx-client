<template>
	<view class="lost-container">
		<my-tab :items='items' :current="current" @onTabSelect="onTabSelect"></my-tab>
		<view style="background-color: #f5f5f5; height: 10rpx;"></view>
		<fab title="发布" @click.native="publish"></fab>
		<swiper class="content-wrapper" :current="current" @animationfinish="animationfinish">
			<swiper-item>
				<lost-list ref="lostList" :show="current === 0" :url="myLostListUrl"></lost-list>
			</swiper-item>
			<swiper-item>
				<lost-list :show="current === 1" :url="myHelpListUrl"></lost-list>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import MyTab from '../../../components/my-tab.vue'
	import LostList from '../components/lost-list.vue'
	export default {
		name: 'MyLost',
		components: {
			MyTab,
			LostList
		},
		data () {
			return {
				items: ['我发布的', '我帮助的'],
				current: 0,
				myLostListUrl: this.$urlPath.getUserLostList,
				myHelpListUrl: this.$urlPath.getUserHelpList
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
			},
			publish () {
				this.$push('/pages/lost/publish-lost')
			}
		},
		onLoad() {
			uni.$on('refreshLost', () => {
				this.$refs.lostList.onRefresh()
			})
		},
		onUnload() {
			uni.$off('refreshLost')
		}
	}
</script>

<style lang="stylus" scoped>
.lost-container
	.content-wrapper
		margin-top 90rpx
		height calc(100vh - 90rpx)
</style>
