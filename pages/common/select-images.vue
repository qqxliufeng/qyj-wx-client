<template>
	<view>
		<view class="grid col-3 grid-square flex-sub" style="margin-top: 20rpx;;">
			<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="viewImage" :data-url="imgList[index]">
			 <image :src="imgList[index]" mode="aspectFill"></image>
				<view class="cu-tag bg-red" @tap.stop="delImg" :data-index="index">
					<text class='cuIcon-close'></text>
				</view>
			</view>
			<view class="solids" @tap="chooseImage" v-if="imgList.length<6">
				<text class='cuIcon-add text-gray' style="font-size: 50px;"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'SelectImages',
		props: {
			maxImagesCount: {
				type: Number,
				default: 3
			}
		},
		data () {
			return {
				imgList: [],
				uploadImages: []
			}
		},
		methods: {
			chooseImage () {
				if (this.imgList.length >= this.maxImagesCount) {
					this.$toast('最多上传 ' + this.maxImagesCount + ' 张图片')
					return
				}
				uni.chooseImage({
					count: this.maxImagesCount - this.imgList.length,
					sizeType: ['original', 'compressed'],
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			delImg (e) {
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
			upload () {
				if (this.imgList.length === 0) {
					this.$toast('请先上传1~' + this.maxImagesCount + '张图片')
					return
				}
				return new Promise((resolve, reject) => {
					this.$upload({
						files: this.imgList,
						uploadSuccess: (imagePath) => {
							this.uploadImages.push(imagePath)
							if (this.uploadImages.length === this.imgList.length) {
								resolve(this.uploadImages)
							}
						}
					})
				})
			}
		}
	}
</script>

<style>
</style>
