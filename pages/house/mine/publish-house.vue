<template>
	<view class="publish-house-container">
		<scroll-view scroll-x class="bg-white nav text-center">
			<view class="cu-item text-df text-bold" :class="index == currentTab ? 'text-yellow cur':''" v-for="(item,index) in navs" :key="index" @tap="tabSelect(index)" :data-id="index">
				{{item}}
			</view>
		</scroll-view>
		<view class="bg-white margin-sm info-wrapper shadow-sm padding-sm">
			<textarea placeholder="房源名称/附近地标/居住优势/对TA的期望/求租要求等" v-model="formData.content"></textarea>
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
				<text class="text-black text-lg">户型</text>
				<picker mode="multiSelector" @change="houseChange" :range="houseMultiArray" :value="houseMultiIndex">
					<view class="picker text-gray text-df">
						<text style="color: #666666;">{{selectHouseType}}</text>
						<text class="cuIcon-right text-gray margin-left-sm"></text>
					</view>
				</picker>
			</view>
			<view class="line"></view>
			<view class="item padding-bottom-sm padding-top-sm" v-show="currentTab === 0">
				<text class="text-black text-lg">卧室类型</text>
				<picker class="text-df" style="color: #666666;" :range="roomArray" :value="roomIndex" @change="roomChange">
					<text>{{roomName}}</text>
					<text class="cuIcon-right text-gray margin-left-sm"></text>
				</picker>
			</view>
			<view class="line" v-show="currentTab === 0"></view>
			<view class="item padding-bottom-sm padding-top-sm">
				<text class="text-black text-lg">面积</text>
				<view class="text-df flex align-center" style="color: #666666;">
					<input v-model="formData.area" maxlength="5" type="digit" placeholder="单间面积(m2)" class="text-df" style="width: 200rpx; text-align: right;"></text>
					<text class="cuIcon-right text-gray margin-left-sm"></text>
				</view>
			</view>
			<view class="line"></view>
			<view class="item padding-bottom-sm padding-top-sm">
				<text class="text-black text-lg">租金</text>
				<view class="text-df flex align-center" style="color: #666666;">
					<input v-model="formData.price" maxlength="5" type="digit" placeholder="月租金价格(元/月)" class="text-df" style="width: 250rpx; text-align: right;"></text>
					<text class="cuIcon-right text-gray margin-left-sm"></text>
				</view>
			</view>
		</view>
		<view class="bg-white margin-sm shadow-sm padding-sm other-item" @click="$push('/pages/house/mine/publish-house-info')">
			<text class="text-black text-lg">更多信息</text>
			<view class="text-df text-cut margin-left text-right" style="color: #666666; flex: 1;overflow: hidden;">
				<text>{{moreInfo}}</text>
				<text class="cuIcon-right text-gray margin-left-sm"></text>
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
				currentTab: 0,
				navs: ['合租', '整租'],
				sex: true,
				houseMultiArray: [
					['1室', '2室', '3室', '4室', '5室'],
					['1厅', '2厅', '3厅'],
					['1卫', '2卫', '3卫']
				],
				houseMultiIndex: [1, 0, 0],
				selectHouseType: '2室1厅1卫',
				roomArray: ['隔间', '次卧','主卧'],
				roomIndex: 1,
				roomName: '次卧',
				communityArray: [],
				communityIndex: 0,
				communityName: '',
				moreInfo: '信息越多，越易出租',
				formData: {
					rentingType: 0, // 0 合租 1 整租
					content: '',
					images: [],
					name: '',
					phone: '',
					community: null,
					houseLayout: '2室1厅1卫',
					roomType: '次卧',
					area: '',
					price: '',
					moreInfo: ''
				}
			}
		},
		methods: {
			tabSelect (tabIndex) {
				this.currentTab = tabIndex
				this.formData.rentingType = this.currentTab
			},
			houseChange (e) {
				this.houseMultiIndex = e.detail.value
				this.selectHouseType = 
					this.houseMultiArray[0][this.houseMultiIndex[0]]+
					this.houseMultiArray[1][this.houseMultiIndex[1]]+
					this.houseMultiArray[2][this.houseMultiIndex[2]]
				this.formData.houseLayout = this.selectHouseType
			},
			roomChange (e) {
				this.roomIndex = e.detail.value
				this.roomName = this.roomArray[this.roomIndex]
				this.formData.roomType = this.roomName
			},
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
					this.$toast('请输入合法的单间面积')
					return
				}
				if (!this.formData.price || isNaN(this.formData.price) || parseFloat(this.formData.price) === 0) {
					this.$toast('请输入合法的租金价格')
					return
				}
				if (!this.formData.name || !this.formData.phone) {
					this.$toast('请输入称呼和联系方式')
					return
				}
				let roomType = 1
				if (this.formData.roomType === '次卧') {
					roomType = 1
				} else if (this.formData.roomType === '主卧') {
					roomType = 2
				} else {
					roomType = 0
				}
				this.$ref.selectImage.upload().then((res) => {
					this.formData.images = res
					const param = {
						cid: this.formData.community,
						rentingType: this.formData.rentingType,
						content: this.formData.content,
						images: this.formData.images.join(','),
						houseType: 0,
						houseLayout: this.formData.houseLayout,
						name: this.formData.name,
						phone: this.formData.phone,
						money: this.formData.price,
						area: this.formData.area,
						roomType: roomType,
						houseInfo: JSON.stringify(this.formData.moreInfo)
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
			align-items center
		.line
			margin 0 auto
			background-color #F5F5F5
			height 1px
	.other-item
		border-radius 10rpx
		display flex
		justify-content space-between
		align-items center
</style>
