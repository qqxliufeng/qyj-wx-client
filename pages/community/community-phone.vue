<template>
	<view>
		<block v-if="list.length > 0">
			<view v-for="item of list" :key="item.id" class="padding-sm margin-sm bg-white shadow-sm" @click="makePhone(item)">
				<view class="info-wrapper">
					<text class="text-black text-bold text-lg ">{{item.title}}</text>
					<text class="text-black">联系人：{{item.concat}}</text>
				</view>
				<view class="margin-top-sm info-wrapper text-black">
					<text>联系方式：{{item.phone}}</text>
					<text class="cuIcon-phone phone text-green"></text>
				</view>
			</view>
		</block>
		<block v-else>
			<empty-data emptyTip="暂无服务电话"></empty-data>
		</block>
		<view class="add-wrapper margin-top" @click="$push('/pages/community/add-new-phone?cid=' + defaultCommunity.id)">
			<text class="cuIcon-add text-lg text-blue"></text>
			<text class="text-blue text-lg margin-left-sm">我要添加</text>
		</view>
	</view>
</template>

<script>
	import List from '../../mixins/List.js'
	import EmptyData from '../../components/empty-data.vue'
	export default {
		name: 'CommunityPhone',
		mixins: [List],
		components: {
			EmptyData
		},
		methods: {
			makePhone (item) {
				uni.makePhoneCall({
					phoneNumber: item.phone
				})
			},
			getData () {
				this.$http({
					url: this.$urlPath.getCommunityPhones,
					params: {
						cid: this.$routeParams.id
					},
					onRequestSuccess: (res) => {
						this.loadSuccess(res.data)
					},
					onRequestFail: (errorCode, error) => {
						this.loadFail()
					}
				})
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.$routeParams.name + '-服务电话'
			})
			this.getData()
		}
	}
</script>

<style lang="stylus" scoped>
.info-wrapper
	display flex
	justify-content space-between
	.phone
		font-size 40rpx
		width 60rpx
		height 60rpx
		border-radius 50%
		background-color #F5F5F5
		display flex
		justify-content center
		align-items center
.add-wrapper
	text-align center
</style>
