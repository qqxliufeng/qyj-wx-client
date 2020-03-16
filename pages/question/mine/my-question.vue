<template>
	<view class="question-container">
		<my-tab :items='items' :current="current" @onTabSelect="onTabSelect"></my-tab>
		<view style="background-color: #f5f5f5; height: 10rpx;"></view>
		<my-fab title="提问" @click.native="quiz"></my-fab>
		<swiper class="content-wrapper" :current="current" @animationfinish="animationfinish">
			<swiper-item>
				<question-list ref="questionList" :show="current === 0" :url="myquestinListUrl"></question-list>
			</swiper-item>
			<swiper-item>
				<question-list :show="current === 1" :url="myAnswerListUrl"></question-list>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import MyFab from '../../../components/my-fab.vue'
	import MyTab from '../../../components/my-tab.vue'
	import QuestionList from '../components/question-list.vue'
	export default {
		name: 'MyQuestion',
		components: {
			MyFab,
			MyTab,
			QuestionList
		},
		data () {
			return {
				current: 0,
				myAnswerListUrl: this.$urlPath.getMyAnswerList,
				myquestinListUrl: this.$urlPath.getQuestionListByUid,
				items: ['我的提问','我的回答']
			}
		},
		methods: {
			onTabSelect (index) {
				this.current = index
			},
			quiz () {
				this.$push('/pages/question/quiz')
			},
			animationfinish (e) {
				if (e.detail.current === this.current) {
					return
				}
				this.current = e.detail.current
			}
		},
		onLoad() {
			uni.$on('refreshQuestion', () => {
				this.$refs.questionList.onRefresh()
			})
		},
		onUnload() {
			uni.$off('refreshQuestion')
		}
	}
</script>

<style lang="stylus" scoped>
// .slide-right-enter-active,
// .slide-right-leave-active,
// .slide-left-enter-active,
// .slide-left-leave-active {
// 	will-change: transform;
// 	transition: all 500ms;
// 	position: absolute; //这里的定位使用relative可以解决切换时页面残影
// }
// .slide-right-enter {
// 	opacity: 0.8;
// 	transform: translate3d(-100%, 0, 0);
// }
// .slide-right-leave-to {
// 	opacity: 0.8;
// 	transform: translate3d(100%, 0, 0);
// }
// .slide-left-enter {
// 	opacity: 0;
// 	transform: translate3d(100%, 0, 0);
// }
// .slide-left-leave-to {
// 	opacity: 0;
// 	transform: translate3d(-100%, 0, 0);
// }
.question-container
	.content-wrapper
		margin-top 90rpx
		height calc(100vh - 90rpx)
</style>
