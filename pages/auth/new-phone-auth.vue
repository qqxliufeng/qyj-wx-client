<template>
	<view>
		<block v-if="list.length > 0">
			<view v-for="item of list" :key="item.id" class="padding-sm margin-sm bg-white shadow-sm">
				<view class="flex justify-between align-center">
					<text class="text-black text-bold text-lg ">{{item.title}}</text>
					<text class="text-black">联系人：{{item.concat}}</text>
				</view>
				<view class="flex justify-between align-center margin-top-sm info-wrapper text-black">
					<text>联系方式：{{item.phone}}</text>
					<text class="phone" :class="item.color">{{getStatusTip(item)}}</text>
				</view>
				<view class="flex justify-between align-center margin-top-sm">
					<text>{{item.create_time * 1000 | dateFormat}}</text>
					<view class="flex-sub"></view>
					<button class="cu-btn sm bg-gradual-blue margin-right" @click="editPhoneInfo(item)">编辑</button>
					<button class="cu-btn sm bg-gradual-orange" @click="deletePhoneInfo(item)">删除</button>
				</view>
			</view>
		</block>
		<block v-else>
			<empty-data emptyTip="暂无需认证的电话"></empty-data>
		</block>
	</view>
</template>

<script>
	import List from '../../mixins/List.js'
	import EmptyData from '../../components/empty-data.vue'
	export default {
		name: 'NewPhoneAuth',
		mixins: [List],
		components: {
			EmptyData
		},
		methods: {
			getData () {
				this.$http({
					url: this.$urlPath.getMyPhoneInfo,
					onRequestSuccess: (res) => {
						res.data.forEach(it => {
							switch(it.status) {
								case 0:
									it.color = 'text-yellow'
									break
								case 1:
									it.color = 'text-green'
									break
								case 2:
									it.color = 'text-red'
									break
								case 3:
									it.color = 'text-red'
									break
							}
						})
						this.loadSuccess(res.data)
					}
				})
			},
			editPhoneInfo (item) {
				if (item.status === 1 || item.status === 3) {
					this.$push('/pages/community/edit-phone?pid=' + item.id + '&cid=' + item.community_id)
				} else {
					this.$toast('当前信息状态不可以编辑信息')
				}
			},
			deletePhoneInfo (item) {
				uni.showModal({
					content: '是否要删除此信息？',
					confirmText: '删除',
					success: (res) => {
						if (res.confirm) {
							this.$http({
								url: this.$urlPath.deletePhoneInfo,
								params: {
									pid: item.id
								},
								onRequestSuccess: (res) => {
									this.$toast('删除成功')
									this.getData()
								}
							})
						}
					}
				})
			},
			getStatusTip (item) {
				switch (item.status) {
					case 0:
						return '审核中'
					case 1:
						return '审核成功'
					case 2:
						return '禁用中'
					case 3:
						return '审核失败'
				}
			}
		},
		onLoad() {
			this.getData()
		}
	}
</script>

<style lang="stylus" scoped>
</style>
