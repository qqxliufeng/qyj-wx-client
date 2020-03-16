<template>
	<view class="person-info-container">
		<view class="item-wrapper bg-white">
			<text class="text-black text-lg">头像</text>
			<view @click="selectAvatar">
				<view class="cu-avatar lg round margin-left" :style="{backgroundImage:avatarUrl}"></view>
				<text class="cuIcon-right text-gray text-df margin-left-sm"></text>
			</view>
		</view>
		<view class="item-wrapper bg-white">
			<text class="text-black text-lg">手机号</text>
			<text class="text-gray text-lg">{{mobile}}</text>
		</view>
		<view class="item-wrapper bg-white">
			<text class="text-black text-lg">昵称</text>
			<view @click="modifyNickName">
				<text class="text-gray text-lg">{{nickName}}</text>
				<text class="cuIcon-right text-gray text-df margin-left-sm"></text>
			</view>
		</view>
		<view class="cu-modal" :class="showDialog ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改昵称</view>
					<view class="action" @tap="showDialog = false">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-lg">
					<input placeholder="请输入昵称,3~6字" maxlength="6" v-model="nickName"/>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="showDialog = false">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="confirmDialog">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'PersonInfo',
		data() {
			return {
				uploadImagePath: [],
				nickName: this.$userInfo.state.nickname,
				avatarUrl: `url(${this.$urlPath.imageUrl}${this.$userInfo.state.avatar})`,
				showDialog: false,
				mobile: this.$userInfo.state.mobile
			}
		},
		methods: {
			selectAvatar () {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						const paths = res.tempFilePaths
						this.$upload({
							files: paths,
							uploadSuccess: (imagePath) => {
								this.uploadImagePath.push(imagePath)
								if (this.uploadImagePath.length === paths.length) {
									this.uploadAvatar()
								}
							}
						})
					}
				})
			},
			uploadAvatar () {
				this.$http({
					url: this.$urlPath.userInfoResetInfo,
					params: {
						nickname: this.nickname,
						avatar: this.uploadImagePath[0]
					},
					onRequestSuccess: (res) => {
						this.$userInfo.saveUserAvatar(this.uploadImagePath[0])
						this.avatarUrl = `url(${this.$urlPath.imageUrl}${this.uploadImagePath[0]})`
						this.$toast('修改成功')
						uni.$emit('refreshUserInfo')
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					}
				})
			},
			modifyNickName () {
				this.showDialog = true
			},
			confirmDialog () {
				this.showDialog = false
				if (!this.nickName) {
					this.$toast('请输入新的昵称')
				}
				if (this.nickName.length < 3) {
					this.$toast('昵称至少三个字符')
				}
				this.$http({
					url: this.$urlPath.userInfoResetInfo,
					params: {
						nickname: this.nickName,
						avatar: this.$userInfo.state.avatar
					},
					onRequestSuccess: (res) => {
						this.$userInfo.saveUserNickName(this.nickName)
						this.$toast('修改成功')
						uni.$emit('refreshUserInfo')
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					}
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
.person-info-container
	.item-wrapper
		display flex
		justify-content space-between
		align-items center
		padding 30rpx 20rpx
</style>
