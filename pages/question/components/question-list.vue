<template>
	<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="scrolltolower">
		<view class="container bg-white">
			<view v-if="list && list.length !== 0">
				<block v-for="item of list" :key="item.id">
					<list-item-three v-if="item.type === 2" :item="item" @itemClick="itemClick"></list-item-three>
					<list-item-two v-else-if="item.type === 1" :item="item" @itemClick="itemClick"></list-item-two>
					<list-item-one v-else :item="item" @itemClick="itemClick"></list-item-one>
					<!-- <view v-if="item.type === 2" class="item-wrapper" @click="itemClick(item)">
						<view class="text-lg text-black title">
							{{item.title}}
						</view>
						<view class="image-wrapper">
							<image v-for="(path, index) of item.images" :key="index" mode="aspectFill" class="image" :src="path | imagePath"></image>
						</view>
						<foot :info="item"></foot>
					</view>
					<view v-else-if="item.type === 1" class="item-wrapper" @click="itemClick(item)">
						<view class="item-wrapper1">
							<view class="text-lg text-black title title1" style="overflow: hidden; flex: 1;">
								{{item.title}}
							</view>
							<view class="image-wrapper1">
								<image mode="aspectFill" class="image1" :src="item.images[0] | imagePath"></image>
							</view>
						</view>
						<foot :info="item"></foot>
					</view>
					<view v-else class="item-wrapper" @click="itemClick(item)">
						<view class="text-lg text-black title">
							{{item.title}}
						</view>
						<foot :info="item"></foot>
					</view> -->
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
		name: 'QuestionList',
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
								item.commentInfo = Number(item.comment_num) === 0 ? '暂无回答' : item.comment_num + '回答'
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
				this.$push('/pages/question/question-info?qid=' + item.id)
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
	.item-wrapper
		border-bottom 1px solid #f5f5f5
		padding 20rpx 0
		.title
			margin-bottom 20rpx
		.image-wrapper
			display flex
			margin-bottom 20rpx
			.image
				margin 0 5rpx
				height 160rpx
				width calc(calc(100% - 20rpx) / 3)
				border-radius 10rpx
				background-color #F5F5F5
		.item-wrapper1
			display flex
			flex-direction row
			.title1
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 4;
				-webkit-box-orient: vertical;
			.image-wrapper1
				height 160rpx
				width calc(calc(100% - 40rpx) / 3)
				margin-left 10rpx
				.image1
					width 100%
					height 100%
					border-radius 10rpx
					background-color #F5F5F5
</style>
