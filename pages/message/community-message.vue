<template>
	<view>
		<view class="bg-white padding-sm shadow-sm solid-bottom" v-for="(item, index) of 5" :key="index" @click="messageItemClick(item)">
			<view class="text-black text-bold text-cut">
				关于做好疫情防护工作的重要安排
			</view>
			<view class="text-gray text-sm margin-top-sm flex justify-between align-center">
				<text>2020-01-01 11:11:11</text>
				<text>来源：社区居委会</text>
			</view>
		</view>
		<load-more :status="loadingType"></load-more>
	</view>
</template>

<script>
	import List from '../../mixins/List.js'
	export default {
		name: 'CommunityMessage',
		mixins: [List],
		methods: {
			getData () {
				this.$http({
					url: this.$urlPath.communityMessage,
					params: {
						cid: 1
					},
					onRequestSuccess: (res) => {
						console.log(res)
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					},
					onRequestComplete: () => {
						uni.stopPullDownRefresh()
					}
				})
			},
			messageItemClick (item) {
				this.$push('/pages/message/message-info')
			}
		},
		onLoad() {
			uni.startPullDownRefresh()
		}
	}
</script>

<style lang="stylus" scoped>
</style>
