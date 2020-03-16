<template>
	<view class="house-more-info-container">
		<view class="bg-white padding-sm margin-sm wrapper shadow-sm">
			<view class="text-black text-bold text-lg">朝向</view>
			<view class="grid col-5 margin-top-sm">
				<view class="margin-tb-sm text-center" v-for="(item,index) in directions" :key="index">
					<button class="cu-btn round df" :class="item.isCheck ? 'bg-yellow' : ''" @click="directionsClick(index)">{{item.title}}</button>
				</view>
			</view>
		</view>
		<view class="bg-white padding-sm margin-sm wrapper shadow-sm">
			<view class="flex justify-between">
				<text class="text-black text-bold text-lg ">配套</text>
				<text class="text-gray text-df">可多选</text>
			</view>
			<view class="grid margin-top-sm">
				<view class="margin-tb-sm text-center" style="margin-left: 3px; margin-right: 3px;" v-for="(item,index) in configs" :key="index">
					<button class="cu-btn round df" :class="item.isCheck ? 'bg-yellow' : ''" @click="checkItem(item)">{{item.title}}</button>
				</view>
			</view>
		</view>
		<view class="bg-white padding-sm margin-sm wrapper shadow-sm">
			<view class="flex justify-between">
				<text class="text-black text-bold text-lg ">特色</text>
				<text class="text-gray text-df">可多选</text>
			</view>
			<view class="grid margin-top-sm">
				<view class="margin-tb-sm text-center" style="margin-left: 3px; margin-right: 3px;" v-for="(item,index) in feature" :key="index">
					<button class="cu-btn round df" :class="item.isCheck ? 'bg-yellow' : ''" @click="checkItem(item)">{{item.title}}</button>
				</view>
			</view>
		</view>
		<view class="bg-white padding-sm margin-sm wrapper shadow-sm">
			<view class="flex justify-between">
				<text class="text-black text-bold text-lg ">对TA的期望</text>
				<text class="text-gray text-df">可多选</text>
			</view>
			<view class="grid margin-top-sm">
				<view class="margin-tb-sm text-center" style="margin-left: 3px; margin-right: 3px;" v-for="(item,index) in expects" :key="index">
					<button class="cu-btn round df" :class="item.isCheck ? 'bg-yellow' : ''" @click="checkItem(item)">{{item.title}}</button>
				</view>
			</view>
		</view>
		<view class="bg-white padding-sm margin-sm wrapper shadow-sm">
			<view class="flex justify-between">
				<text class="text-black text-bold text-lg ">装修</text>
			</view>
			<view class="grid margin-top-sm">
				<view class="margin-tb-sm text-center" style="margin-left: 3px; margin-right: 3px;" v-for="(item,index) in decorations" :key="index">
					<button class="cu-btn round df" :class="item.isCheck ? 'bg-yellow' : ''" @click="decorationsClick(index)">{{item.title}}</button>
				</view>
			</view>
		</view>
		<view class="bg-white padding-sm margin-sm wrapper shadow-sm">
			<view class="flex justify-between">
				<text class="text-black text-bold text-lg ">入住时间</text>
			</view>
			<view class="grid margin-top-sm">
				<view class="margin-tb-sm text-center" style="margin-left: 3px; margin-right: 3px;" v-for="(item,index) in time" :key="index">
					<button class="cu-btn round df" :class="item.isCheck ? 'bg-yellow' : ''" @click="timeClick(index)">{{item.title}}</button>
					<button class="cu-btn round df margin-left-sm">
						<picker mode="date" @change="timeChange">
							<view>{{selectDate}}<text class="cuIcon-right"></text></view>
						</picker>
					</button>
				</view>
			</view>
		</view>
		<view class="padding flex flex-direction margin-top">
			<button class="cu-btn round bg-yellow" @click="confirm">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'PublishHouseInfo',
		data() {
			return {
				selectDate: '具体时间',
				directions: [
					{
						title: '朝东',
						isCheck: false
					},
					{
						title: '朝西',
						isCheck: false
					},
					{
						title: '朝南',
						isCheck: false
					},
					{
						title: '朝北',
						isCheck: false
					}
				],
				configs: [
					{
						title: '热水器',
						isCheck: false
					},
					{
						title: '冰箱',
						isCheck: false
					},
					{
						title: '空调',
						isCheck: false
					},
					{
						title: '暖气',
						isCheck: false
					},
					{
						title: '洗衣机',
						isCheck: false
					},
					{
						title: '电视机',
						isCheck: false
					},
					{
						title: '燃气灶',
						isCheck: false
					},
					{
						title: 'WIFI',
						isCheck: false
					},
					{
						title: '独立卫生间',
						isCheck: false
					},
					{
						title: '大阳台',
						isCheck: false
					},
					{
						title: '微波炉',
						isCheck: false
					},
					{
						title: '衣柜',
						isCheck: false
					}
				],
				feature: [
					{
						title: '地铁房',
						isCheck: false
					},
					{
						title: '电梯房',
						isCheck: false
					},
					{
						title: '可短租',
						isCheck: false
					}
				],
				expects: [
					{
						title: '一个人住',
						isCheck: false
					},
					{
						title: '不吸烟',
						isCheck: false
					},
					{
						title: '不能养宠物',
						isCheck: false
					},
					{
						title: '爱干净',
						isCheck: false
					},
					{
						title: '比较安静',
						isCheck: false
					},
					{
						title: '作息规律',
						isCheck: false
					},
					{
						title: '工作稳定',
						isCheck: false
					},
					{
						title: '仅限女生',
						isCheck: false
					},
					{
						title: '仅限男生',
						isCheck: false
					}
				],
				decorations: [
					{
						title: '毛坯',
						isCheck: false
					},
					{
						title: '简单装修',
						isCheck: false
					},
					{
						title: '精装修',
						isCheck: false
					},
					{
						title: '豪华装修',
						isCheck: false
					}
				],
				time: [
					{
						title: '随时入住',
						isCheck: false
					}
				]
			}
		},
		methods: {
			directionsClick (index) {
				this.directions.forEach((it, i) => {
					it.isCheck = index === i
				})
			},
			decorationsClick (index) {
				this.decorations.forEach((it, i) => {
					it.isCheck = index === i
				})
			},
			timeClick (index) {
				this.time[index].isCheck = true
				this.selectDate = '具体时间'
			},
			timeChange (e) {
				this.time[0].isCheck = false
				const selectDate = new Date(e.detail.value)
				if (selectDate < new Date()) {
					this.$toast('所选日期有点小哦')
					return
				}
				this.selectDate = e.detail.value
			},
			checkItem (item) {
				item.isCheck = !item.isCheck
			},
			confirm () {
				const selectDirection = this.directions.filter(it => {
					return it.isCheck
				})
				const selectConfigs = this.configs.filter(it => {
					return it.isCheck
				})
				const selectFeature = this.feature.filter(it => {
					return it.isCheck
				})
				const selectException = this.expects.filter(it => {
					return it.isCheck
				})
				const selectDecoration = this.decorations.filter(it => {
					return it.isCheck
				})
				let enterTime = null
				if (this.time[0].isCheck) {
					enterTime = '随时入住'
				} else if (this.selectDate !== '具体时间'){
					enterTime = this.selectDate
				}
				const selected = {
					'direction': selectDirection.map(it => it.title),
					'configs': selectConfigs.map(it => it.title),
					'feature': selectFeature.map(it => it.title),
					'exception': selectException.map(it => it.title),
					'decoration': selectDecoration.map(it => it.title),
					'time': enterTime ? [enterTime] : []
				}
				uni.$emit('selectedHouseInfo', selected)
				this.$back()
			}
		}
	}
</script>

<style lang="stylus" scoped>
.house-more-info-container
	.wrapper
		border-radius 10rpx
</style>
