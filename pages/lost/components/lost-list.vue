<template>
	<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="scrolltolower">
		<view class="container bg-white">
			<view v-if="list && list.length !== 0">
				<block v-for="item of list" :key="item.id">
					<list-item-three v-if="item.type === 2" :item="item" @itemClick="itemClick"></list-item-three>
					<list-item-two v-else-if="item.type === 1" :item="item" @itemClick="itemClick"></list-item-two>
					<list-item-one v-else :item="item" @itemClick="itemClick"></list-item-one>
				</block>
			</view>
			<load-more :status="loadingType"></load-more>
		</view>
	</scroll-view>
</template>

<script>
	import EmptyData from '../../../components/empty-data.vue'
	import ListItemOne from '../../../components/list-item-one.vue'
	import ListItemTwo from '../../../components/list-item-two.vue'
	import ListItemThree from '../../../components/list-item-three.vue'
	import list from '../../../mixins/List.js'
	export default {
		name: 'LostList',
		props: {
			show: {
				type: Boolean,
				default: false
			},
			url: {
				type: String,
				default: ''
			}
		},
		mixins: [list],
		components: {
			EmptyData,
			ListItemOne,
			ListItemTwo,
			ListItemThree
		},
		methods: {
			getData () {
				this.$http({
					url: this.url,
					loadingTip: null,
					params: {
						page: this.page.num
					},
					onRequestSuccess: (res) => {
						if (res.data) {
							res.data.forEach((item) => {
								item.commentInfo = Number(item.helps_num) === 0 ? '暂无回复' : item.helps_num + '爱心'
								if (item.images && typeof item.images === 'string') {
									item.images = item.images.split(',')
								}
								if (!item.images || item.images.length === 0) {
									item.type = 0
								} else if (item.images.length < 3) {
									item.type = 1
								} else {
									item.type = 2
								}
							})
						}
						this.loadSuccess(res.data)
					},
					onRequestFail: (errorCode, error) => {
						this.loadFail()
					}
				})
			},
			itemClick (item) {
				this.$push('/pages/lost/lost-info?lid=' + item.id)
			},
			scrolltolower () {
				this.onReachBottom()
			}
		},
		watch: {
			show (newVal, oldVal) {
				if (newVal) {
					if (this.list.length === 0) {
						this.getData()
					}
				}
			}
		},
		mounted() {
			if (this.show) {
				this.getData()
			}
		}
	}
</script>

<style lang="stylus" scoped>
.container
	padding 0 20rpx
</style>
