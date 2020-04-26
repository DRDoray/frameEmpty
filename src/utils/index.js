/**
 * 根据key获取localStorage的值
 * @param {string} name localStorage中存储的key
 * @returns { any } 找到就返回，未找到就返回undefined
 */
export const getStorageItem = (name) => {
  if (!name) return
  const value = window.localStorage.getItem(name)
  return value && value !== 'undefined' && JSON.parse(value)
}
/**
 * 将value以key为键保存到localStorage中
 * @param { string } name 存储到localStorage的key
 * @param { any } value 存储到localStorage的value
 * @returns { void }
 */
export const setStorageItem = (name, value) => {
  if (!name) return
  return window.localStorage.setItem(name, JSON.stringify(value))
}
/**
 * 删除localStorage
 * @param {string} name 删除localStorage中对应的key
 */
export const removeStorageItem = (name) => {
  if (!name) return
  return window.localStorage.removeItem(name)
}
/**
 * 清空localStorage
 */
export const clearStorage = () => window.localStorage.clear()

// 检测浏览器内核
export const getBrowserType = () => {
  if (navigator.userAgent.indexOf('Trident') !== -1) {
    return 'IE'
  } else if (navigator.userAgent.indexOf('Presto') !== -1) {
    return 'OPERA'
  } else if (navigator.userAgent.indexOf('AppleWebKit') !== -1 && navigator.userAgent.indexOf('Chrome') !== -1) {
    return 'WEBKIT'
  } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
    return 'FIREFOX'
  } else if (navigator.userAgent.indexOf('AppleWebKit') !== -1 && navigator.userAgent.indexOf('Chrome') === -1) {
    return 'SAFARI'
  }
}

// 设置cookie
export const setCookie = (cName, value, expiremMinutes) => {
  const exdate = new Date()
  exdate.setTime(exdate.getTime() + (expiremMinutes * 60 * 1000))
  document.cookie = `${cName}=${escape(value)}${(expiremMinutes == null) ? '' : `;expires=${exdate.toGMTString()}`}`
}

// 读取cookie
export const getCookie = (cName) => {
  if (document.cookie.length > 0) {
    let cStart = document.cookie.indexOf(`${cName}=`)
    if (cStart !== -1) {
      cStart = cStart + cName.length + 1
      let cEnd = document.cookie.indexOf(';', cStart)
      if (cEnd === -1) { cEnd = document.cookie.length }
      return unescape(document.cookie.substring(cStart, cEnd))
    }
  }
  return ''
}

// 删除cookie
export const delCookie = (cName) => {
  const exp = new Date()
  exp.setTime(exp.getTime() - 1)
  const cval = getCookie(cName)
  if (cval != null) {
    document.cookie = `${cName}=${cval};expires=${exp.toGMTString()}`
  }
}

// export const validatePhone = (rule, value, callback) => {
//   const rules = /^1[3|4|5|6|7|8|9][0-9]{9}$/
//   if (value && !rules.test(value)) {
//     callback(new Error('请输入正确格式的手机号'))
//   } else {
//     callback()
//   }
// }

// // 获取文件后缀名
// export const getSuffixName = (fileName) => {
//   if (!fileName) {
//     return ''
//   }
//   const index = fileName.lastIndexOf('.')
//   const suffix = fileName.substr(index + 1)
//   return suffix.toLowerCase()
// }
