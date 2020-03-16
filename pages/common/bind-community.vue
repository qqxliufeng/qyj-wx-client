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
						areaName: '济南'
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
					content: '是否要绑定该小区？',
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
						isPrimary: 0
					},
					onRequestSuccess: (res) => {
						this.$userInfo.saveCommunities(res.data)
						item.isBind = true
						this.$toast('绑定成功')
						uni.$emit('refreshBindCommunity')
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
