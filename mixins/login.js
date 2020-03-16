export default {
	data () {
		return {
			isLogin: this.$userInfo.isLogin()
		}
	},
	onLoad () {
		uni.$on('onLogin', () => {
			this.isLogin = true
			if (this.onLogin) this.onLogin()
		})
	}
}