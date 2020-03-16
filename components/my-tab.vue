<template>
	<scroll-view scroll-x scroll-with-animation class="bg-white nav tab-wrapper">
		<view class="cu-item" :class="index == c ? 'text-yellow cur' : ''" v-for="(item,index) in items" :key="index" @tap="tabSelect(index)" :data-id="index">
			{{item}}
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: 'MyTab',
		props: {
			items: {
				type: Array,
				default: () => {
					return []
				}
			},
			current: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				c: this.current
			}
		},
		watch: {
			current (newVal, oldVal) {
				this.c = newVal
			}
		},
		methods: {
			tabSelect (index) {
				this.c = index
				this.$emit('onTabSelect', index)
			}
		}
	}
</script>

<style lang="stylus" scoped>
.tab-wrapper
	position fixed
	top 0
	left 0
	right 0
	z-index 999
/* #ifdef H5 */
.tab-wrapper
	position fixed
	top 44px
	left 0
	right 0
	z-index 999
/* #endif */
</style>
