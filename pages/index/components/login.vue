<template>
	<view class="login-container">
		<view class="iconfont" style="font-size: 240rpx; color: #bbbbbb;">&#xe648;</view>
		<view class="text-black text-lg" style="margin: 40rpx;">{{title}}</view>
		<button class="cu-btn bg-yellow round shadow" @click="login">立即登录</button>
	</view>
</template>

<script>
	export default {
		name: 'login',
		props: {
			title: String
		},
		methods: {
			login () {
				this.$http({
					url: this.$urlPath.userInfoLoginUrl,
					loadingTip: '正在登录',
					params: {
						account: 'admin',
						password: '123456'
					},
					onRequestSuccess: (res) => {
						this.$userInfo.saveUserInfo(res.data.userinfo, res.data.communities)
					},
					onRequestFail: (errorCode, error) => {
						console.log(error)
					}
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
.login-container
	display flex
	justify-content center
	align-items center
	flex-direction column
	height calc(100vh - 43px)
</style>
