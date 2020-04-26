import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import { baseURL, statusCode, KEYS } from '@/config'
import { getStorageItem, setStorageItem } from '@/utils'
import { Loading } from 'element-ui'
import { refreshToken } from '@/api/user'

// 创建实例
const instance = axios.create({
  baseURL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use((conf) => {
  // 在响应中添加token
  conf.headers.JWTToken = localStorage.getItem('token') ? localStorage.getItem('token') : ''
  conf.headers.appName = 'jsfs' // 头部需要传的名字，根据后端来决定
  conf.headers.cType = 'PC' // 也是根据后端来决定
  if (conf.method === 'get') {
    if (!conf.params) { // 如果这个请求本身不带参数
      Object.assign(conf, { // 给options这个对象添加一个params的参数，属性为timestamp,值为时间戳
        params: {
          timestamp: new Date().getTime()
        }
      })
    } else {
      Object.assign(conf.params, { // 如果get请求本身带有参数，给options.params 再添加一个key值timestamp,值为时间戳
        timestamp: new Date().getTime()
      })
    }
  }
  return conf
}, (err) => {
  // 调用element-ui提示错误
  Vue.prototype.$message.error(err)
  Promise.reject(err)
})

const duration = 2000
export const responseHandlers = {
  // 未登录,提示duration跳转登陆
  [statusCode.NOT_LOGIN]: (res) => {
    const message = '登录过期，请重新登录'
    Vue.prototype.$message({
      message,
      duration,
      type: 'error'
    })
    // 如果当前页面不是登陆，则跳转到登陆
    if (router.currentRoute.name !== 'login') {
      setTimeout(() => {
        router.push({
          name: 'login'
        })
      }, duration)
    }
    return Promise.resolve(res)
  },
  // token过期，刷新token，重发请求
  [statusCode.TOKEN_EXPIRED]: async (res) => {
    // 保存前一个请求
    const { config } = res
    // 用refreshToken去刷新authToken, refreshToken过期时间比authToken长,等待刷新成功后再进行后续操作
    const refreshTokenResponse = await refreshToken({ // 调用刷新token接口
      refreshToken: getStorageItem(KEYS.RefreshToken)
    })
    const { code, data = {} } = refreshTokenResponse
    const message = '登录过期，请重新登录'
    // token刷新成功，更新本地authToken和refreshToken
    if (code === statusCode.SUCCESS) {
      const { authToken, refreshTokens } = data
      setStorageItem(KEYS.JWTToken, authToken)
      setStorageItem(KEYS.RefreshToken, refreshTokens)
      // 用新的authToken重新请求
      config.headers[KEYS.JWTToken] = authToken
      // 这边不需要baseURL是因为会重新请求url,url中已经包含baseURL的部分了,如果不修改成空字符串，会变成'api/api/xxxx'的情况
      config.baseURL = ''
      return instance(config)
    }
    // 刷新失败跳转到登陆重新登陆，登陆成功之后跳转回来
    Vue.prototype.$message({
      message,
      duration,
      type: 'error'
    })
    // 重新登陆
    setTimeout(() => {
      router.push({
        name: 'login'
      })
    }, duration)
    return Promise.reject(res)
  }
}

// 响应拦截器
instance.interceptors.response.use(async (res, err) => {
  // 后续和后端协商响应状态码，添加统一的状态吗响应
  const retCode = res.data.code
  if (retCode === statusCode.NOT_LOGIN) {
    // 重新登陆
    setTimeout(() => {
      router.push({
        name: 'login'
      })
    }, duration)
    return Promise.reject(err)
  } else if (retCode === statusCode.TOKEN_EXPIRED) {
    // 重新登陆
    setTimeout(() => {
      router.push({
        name: 'login'
      })
    }, duration)
    return Promise.reject(err)
  }
  return res.data
}, (err) => {
  const loadingInstance = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  loadingInstance.close()
  const message = '服务器内部错误'
  const duration = 2000
  Vue.prototype.$message({
    message,
    duration,
    type: 'error'
  })
  return Promise.reject(err)
})

export default instance
