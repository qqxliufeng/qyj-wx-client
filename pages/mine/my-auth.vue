<template>
	<view>
		<view class="bg-white margin-sm shadow-sm item padding text-black flex justify-between align-center" @click="phoneAuth">
			<view>
				<text class="cuIcon-phone margin-right-sm text-yellow"></text>
				通讯录电话认证
			</view>
			<view class="cuIcon-right"></view>
		</view>
		<view class="bg-white margin-sm shadow-sm item padding text-black flex justify-between align-center" @click="houseAuth">
			<view>
				<text class="cuIcon-home margin-right-sm text-yellow"></text>
				房产认证
			</view>
			<view class="cuIcon-right"></view>
		</view>
		<view class="bg-white margin-sm shadow-sm item padding text-black flex justify-between align-center" @click="personAuth">
			<view>
				<text class="cuIcon-people margin-right-sm text-yellow"></text>
				个人认证
			</view>
			<view class="cuIcon-right"></view>
		</view>
		<view class="bg-white margin-sm shadow-sm item padding text-black flex justify-between align-center" @click="shopAuth">
			<view>
				<text class="cuIcon-shop margin-right-sm text-yellow"></text>
				商家认证
			</view>
			<view class="cuIcon-right"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'MyAuth',
		methods: {
			phoneAuth () {
				this.$push('/pages/auth/new-phone-auth')
			},
			houseAuth () {
				this.$push('/pages/auth/house-auth')
			},
			personAuth () {
				
			},
			shopAuth () {
				
			}
		}
	}
</script>

<style lang="stylus" scoped>
.item
	border-radius 10rpx
	& text
		font-size 35rpx
		vertical-align bottom
</style>
