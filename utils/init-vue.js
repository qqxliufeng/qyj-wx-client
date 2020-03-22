import Vue from 'vue'
import * as urlPath from './url-path.js'
import userInfo from '../data/user-info.js'
import filters from '../filter/filter.js'
import routeParams from '../mixins/RouteParams.js'
import utils from './utils.js'
import { formateObjToParamStr as paramsToStr } from './router.js'
Vue.prototype.$urlPath = urlPath
Vue.prototype.$userInfo = userInfo
Vue.prototype.$utils = utils
Vue.prototype.$paramsToString = paramsToStr
Vue.prototype.$events = {
	REFRESH_HOUSE: 'refreshHouse',
	REFRESH_LOST: 'refreshLost',
	REFRESH_QUESTION: 'refreshQuestion',
	REFRESH_GOODS: 'refreshGoods',
	REFRESH_BIND_COMMUNITY: 'refreshBindCommunity'
}

Vue.mixin(routeParams)

for (let filter in filters) {
	Vue.filter(filter, filters[filter])
}

Vue.prototype.$http = function (options) {
	if (options.loadingTip !== null) {
		uni.showLoading({
			title: options.loadingTip || '正在加载…'
		})
	}
	if (!options.params) options.params = {}
	if (userInfo.isLogin()) {
		options.params.token = userInfo.getToken()
	}
	uni.request({
		header:{
			'content-type': 'application/x-www-form-urlencoded'
		},
		url: urlPath.baseUrl + options.url,
		data: options.params,
		method: 'POST',
		success: (res) => {
			if (res && res.statusCode === 200) {
				if (res.data.code === 1) {
					options.onRequestSuccess(res.data)
				} else {
					options.onRequestFail(0, res.data.msg)
				}
			} else {
				options.onRequestFail(500, '请求失败')
			}
		},
		fail: () => {
			options.onRequestFail()
		},
		complete: () => {
			if (options.onRequestComplete) {
				options.onRequestComplete()
			}
			if (options.loadingTip !== null) {
				uni.hideLoading()
			}
		}
	})
}

Vue.prototype.$upload = function (options) {
	uni.showLoading({
		title: '正在上传…'
	})
	options.files.forEach((file, index) => {
		uni.uploadFile({
			url: urlPath.imageActionUrl + '?token=' + userInfo.getToken(),
			filePath: file,
			name: 'file',
			formData: {},
			success: (res) => {
				let data = JSON.parse(res.data)
				if (options.uploadSuccess) {
					options.uploadSuccess(data.data.url)
				}
			},
			fail: (error) => {
				uni.showToast({
					icon: "none",
					title: '上传失败'
				})
				console.log(error)
			},
			complete: () => {
				uni.hideLoading()
			}
		})
	})
}

Vue.prototype.$toast = function (msg) {
	if (msg) {
		this.$nextTick(() => {
			uni.showToast({
				icon: "none",
				title:msg,
				duration: 2000
			})
		})
	}
}

Vue.prototype.$push = function(url) {
	if (url) {
		uni.navigateTo({
			url: url
		})
	} else {
		uni.reLaunch({
			url: '/pages/index/index.vue'
		})
	}
}

Vue.prototype.$replace = function (url) {
	if (url) {
		if (router.auth(url)) {
			auth()
		} else {
			uni.redirectTo({
				url: url
			})
		}
	} else {
		uni.reLaunch({
			url: '/pages/index/index.vue'
		})
	}
}

Vue.prototype.$back = function (delta) {
	if (delta) {
		uni.navigateBack({
			delta:delta
		})
	} else {
		uni.navigateBack()
	}
} 