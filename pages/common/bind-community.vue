<template>
	<view class="bind-community-container">
		<block v-for="item of list" :key="item.id">
			<community-item :item="item" @bindCommunity="bindCommunity"></community-item>
		</block>
		<load-more :status="loadingType"></load-more>
	</view>
</template>

<script>
	import List from '../../mixins/List.js'
	import CommunityItem from '../../components/community-item.vue'
	export default {
		name: 'BindCommunity',
		mixins: [List],
		components: {
			CommunityItem
		},
		data() {
			return {
				communityList: this.$userInfo.getCommunities()
			}
		},
		methods: {
			getData () {
				this.$http({
					url: this.$urlPath.getCommunities,
					params: {
						areaName: this.$userInfo.currentCity()
					},
					onRequestSuccess: (res) => {
						if (res.data) {
							res.data.forEach(item => {
								if (item.images) {
									item.images = item.images.split(',')
								}
								if (this.communityList) {
									item.isBind = this.communityList.some((it) => {
										return it.id === item.id
									})
								} else {
									item.isBind = false
								}
							})
						}
						this.loadSuccess(res.data)
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					}
				})
			},
			bindCommunity (item) {
				uni.showModal({
					title: '重要提示',
					content: '请确认是否为本小区真实业主，一旦绑定，不可更改，确定要绑定该小区吗？',
					success: (res) => {
						if (res.confirm) {
							this.onBindCommunity(item)
						}
					}
				})
			},
			onBindCommunity (item) {
				this.$http({
					url: this.$urlPath.bindCommunity,
					params: {
						cid: item.id,
						isPrimary: this.communityList.length > 0 ? '0' : '1'
					},
					onRequestSuccess: (res) => {
						this.$userInfo.saveCommunities(res.data)
						item.isBind = true
						uni.$emit(this.$events.REFRESH_BIND_COMMUNITY)
						uni.showModal({
							title: '提示',
							content: '您已成功绑定该小区'
						})
						this.$back()
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					}
				})
			}
		},
		onLoad() {
			this.getData()
		}
	}
</script>

<style lang="stylus" scoped>
</style>
