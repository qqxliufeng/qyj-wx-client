export default {
	data () {
		return {
			currentCommunity: this.$userInfo.getPrimaryCommunity()
		}
	},
	methods: {
		primaryCommunityChange () {
			this.currentCommunity = this.$userInfo.getPrimaryCommunity()
			if (this.onPrimaryCommunityChange) this.onPrimaryCommunityChange()
		}
	},
	onLoad () {
		uni.$on(this.$events.PRIMARY_COMMUNITY_CHANGE, this.primaryCommunityChange)
	},
	onUnload () {
		uni.$off(this.$events.PRIMARY_COMMUNITY_CHANGE)
	}
}