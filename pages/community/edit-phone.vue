<template>
	<view class="add-new-phone-container" v-if="info">
		<form>
			<view class="cu-form-group margin-top">
				<view class="title text-gray">标题</view>
				<input placeholder="如: 物业中心(最多10个字)" v-model="info.title" maxlength="10"></input>
			</view>
			<view class="cu-form-group">
				<view class="title text-gray">姓名</view>
				<input placeholder="如: 王师傅(最多5个字)" v-model="info.concat" maxlength="5"></input>
			</view>
			<view class="cu-form-group">
				<view class="title text-gray">电话</view>
				<input placeholder="如: 18888888888" v-model="info.phone" maxlength="11"></input>
			</view>
			<view class="text-sm text-gray margin">信息创建于：{{info.create_time * 1000 | dateFormat}}</view>
		</form>
		<view class="text-center action-wrapper">
			<button class="cu-btn bg-yellow margin lg" style="width: 90%;" @click="editPhone">确定修改</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'AddNewPhone',
		data() {
			return {
				info: null
			}
		},
		onLoad () {
			this.getData()
		},
		methods: {
			getData () {
				this.$http({
					url: this.$urlPath.getPhoneInfo,
					params: {
						pid: this.$routeParams.pid
					},
					onRequestSuccess: (res) => {
						this.info = res.data
					}
				})
			},
			editPhone () {
				if (!this.info.title) {
					this.$toast('请输入服务标题')
					return
				}
				if (!this.info.concat) {
					this.$toast('请输入联系人')
					return
				}
				if (!this.info.phone) {
					this.$toast('请输入联系电话')
					return
				}
				if (!this.$utils.validator.isPhone(this.info.phone)) {
					this.$toast('请输入合法的联系方式')
					return
				}
				this.$http({
					url: this.$urlPath.editPhoneInfo,
					params: {
						pid: this.$routeParams.pid,
						cid: this.$routeParams.cid,
						title: this.info.title,
						concat: this.info.concat,
						phone: this.info.phone,
						status: 0
					},
					onRequestSuccess: (res) => {
						uni.showModal({
							content: '修改成功，请耐心等待后台审核…',
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
