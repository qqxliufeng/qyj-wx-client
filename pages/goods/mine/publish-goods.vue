<template>
	<view class="publish-goods-container">
		<view class="bg-white margin-sm info-wrapper shadow-sm padding-sm">
			<textarea placeholder="品牌型号/新旧程度/入手渠道/转手原因/等" v-model="formData.content"></textarea>
			<select-image :maxImagesCount="6" ref="selectImage"></select-image>
		</view>
		<view class="bg-white margin-sm shadow-sm padding-left-sm padding-right-sm item-wrapper">
			<view class="item padding-bottom-sm padding-top-sm">
				<text class="text-black text-lg">发货地</text>
				<picker class="text-df" style="color: #666666;" :range="communityArray" :value="communityIndex" @change="communityChange">
					<text>{{communityName}}</text>
					<text class="cuIcon-right text-gray margin-left-sm"></text>
				</picker>
			</view>
			<view class="line"></view>
			<view class="item padding-bottom-sm padding-top-sm">
				<text class="text-black text-lg">类别</text>
				<view class="text-df flex align-center" style="color: #666666;" @click="showCategoryDialog">
					<text class="text-df" style="width: 250rpx; text-align: right;">
						{{formData.selectedCategory ? formData.selectedCategory.name : '请选择商品类别'}}
					</text>
					<text class="cuIcon-right text-gray margin-left-sm"></text>
				</view>
			</view>
		</view>
		<view class="bg-white margin-sm shadow-sm padding-sm">
			<view class="text-black text-lg">
				<text class="cuIcon-titles text-red"></text>价格信息
				<text class="text-gray text-sm">（合理的价格会让宝贝容更易卖出）</text>
			</view>
			<view class="flex padding-top-sm align-center">
				<text class="text-df text-black margin-right-sm">出手价：</text>
				<input class="flex-sub text-xl" placeholder="¥0.00" type="digit" maxlength="6" v-model="formData.price"/>
			</view>
			<view style="height: 1px; background-color: #F5F5F5;" class="margin-top-sm"></view>
			<view class="flex padding-top-sm align-center">
				<text class="text-df text-black margin-right-sm">入手价：</text>
				<input class="flex-sub text-xl" placeholder="¥0.00" type="digit" maxlength="6" v-model="formData.originPrice"/>
			</view>
			<view style="height: 1px; background-color: #F5F5F5;" class="margin-top-sm"></view>
			<view class="flex padding-top-sm align-center">
				<text class="text-df text-black margin-right-sm">邮&nbsp;&nbsp;&nbsp;&nbsp;费：</text>
				<view class="text-center" v-for="(item, index) of packType" :key="index">
					<button class="cu-btn round sm margin-right-sm" :class="item.isCheck ? 'bg-yellow' : ''" @click="checkItem(0, item)">{{item.title}}</button>
				</view>
			</view>
		</view>
		<view class="bg-white margin-sm shadow-sm padding-sm">
			<view class="text-black text-lg">
				<text class="cuIcon-titles text-red"></text>常用选项
				<text class="text-gray text-sm">（可多选）</text>
			</view>
			<view class="flex padding-top-sm align-center">
				<view class="text-center" v-for="(item, index) of configs" :key="index">
					<button class="cu-btn round sm margin-right-sm" :class="item.isCheck ? 'bg-yellow' : ''" @click="checkItem(1, item)">{{item.title}}</button>
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
		<view class="padding flex flex-direction margin-top">
			<button class="cu-btn round bg-yellow" @click="publish">发布</button>
		</view>
		<view class="cu-modal drawer-modal justify-end" :class="isShowCategoryDialog ? 'show':''" @tap="hideModal">
			<view class="cu-dialog basis-lg category-item-wrapper">
				<view class="cu-list menu text-left">
					<view class="cu-item arrow" v-for="item of categories" :key="item.id" @click="onCategoryItemClick(item)">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import SelectImage from '../../common/select-images.vue'
	export default {
		name: 'PublishGoods',
		components: {
			SelectImage
		},
		data() {
			return {
				communityArray: [],
				communityName: '',
				moreInfo: '信息越多，越易展示',
				packType: [
					{
						title: '包邮',
						isCheck: true,
						id: 0
					},
					{
						title: '买家付',
						isCheck: false,
						id: 1
					}
				],
				configs: [
					{
						title: '全新',
						isCheck: false
					},
					{
						title: '不讲价',
						isCheck: false
					},
					{
						title: '仅自提',
						isCheck: false
					},
					{
						title: '可借',
						isCheck: false
					}
				],
				formData: {
					content: '',
					images: [],
					name: '',
					phone: '',
					community: null,
					price: '',
					originPrice: '',
					packType: null,
					selectedCategory: null,
					category: null,
					tags: null
				},
				categories: null,
				isShowCategoryDialog: false
			}
		},
		methods: {
			loadCategory () {
				this.$http({
					url: this.$urlPath.getGoodsTypeList,
					onRequestSuccess: (res) => {
						this.categories = res.data
					}
				})
			},
			showCategoryDialog () {
				this.isShowCategoryDialog = true
			},
			hideModal () {
				this.isShowCategoryDialog = false
			},
			communityChange (e) {
				this.communityIndex = e.detail.value
				this.communityName = this.communityArray[this.communityIndex]
				this.formData.community = this.$userInfo.getCommunities()[this.communityIndex].id
			},
			onCategoryItemClick (item) {
				this.formData.selectedCategory = item
			},
			checkItem (type, item) {
				if (type === 0) {
					this.packType.forEach(it => {
						it.isCheck = it === item
 					})
				} else {
					item.isCheck = !item.isCheck
				}
			},
			publish () {
				if (!this.formData.content) {
					this.$toast('请输入商品信息')
					return
				}
				if (!this.formData.selectedCategory) {
					this.$toast('请选择商品类别')
					return
				}
				if (!this.formData.price) {
					this.$toast('请输入商品出手价格')
					return
				}
				if (!this.formData.originPrice) {
					this.$toast('请输入商品出手价格')
					return
				}
				if (!this.formData.name) {
					this.$toast('请输入联系人信息')
					return
				}
				if (!this.formData.phone) {
					this.$toast('请输入联系人联系方式')
					return
				}
				this.formData.packType = this.packType.filter(it => it.isCheck)[0].id
				this.formData.tags = this.configs.filter(it => it.isCheck).map(it => it.title).join(',')
				this.formData.category = this.formData.selectedCategory.id
				this.$refs.selectImage.upload().then((res) => {
					this.formData.images = res.join(',')
					this.$http({
						url: this.$urlPath.addGoods,
						params: {
							data: JSON.stringify(this.formData)
						},
						onRequestSuccess: (res) => {
							this.$toast('发布成功')
							umi.$emit(this.$events.REFRESH_GOODS)
							this.$back()
						},
						onRequestFail: (errorCode, error) => {
							this.$toast(error)
						}
					})
				})
			}
		},
		onLoad() {
			this.loadCategory()
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
		}
	}
</script>

<style lang="stylus" scoped>
.publish-goods-container
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
	.category-item-wrapper
		overflow-y scroll
</style>
