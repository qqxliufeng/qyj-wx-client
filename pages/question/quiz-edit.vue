<template>
	<view class="quiz-container">
		<view class="cu-form-group title-wrapper">
			<textarea placeholder="请输入问题(5~30)字" name="title" maxlength="30" v-model="title"></textarea>
		</view>
		<view class="cu-form-group content-wrapper">
			<textarea placeholder="添加问题描述(10~300)字,选填" name="content" maxlength="300" v-model="content"></textarea>
		</view>
		<view class="title text-black margin">
			图片（选填，最多三张）
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub" style="margin-top: 20rpx;">
				<view class="bg-img" v-for="(item,index) of imgList" :key="index" @tap="viewImage" :data-url="item">
				 <image :src="item | imagePath" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="delImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="chooseImage" v-if="imgList.length<3">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
		<view class="cu-form-group" style="border: 0; margin-top: 20rpx;">
			<view class="title">是否仅对本社区可见</view>
			<switch @change="open" :class="opened?'checked':''" :checked="opened?true:false"></switch>
		</view>
		<view class="margin" style="margin-top: 80rpx;">
			<button class="cu-btn block bg-yellow lg" @click="publish">
				确认修改
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Quiz',
		data() {
			return {
				imgList: [],
				opened: false,
				title: '',
				content: '',
				images: [],
				originalImageList: []
			}
		},
		methods: {
			getData () {
				this.$http({
					url: this.$urlPath.getQuestionMessageInfo,
					params: {
						qid: this.$routeParams.qid
					},
					onRequestSuccess: (res) => {
						const info = res.data
						if (info) {
							if (info.images) {
								this.imgList = info.images.split(',')
								this.originalImageList = this.imgList
							}
							this.title = info.title
							this.content = info.content
							this.opened = Number(info.is_local) === 1
						}
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
					}
				})
			},
			publish () {
				if (!this.title) {
					this.$toast('请输入问题标题')
					return
				}
				if (this.title.length < 5) {
					this.$toast('标题至少5个字')
					return
				}
				const tempList = this.imgList.filter(it => {
					return it.indexOf('http') !== -1
				})
				if (tempList.length > 0) {
					this.$upload({
						files: tempList,
						uploadSuccess: (imagePath) => {
							this.images.push(imagePath)
							if (this.images.length === tempList.length) {
								this.$http({
									url: this.$urlPath.editQuestionMessage,
									params: {
										qid: this.$routeParams.qid,
										title: this.title,
										content: this.content,
										images: this.originalImageList.concat(this.images).join(','),
										isLocal: this.opened ? '1' : '0'
									},
									onRequestSuccess: (res) => {
										uni.$emit('refreshQuestion')
										this.$back()
									},
									onRequestFail: (errorCode, error) => {
										this.$toast('修改失败' + error)
									}
								})
							}
						}
					})
				} else {
					console.log(this.originalImageList.join(','))
					this.$http({
						url: this.$urlPath.editQuestionMessage,
						params: {
							qid: this.$routeParams.qid,
							title: this.title,
							images: this.originalImageList.join(','),
							content: this.content,
							isLocal: this.opened ? '1' : '0'
						},
						onRequestSuccess: (res) => {
							uni.$emit('refreshQuestion')
							this.$back()
						},
						onRequestFail: (errorCode, error) => {
							this.$toast('修改失败' + error)
						}
					})
				}
				
			},
			open (e) {
				this.opened = e.detail.value
			},
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
			}
		},
		onLoad() {
			this.getData()
		}
	}
</script>

<style lang="stylus" scoped>
.quiz-container
	position relative
	.title-wrapper > textarea
		height 2.6em
	.content-wrapper
		margin-top 10rpx
		border 0 !important
		& > textarea
			height 9em
</style>
