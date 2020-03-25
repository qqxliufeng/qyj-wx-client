<template>
	<view>
		<view class="bg-yellow text-sm text-white" style="padding: 5px;">
			<view>1. 本信息只用作身份认证，平台会严格保护用户隐私</view>
			<view>2. 请认真填写房间信息，后期不可更改，以免影响正常功能使用</view>
		</view>
		<view class="bg-white text-gray text-sm padding-sm margin-top-sm">
			小区名称
		</view>
		<view class="bg-white text-black text-lg padding-sm shadow-sm">
			{{currentCommunity.name}}
		</view>
		<view class="bg-white text-gray text-sm padding-sm margin-top-sm">
			选择房间信息
		</view>
		<view class="bg-white text-black text-df padding-sm shadow-sm flex">
			<view class="flex-sub text-center">
				请选择楼号
				<text class="cuIcon-triangledownfill"></text>
			</view>
			<view class="line"></view>
			<view class="flex-sub text-center">
				请选择单元
				<text class="cuIcon-triangledownfill"></text>
			</view>
			<view class="line"></view>
			<view class="flex-sub text-center">
				请选择房号
				<text class="cuIcon-triangledownfill"></text>
			</view>
		</view>
		<view class="bg-white text-black text-lg padding-sm margin-top-sm shadow-sm">
			上传证明材料
		</view>
		<view class="margin-sm">
			<view class="image-wrapper flex flex-direction align-center" @tap="ChooseImage">
				<view class="bg-white shadow-sm round add-icon">
					<text class='cuIcon-add text-red'></text>
				</view>
				<view class="margin-top text-gray">房产证或购房合同</view>
			</view>
		</view>
		<view class="bg-gradual-orange padding-sm upload">上传</view>
	</view>
</template>

<script>
	export default {
		name: 'HouseAuth',
		data () {
			return {
				currentCommunity: this.$userInfo.getPrimaryCommunity()
			}
		}
	}
</script>

<style lang="stylus" scoped>
.line
	width 1px
	background-color #F5F5F5
.image-wrapper
	background-color #F5F5F5
	height 350rpx
	width 100%
	.add-icon
		width 80rpx
		height 80rpx
		display flex
		justify-content center
		align-items center
		margin 0 auto
		margin-top 20rpx
		& > text
			font-size 45rpx
.upload
	position fixed
	left 0
	right 0
	bottom 0
	text-align center
</style>
