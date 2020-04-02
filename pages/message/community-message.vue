<template>
	<view>
		<view class="bg-white padding-sm shadow-sm solid-bottom" v-for="item of list" :key="list.id" @click="messageItemClick(item)">
			<view class="text-black text-bold text-cut">
				{{item.title}}
			</view>
			<view class="text-gray text-sm margin-top-sm flex justify-between align-center">
				<text>{{item.create_time | dateFormat}}</text>
				<text>来源：{{item.source}}</text>
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
						cid: this.$routeParams.cid,
						page: this.page.num
					},
					onRequestSuccess: (res) => {
						this.loadSuccess(res.data)
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
				this.$push('/pages/message/message-info?mid=' + item.id)
			}
		},
		onLoad() {
			uni.startPullDownRefresh()
		}
	}
</script>

<style lang="stylus" scoped>
</style>
