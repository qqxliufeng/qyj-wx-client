<template>
	<view>
		<view class="image-wrapper">
			<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg" mode="aspectFill"></image>
		</view>
		<view class="bg-white padding-sm">
			<view class="text-black text-bold text-lg">
				收废品的活动开始了
			</view>
			<view class="flex justify-between align-center margin-top-sm">
				<view>
					<text class="title">已报名：</text>
					<text class="text-red text-bold">30</text>
				</view>
				<view class="cu-avatar-group">
					<view class="cu-avatar round sm" v-for="(item,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]"></view>
				</view>
			</view>
		</view>
		<view class="bg-white padding-sm">
			<view class="cu-progress round sm striped active progress-wrapper">
				<view class="bg-green" style="width: 60%"></view>
				<text class="release-count">仅剩10人</text>
			</view>
		</view>
		<view class="bg-white padding-left-sm padding-right-sm margin-top-sm">
			<view class="cu-bar bg-white">
				<view class="action border-title" style="margin-left: 0;">
					<text class="text-lg text-bold text-red">活动信息</text>
					<text class="bg-gradual-red" style="width:3rem"></text>
				</view>
			</view>
			<view class="solid-bottom padding-bottom-sm padding-top-sm">
				<text class="text-yellow text-df">活动时间：</text>
				<text class="text-black">2019-11-11上午至2019-22-11下午</text>
			</view>
			<view class="solid-bottom padding-bottom-sm padding-top-sm">
				<text class="text-yellow text-df">活动地点：</text>
				<text class="text-black">1号楼前面</text>
			</view>
			<view class="solid-bottom padding-bottom-sm padding-top-sm">
				<text class="text-yellow text-df">活动人数：</text>
				<text class="text-black">5~10人</text>
			</view>
			<view class="solid-bottom padding-bottom-sm padding-top-sm">
				<text class="text-yellow text-df">发&nbsp;&nbsp;起&nbsp;&nbsp;人：</text>
				<text class="text-black">1234556</text>
			</view>
		</view>
		<view class="bg-white padding-left-sm padding-right-sm margin-top-sm">
			<view class="cu-bar bg-white">
				<view class="action border-title" style="margin-left: 0;">
					<text class="text-lg text-bold text-red">活动详情</text>
					<text class="bg-gradual-red" style="width:3rem"></text>
				</view>
			</view>
			<view class="title padding-bottom-sm text-lg">
				请带上好的信息来到1号楼前面注意
			</view>
		</view>
		<view class="cu-bar">
		</view>
		<view class="cu-bar foot bg-white tabbar border shop">
			<button class="action" open-type="contact">
				<view class="cuIcon-service text-green">
				</view>
				客服
			</button>
			<view class="flex-sub text-right padding-right-sm">
				12345678
			</view>
			<view class="margin-right-sm">
				<button class="cu-btn bg-red round shadow-blur">立即报名</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ActivityInfo',
		data() {
			return {
				avatar: [
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg'
				]
			}
		}
	}
</script>

<style lang="stylus" scoped>
.image-wrapper
	height 400rpx
	width 100%
	background-color #F5F5F5
	& > image
		width 100%
		height 100%
.progress-wrapper
	position relative
	.release-count
		position absolute
		right 0
		top 0
		bottom 0
		color #F43F3B
</style>
