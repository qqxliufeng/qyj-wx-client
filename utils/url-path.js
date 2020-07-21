
// const baseIP = 'http://192.168.1.100'

// const baseIP = 'https://www.yixinglvxing.com'

const baseIP = 'http://192.168.0.104:8080'

export const baseUrl = baseIP + '/api/index/'

/* ================首页模块================ */

const indexModule = 'index/'

export const indexInfo = indexModule + 'index'

export const indexCommunity = indexModule + 'community'

/* ================首页模块================ */

/* ================问答模块================ */

const questionModule = 'questionMessage/'

export const publishQuestionMessage = questionModule + 'publishQuestionMessage'

export const getQuestionListByUid = questionModule + 'getQuestionListByUid'

export const getQuestionMessageInfo = questionModule + 'getQuestionMessageInfo'

export const getQuestionAnswerList = questionModule + 'getQuestionAnswerList'

export const closeQuestion = questionModule + 'closeQuestion'

export const editQuestionMessage = questionModule + 'editQuestionMessage'

export const addAnswer = questionModule + 'addAnswer'

export const getMyAnswerList = questionModule + 'getMyAnswerList'

/* ================问答模块================ */

/* ================寻物模块================ */

const lostModule = 'lost/'

export const getUserLostList = lostModule + 'getLostListByUid'

export const getUserHelpList = lostModule + 'getHelpLostListByUid'

export const getLostInfo = lostModule + 'getLostInfo'

export const getLostHelps = lostModule + 'getHelpLostByLid'

export const publishLost = lostModule + 'publishLostInfo'

export const closeLost = lostModule + 'closeLost'

export const editLost = lostModule + 'editLost'

export const addHelpContent = lostModule + 'addHelpContent'

/* ================寻物模块================ */

/* ================公共模块================ */

export const imageUrl = baseIP

const commonModuleUrl = 'common/'

export const imageActionUrl = baseIP + '/api/common/' +commonModuleUrl + 'upload'

/* ================公共模块================ */

/* ================小区模块================ */

const communityModule = 'community/'

export const getAllCities = communityModule + 'getAllCities'

export const getCommunities = communityModule + 'getAllCommunitiesByArea'

export const bindCommunity = communityModule + 'bindCommunity'

export const setPrimaryCommunity = communityModule + 'setPrimary'

export const unBindCommunity = communityModule + 'unBindCommunity'

export const communityInfo = communityModule + 'getCommunityInfo'

export const getCommunityPhones = communityModule + 'getPhoneInfos'

export const getPhoneInfo = communityModule + 'getPhoneInfo'

export const addPhoneInfo = communityModule + 'addPhoneInfo'

export const getMyPhoneInfo = communityModule + 'getMyPhoneInfo'

export const deletePhoneInfo = communityModule + 'deletePhoneInfo'

export const editPhoneInfo = communityModule + 'editPhoneInfo'

export const getAroundBusiness = communityModule + 'getAroundBusiness'

export const getBusinessInfo = communityModule + 'getBusinessInfo'

/* ================小区模块================ */

/* ================租房模块================ */

const rentingHouseModule = 'rentinghouse/'

export const publishRentingHouseInfo = rentingHouseModule + 'publishRentingHouseInfo'

export const getRentingHouseByUId = rentingHouseModule + 'getRentingHouseByUId'

export const getRentingHouseInfo = rentingHouseModule + 'rentingHouseInfo'

export const changeRentingState = rentingHouseModule + 'changeRentingState'

/* ================租房模块================ */

/* ================意见反馈模块================ */
const feedBackModule = 'feedback/'

export const addFeedBack = feedBackModule + 'addFeedBack'

/* ================意见反馈模块================ */

/* ================商品模块================ */

const goodsModule = 'goods/'

export const getGoodsTypeList = goodsModule + 'getGoodsTypeList'

export const addGoods = goodsModule + 'addGoods'

export const getMyGoodsList = goodsModule + 'getMyGoodsList'

export const changeGoodsStatus = goodsModule + 'changeStatus'

export const getGoodsInfo = goodsModule + 'getGoodsInfo'

/* ================商品模块================ */

/* ================活动模块================ */

const activityModule = 'activity/'

export const getActivityInfo = activityModule + 'getActivityInfo'

export const joinActivity = activityModule + 'joinActivity'

export const getCommunityActivityList = activityModule + 'getCommunityActivityList'

export const getJoinActivityList = activityModule + 'getJoinActivityList'

/* ================活动模块================ */

/* ================消息模块================ */

const messageModule = 'message/'

export const communityMessage = messageModule + 'getMessageList'

export const messageInfo = messageModule + 'getMessageInfo'

/* ================消息模块================ */

const userInfoUrl = 'user/'

export const userInfoLoginUrl = userInfoUrl + 'login'

export const userInfoRegisterUrl = userInfoUrl + 'register'

export const userInfoGetSMSCodeUrl = userInfoUrl + 'get_captcha'

export const userInfoModileLoginUrl = userInfoUrl + 'mobile_login'

export const userInfoForgetPWUrl = userInfoUrl + 'resetpwd'

export const userInfoResetPWUrl = userInfoUrl + 'eidtpwd'

export const userInfoResetInfo = userInfoUrl + 'profile'

export const userInfo = userInfoUrl + 'user_info'

export const wxLogin = userInfoUrl + 'miniapp_login'

export const getOpenId = userInfoUrl + 'get_openid'

export const myYearCard = userInfoUrl + 'yearCard'

export const addCardDetails = userInfoUrl + 'addCardDetails'

export const addCardImage = userInfoUrl + 'addCardImage'

export const myYearCardInfo = userInfoUrl + 'cardDetails'
