export default {
	data () {
		return {
			imgList: [],
			maxImagesCount: 3
		}
	},
	methods: {
		chooseImage () {
			if (this.imgList.length >= this.maxImagesCount) {
				this.$toast('最多上传六张图片')
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
		}
	}
}