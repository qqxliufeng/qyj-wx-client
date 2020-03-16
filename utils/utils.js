const weekMap = {
  '1': '一',
  '2': '二',
  '3': '三',
  '4': '四',
  '5': '五',
  '6': '六',
  '0': '日'
}
export default{
	dateAdd (startDate, num = 1) {
		startDate = new Date(startDate)
		startDate = +startDate + 1000 * 60 * 60 * 24 * num
		startDate = new Date(startDate)
		return { date: startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate(), week: startDate.getDay() }
	  },
	getWeekByWeek (week) {
		return weekMap[week]
	},
	validator: {
		phoneReg: /^1[0-9]\d{9}$/,
		passwordReg: /^(\w){6,16}$/,
		emailReg: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
		regIdCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
		isPhone (phone) {
		  return this.phoneReg.test(phone)
		},
		isPassword (s) {
		  return this.passwordReg.test(s)
		},
		isEmail (s) {
		  return this.emailReg.test(s)
		},
		checkIdCard (idcard) {
			if (!this.regIdCard.test(idcard)) {
				return false
			} else {
				return true
			}
		}
	},
	common: {
		hiddenMobile (mobile) {
		  let newMobile = mobile
		  if (mobile.length > 7) {
			newMobile = mobile.substr(0, 3) + '****' + mobile.substr(7)
		  }
		  return newMobile
		},
		delHtmlTag (str) {
		  if (str) {
		    return str.replace(/<[^>]+>/g, '')
		  }
		  return ''
		}
    }
}

export function bMapTransqqMap(lng, lat) {
	  let x_pi = 3.14159265358979324 * 3000.0 / 180.0
	  let x = lng - 0.0065
	  let y = lat - 0.006
	  let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi)
	  let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi)
	  let lngs = z * Math.cos(theta)
	  let lats = z * Math.sin(theta)
	  return {
	    lng: lngs,
	    lat: lats
	  }
}