<template>
	<view class="publish-house-container">
		<view class="bg-white margin-sm info-wrapper shadow-sm padding-sm">
			<textarea placeholder="空间优势/配置信息/求租要求等" v-model="formData.content"></textarea>
			<select-image :maxImagesCount="6" ref="selectImage"></select-image>
		</view>
		<view class="bg-white margin-sm shadow-sm padding-left-sm padding-right-sm item-wrapper">
			<view class="item padding-bottom-sm padding-top-sm">
				<text class="text-black text-lg">位置</text>
				<picker class="text-df" style="color: #666666;" :range="communityArray" :value="communityIndex" @change="communityChange">
					<text>{{communityName}}</text>
					<text class="cuIcon-right text-gray margin-left-sm"></text>
				</picker>
			</view>
			<view class="line"></view>
			<view class="item padding-bottom-sm padding-top-sm">
				<text class="text-black text-lg">面积</text>
				<view class="text-df flex align-center" style="color: #666666;">
					<input v-model="formData.area" type="digit" placeholder="实际面积(m2)" class="text-df" style="width: 200rpx; text-align: right;"></text>
					<text class="cuIcon-right text-gray margin-left-sm"></text>
				</view>
			</view>
			<view class="line"></view>
			<view class="item padding-bottom-sm padding-top-sm">
				<text class="text-black text-lg">租金</text>
				<view class="text-df flex align-center" style="color: #666666;">
					<input v-model="formData.price" type="digit" placeholder="月租金价格(元/月)" class="text-df" style="width: 250rpx; text-align: right;"></text>
					<text class="cuIcon-right text-gray margin-left-sm"></text>
				</view>
			</view>
		</view>
		<view class="margin-sm shadow-sm padding-sm item-wrapper bg-white">
			<view class="item padding-bottom-sm padding-top-sm">
				<view class="text-black text-lg">称呼</view>
				<input style="flex: 1;" class="text-df margin-left" placeholder="称呼,如黄先生或黄女士" name="input" v-model="formData.name" maxlength="6"></input>
			</view>
			<view class="line"></view>
			<view class="item padding-bottom-sm padding-top-sm">
				<view class="text-black text-lg">方式</view>
				<input style="flex: 1;" class="margin-left text-df" placeholder="联系人电话或微信号" v-model="formData.phone" name="input" maxlength="30"></input>
			</view>
		</view>
		<view class="text-gray text-sm text-center margin-top">
			<text>发布租房需阅读并遵守</text>
			<text class="text-yellow">《租房发布须知》</text>
		</view>
		<view class="text-center text-yellow margin-top text-df">
			注：该信息只能对当前小区可见
		</view>
		<view class="padding flex flex-direction margin-top">
			<button class="cu-btn round bg-yellow" @click="publish">发布</button>
		</view>
	</view>
</template>

<script>
	import SelectImage from '../../common/select-images.vue'
	export default {
		name: 'PublishHouse',
		components: {
			SelectImage
		},
		data () {
			return {
				communityArray: [],
				communityIndex: 0,
				communityName: '',
				formData: {
					content: '',
					images: [],
					community: null,
					area: '',
					price: '',
					name: '',
					phone: ''
				}
			}
		},
		methods: {
			communityChange (e) {
				this.communityIndex = e.detail.value
				this.communityName = this.communityArray[this.communityIndex]
				this.formData.community = this.$userInfo.getCommunities()[this.communityIndex].id
			},
			publish () {
				if (!this.formData.community) {
					this.$toast('请选择要出租的小区')
					return
				}
				if (!this.formData.content || this.formData.content.length < 5) {
					this.$toast('描述不能为空，且至少5个字')
					return
				}
				
				if (!this.formData.area || isNaN(this.formData.area) || parseFloat(this.formData.area) === 0) {
					this.$toast('请输入合法的面积')
					return
				}
				if (!this.formData.price || isNaN(this.formData.price) || parseFloat(this.formData.price) === 0) {
					this.$toast('请输入合法的租金价格')
					return
				}
				this.$refs.selectImage.upload().then((res) => {
					this.formData.images = res
					const param = {
						cid: this.formData.community,
						content: this.formData.content,
						images: this.formData.images.join(','),
						area: this.formData.area,
						houseType: 2,
						name: this.formData.name,
						phone: this.formData.phone,
						money: this.formData.price
					}
					this.$http({
						url: this.$urlPath.publishRentingHouseInfo,
						params: {
							data: JSON.stringify(param)
						},
						onRequestSuccess: (res) => {
							uni.$emit(this.$events.REFRESH_HOUSE)
							this.$back()
						},
						onRequestFail: (errorCode, error) => {
							this.$toast(error)
						}
					})
				})
			}
		},
		onLoad () {
			uni.$on('selectedHouseInfo', (info) => {
				this.formData.moreInfo = info
				this.moreInfo = info.direction
									.concat(info.configs)
									.concat(info.feature)
									.concat(info.exception)
									.concat(info.decoration)
									.concat(info.time)
									.join('/')
			})
			const communities = this.$userInfo.getCommunities()
			if (communities) {
				this.communityArray = communities.map((it, index) => {
					if (Number(it.pivot.is_primary) === 1) {
						this.communityName = it.name
						this.communityIndex = index
						this.formData.community = it.id
					}
					return it.name
				})
			}
		},
		onUnload() {
			uni.$off('selectedHouseInfo')
		}
	}
</script>

<style lang="stylus" scoped>
.publish-house-container
	.info-wrapper
		border-radius 10rpx
		& > textarea
			font-size 15px
			width 100%
			height 150rpx
	.item-wrapper
		border-radius 10rpx
		.item
			display flex
			justify-content space-between
		.line
			margin 0 auto
			background-color #F5F5F5
			height 1px
	.other-item
		border-radius 10rpx
		display flex
		justify-content space-between
</style>
