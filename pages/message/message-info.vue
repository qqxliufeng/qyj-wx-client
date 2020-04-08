<template>
	<view class="padding-sm bg-white" v-if="info">
		<view class="text-black text-lg text-bold text-center">
			{{info.title}}
		</view>
		<view class="text-gray text-sm text-center margin-top-sm">
			发布时间：{{info.create_time}}
		</view>
		<view style="height: 1px; background-color: #F5F5F5; margin: 20rpx 0;"></view>
		<view>
			<rich-text :nodes="info.content"></rich-text>
		</view>
		<view class="text-cut text-black text-bold margin-top">来源：{{info.source}}</view>
	</view>
</template>

<script>
	export default {
		name: 'MessageInfo',
		data() {
			return {
				info: null
			}
		},
		methods: {
			getData () {
				this.$http({
					url: this.$urlPath.messageInfo,
					params: {
						mid: this.$routeParams.mid
					},
					onRequestSuccess: (res) => {
						this.info = res.data
						this.info.content = this.info.content.replace(`<img`, '<img style="width: 100%"')
					},
					onRequestFail: (errorCode, error) => {
						this.$toast(error)
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
</style>
