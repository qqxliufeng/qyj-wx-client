<template>
	<view class="empty-data-container text-gray text-sm">
		{{emptyTip}}
	</view>
</template>

<script>
	export default {
		name: 'EmptyData',
		props: {
			emptyTip: {
				type: String,
				default: '暂无数据'
			} 
		}
	}
</script>

<style lang="stylus" scoped>
.empty-data-container
	height 100vh
	display flex
	justify-content center
	align-items center
</style>
