<template>
	<view>
		<view class="base-info bg-white margin-sm padding-sm">
			<view class="text-black text-bold text-lg">
				超意兴（印象济南店）
			</view>
			<view class="flex margin-tb-sm">
				<view class="image-wrapper">
					<image mode="aspectFill" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"></image>
				</view>
				<view class="flex-sub margin-left-sm">
					<view class="cu-tag line-yellow sm round">好吃</view>
					<view class="cu-tag line-yellow sm round">好吃</view>
					<view class="cu-tag line-yellow sm round">好吃</view>
					<view class="cu-tag line-yellow sm round">好吃</view>
					<view class="cu-tag line-yellow sm round">好吃</view>
				</view>
			</view>
			<view class="text-sm text-black flex align-center">
				<text>槐荫区印象济南店 距您1.5km</text>
			</view>
			<view class="text-black text-sm">
				营业时间 10:00 - 20:00
			</view>
		</view>
		<view class="text-red text-df text-bold padding-left">
			<text class="title">标语</text>
		</view>
		<view class="margin-sm padding-sm text-sm text-black bg-white base-info">
			“好吃不吓“
		</view>
		<block>
			<view class="text-red text-df text-bold padding-left">
				<text class="title">服务信息</text>
			</view>
			<view class="margin-sm padding-sm text-sm text-black bg-white base-info">
				好吃不贵好吃不贵好吃不贵好吃不贵好吃不贵好吃不贵好吃不贵好吃不贵好吃不贵好吃不贵好吃不贵好吃不贵好吃不贵好吃不贵好吃不贵好吃不贵好吃不贵好吃不贵好吃不贵
			</view>
		</block>
		<block>
			<view class="text-red text-df text-bold padding-left">
				<text class="title">详情</text>
			</view>
			<view class="image-info-wrapper bg-white padding-sm">
				<image mode="aspectFill" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"></image>
				<image mode="aspectFill" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"></image>
				<image mode="aspectFill" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg"></image>
			</view>
		</block>
		<view style="height: 50px;"></view>
		<view class="cu-bar bg-white tabbar border shop foot">
			<view class="flex-sub"></view>
			<button class="cu-btn bg-orange round shadow-blur margin-right">联系商家</button>
			<button class="cu-btn bg-red round shadow-blur margin-right">到这里去</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ShopInfo'
	}
</script>

<style lang="stylus" scoped>
.base-info
	border-radius 10rpx
.image-wrapper
	width 150rpx
	height 150rpx
	background-color #F5F5F5
	& > image
		width 100%
		height 100%
		border-radius 5rpx
.title
	border-bottom #e54d42 solid 2px
	padding-bottom 2px
.image-info-wrapper
	width 100%
	& > image
		width 100%
		border-radius 5rpx
</style>
