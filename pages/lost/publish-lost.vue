<template>
	<view class="publish-lost-container">
		<view class="cu-form-group content-wrapper">
			<textarea placeholder="添加要寻找的物品描述(10~1000)字" name="content" maxlength="1000" v-model="content"></textarea>
		</view>
		<view class="title text-black margin">
			图片（选填，最多三张）
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub" style="margin-top: 20rpx;">
				<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="viewImage" :data-url="imgList[index]">
				 <image :src="imgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="delImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="chooseImage" v-if="imgList.length<4">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title">联系人</view>
			<input placeholder="请输入联系人姓名" name="input" v-model="concatName" maxlength="6"></input>
			<text class="margin-right">{{sex ? '先生' : '女士'}}</text>
			<switch class='switch-sex' @change="changeSex" :class="sex?'checked':''" :checked="sex?true:false"></switch>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号码</view>
			<input placeholder="请输入联系人电话" name="input" maxlength="11" v-model="concatPhone"></input>
		</view>
		<view class="cu-form-group" style="border: 0; margin-top: 20rpx;">
			<view class="title">是否仅对本小区开放</view>
			<switch @change="open" :class="opened?'checked':''" :checked="opened?true:false"></switch>
		</view>
		<view class="margin" style="margin-top: 80rpx;">
			<button class="cu-btn block bg-yellow lg" @click="publish">
				发布
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'PulishLost',
		data() {
			return {
				content: '',
				imgList: [],
				opened: false,
				sex: true,
				concatName: '',
				concatPhone: '',
				images: []
			}
		},
		methods: {
			chooseImage() {
				if (this.imgList.length >= 3) {
					this.$toast('最多上传三张图片')
					return
				}
				uni.chooseImage({
					count: 3 - this.imgList.length, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			viewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			delImg(e) {
				uni.showModal({
					title: '提示',
					content: '确定要删除此图片吗？',
					cancelText: '不删除',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			changeSex(e) {
				this.sex = e.detail.value
			},
			open (e) {
				this.opened = e.detail.value
			},
			upload () {
				this.$http({
					url: this.$urlPath.publishLost,
					params: {
						content: this.content,
						name: this.concatName + (this.sex ? '先生' : '女士'),
						phone: this.concatPhone,
						images: this.images.length > 0 ? this.images.join(',') : '',
						isLocal: this.opened ? '0' : '1'
					},
					onRequestSuccess: (res) => {
						this.$toast('发布成功')
						uni.$emit('refreshLost')
						this.$back()
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					}
				})
			},
			publish () {
				if (!this.content) {
					this.$toast('请输入描述信息')
					return
				}
				if (this.content.length < 10) {
					this.$toast('请至少输入10字描述信息')
					return
				}
				if (!this.concatName) {
					this.$toast('请输入联系人姓名')
					return
				}
				if (!this.concatPhone) {
					this.$toast('请输入联系人电话')
					return
				}
				if (!this.$utils.validator.isPhone(this.concatPhone)) {
					this.$toast('请输入合法的手机号')
					return
				}
				if (this.imgList.length > 0) {
					this.$upload({
						files: this.imgList,
						uploadSuccess: (imagePath) => {
							this.images.push(imagePath)
							if (this.images.length === this.imgList.length) {
								this.upload()
							}
						}
					})
				} else {
					this.upload()
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
.publish-lost-container
	position relative
	.title-wrapper > textarea
		height 2.6em
	.content-wrapper
		margin-top 10rpx
		border 0 !important
		& > textarea
			height 9em
</style>
