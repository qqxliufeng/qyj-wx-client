<template>
	<view class="padding-sm bg-white">
		<view class="text-black text-lg text-bold text-center">
			重大的消息
		</view>
		<view class="text-gray text-sm text-center margin-top-sm">
			发布时间：2020-1-1
		</view>
		<view style="height: 1px; background-color: #F5F5F5; margin: 20rpx 0;"></view>
		<view>
			<rich-text :nodes="nodes"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'MessageInfo',
		data() {
			return {
				nodes: '<div><div>请不要说好不好孤</div><img src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png"/></div>'
			}
		}
	}
</script>

<style lang="stylus" scoped>
</style>
