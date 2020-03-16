<template>
	<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="scrolltolower">
		<view class="container bg-white">
			<block v-if="list && list.length !== 0">
				<activity-item v-for="item of list" :key="item.id" @btnClick="join"></activity-item>
			</block>
			<load-more :status="loadingType"></load-more>
		</view>
	</scroll-view>
</template>

<script>
	import List from '../../../mixins/List.js'
	import ActivityItem from './activity-item.vue'
	export default {
		name: 'MyJoinActivity',
		mixins: [List],
		components: {
			ActivityItem
		},
		data() {
			return {
				list: [
					{
						id: 1
					},
					{
						id: 2
					}
				]
			}
		},
		methods: {
			join () {
				this.$push('/pages/activity/activity-info')
			}
		}
	}
</script>

<style lang="stylus" scoped>
</style>
