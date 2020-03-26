import { imageUrl } from '../utils/url-path.js'
const hoursDiff = 1 * 60 * 60 * 1000
const daysDiff = 24 * hoursDiff
const mounthsDiff = 30 * daysDiff
const yearsDiff = 12 * mounthsDiff
export default {
	timeFilter (time) {
		const dataTime = new Date(time * 1000)
		const now = new Date()
		const diff = now - dataTime
		if (diff < hoursDiff) {
			return '刚刚'
		}
		if (diff > hoursDiff && diff < daysDiff) {
			return Math.floor(diff / hoursDiff) + '小时前'
		}
		if (diff > daysDiff && diff < mounthsDiff) {
			return Math.floor(diff / daysDiff) + '天前'
		}
		const year=dataTime.getFullYear()
		const month=dataTime.getMonth()+1
		const date=dataTime.getDate()
		const hour=dataTime.getHours()
		const minute=dataTime.getMinutes()
		const second=dataTime.getSeconds()
		return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second
	},
	dateFormat (timeStamp) {
	  const date = new Date(timeStamp);
	  const YY = date.getFullYear() + '-';
	  const MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	  const DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
	  const hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	  const mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	  const ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	  return YY + MM + DD +" "+hh + mm + ss;
	},
	imagePath (path) {
		if (!path) {
			return ''
		}
		if (path.indexOf('http://') !== -1 || path.indexOf('https://') !== -1) {
			return path
		}
		return imageUrl + path
	}
}