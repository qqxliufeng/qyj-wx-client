<template>
	<view class="add-new-phone-container">
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">服务标题</view>
				<input placeholder="如: 物业中心(最多10个字)" v-model="title" maxlength="10"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系姓名</view>
				<input placeholder="如: 王师傅(最多5个字)" v-model="concat" maxlength="5"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系电话</view>
				<input placeholder="如: 18888888888" v-model="phone" maxlength="11"></input>
			</view>
		</form>
		<view class="text-center action-wrapper">
			<button class="cu-btn bg-yellow margin lg" style="width: 90%;" @click="addNewPhone">确定添加</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'AddNewPhone',
		data() {
			return {
				title: '',
				concat: '',
				phone: ''
			}
		},
		methods: {
			addNewPhone () {
				if (!this.title) {
					this.$toast('请输入服务标题')
					return
				}
				if (!this.concat) {
					this.$toast('请输入联系人')
					return
				}
				if (!this.phone) {
					this.$toast('请输入联系电话')
					return
				}
				if (!this.$utils.validator.isPhone(this.phone)) {
					this.$toast('请输入合法的联系方式')
					return
				}
				this.$http({
					url: this.$urlPath.addPhoneInfo,
					params: {
						cid: this.$routeParams.cid,
						title: this.title,
						concat: this.concat,
						phone: this.phone,
						status: 0
					},
					onRequestSuccess: (res) => {
						uni.showModal({
							content: '添加成功，请耐心等待后台审核…',
							showCancel: false,
							success: (res) => {
								this.$back()
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
.action-wrapper
	position fixed
	left 0
	right 0
	bottom 20rpx
</style>
