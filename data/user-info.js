let userInfo = uni.getStorageSync('userInfo')
if (!userInfo) {
	userInfo = {
		id: null,
		nickname: null,
		email: null,
		mobile: null,
		qq: null,
		gender: null,
		avatar: null,
		username: null,
		phone: null,
		provice: null,
		town: null,
		city: null,
		openid: null,
		score: null,
		year_card: 0
	}
}
let token = uni.getStorageSync('token')
export default {
	state: userInfo,
	saveUserInfo (data, communities) {
		uni.setStorageSync('userInfo', data)
		uni.setStorageSync('communities', communities)
		if (data.token) {
			uni.setStorageSync('token', data.token)
			token = data.token
		}
		userInfo = data
		this.state = userInfo
		this.state.id = userInfo.id
		uni.$emit('onLogin')
	},
	saveUserAvatar (avatar) {
		this.state.avatar = avatar
		uni.setStorageSync('userInfo', this.state)
	},
	saveUserNickName (nickName) {
		this.state.nickname = nickName
		uni.setStorageSync('userInfo', this.state)
	},
	clearUserInfo () {
		this.state = {
			id: null,
			nickname: null,
			email: null,
			mobile: null,
			qq: null,
			gender: null,
			avatar: null,
			username: null,
			phone: null,
			provice: null,
			town: null,
			city: null,
			openid: null,
			score: null,
			year_card: 0
		}
		uni.removeStorageSync('userInfo')
		uni.removeStorageSync('token')
	},
	isLogin () {
		return this.state.id
	},
	getToken () {
		return token
	},
	isBindCommunity () {
		const communities = uni.getStorageSync('communities')
		return communities && communities.length > 0
	},
	saveCommunities (communities) {
		uni.setStorageSync('communities', communities)
	},
	getCommunities () {
		return uni.getStorageSync('communities')
	},
	getPrimaryCommunity () {
		if (this.isBindCommunity()) {
			return uni.getStorageSync('communities').filter(item => {
				return Number(item.pivot.is_primary) === 1
			})[0]
		} else {
			return null
		}
	},
	getCommunitiesCount () {
		return uni.getStorageSync('communities').length
	},
	saveCurrentCity (city) {
		uni.setStorageSync('currentCity', city)
	},
	currentCity () {
		return uni.getStorageSync('currentCity') || '济南市'
	}
}
