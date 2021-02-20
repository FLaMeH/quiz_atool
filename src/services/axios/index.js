import axios from 'axios'
import handleResponse from '@/services/axios/axios.handleResponse'
import handleError from '@/services/axios/axios.handleError'
import { notification } from 'ant-design-vue'
import $store from '@/store'
import qs from 'qs'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000,
  headers: {
    post: { 'Content-Type': 'application/x-www-form-urlencoded' },
    put: { 'Content-Type': 'application/x-www-form-urlencoded' },
    patch: { 'Content-Type': 'application/x-www-form-urlencoded' },
  },
})

const pendingPool = new Map() // 缓冲池

const showTip = (tip) => {
  console.dir(tip)
  notification[tip.type || 'warning']({
    message: tip.message || '请求出错',
    description: tip.description || '未知错误',
  })
}

const requestInterceptorId = instance.interceptors.request.use(
  (config) => {
    const token = $store.state.auth.tokenType + ' ' + $store.state.auth.accessToken
    const headers = config.headers || {}
    const method = config.method.toUpperCase()
    const url = config.url
    if (token && url !== '/auth/captcha') {
      headers.common.Authorization = token
    }
    if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && !config.headers['upload-with-file'] && !config.headers['skip-content-type-rewrite']) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      config.data = qs.stringify(config.data)
    }
    if (config.headers['upload-with-file']) {
      delete config.headers['upload-with-file']
      config.headers['Content-Type'] = 'multipart/form-data'
    }
    if (config.headers['skip-content-type-rewrite']) {
      delete config.headers['skip-content-type-rewrite']
    }
    /*
    config.cancelToken = new axios.CancelToken(
      cancelFn => {
        pendingPool.has(config.url)
          ? cancelFn(`${config.url}请求重复`)
          : pendingPool.set(config.url, { cancelFn, global: config.global })
      },
    ) */
    return config
  },
  (err) => {
    console.log('请求拦截err:', err)
    return Promise.reject(err)
  },
)

const responseInterceptorId = instance.interceptors.response.use(
  (response) => {
    const { config } = response
    pendingPool.delete(config.url)
    // showTip(response.message)
    return Promise.resolve(handleResponse(response))
  },
  err => {
    const { config } = err
    if (!axios.isCancel(err)) pendingPool.delete(config.url)
    if (!err) {
      return Promise.reject(err)
    }
    if (err.response) {
      err = handleError(err)
    } else {
      // 错误信息err传入isCancel方法，可以判断请求是否被取消
      if (axios.isCancel(err)) {
        throw new axios.Cancel(
          err.message || `请求'${instance.config.url}'被取消`,
        )
      } else if (err.stack && err.stack.includes('timeout')) {
        err.message = '请求超时!'
      } else {
        err.message = '连接服务器失败!'
      }
    }

    showTip(err)
    return Promise.reject(err)
  },
)

// 移除全局的请求拦截器
function removeRequestInterceptor() {
  instance.interceptors.request.eject(requestInterceptorId)
}

// 移除全局的响应拦截器
function removeResponseInterceptor() {
  instance.interceptors.response.eject(responseInterceptorId)
}

/**
 * 清除所有pending状态的请求
 * @param {Array} whiteList 白名单，里面的请求不会被取消
 * 返回值 被取消了的api请求
 */
function clearPendingPool(whiteList = []) {
  if (!pendingPool.size) return

  // const pendingUrlList = [...pendingPool.keys()].filter((url) => !whiteList.includes(url))
  const pendingUrlList = Array.from(pendingPool.keys()).filter(
    url => !whiteList.includes(url),
  )
  if (!pendingUrlList.length) return

  pendingUrlList.forEach(pendingUrl => {
    // 清除掉所有非全局的pending状态下的请求
    if (!pendingPool.get(pendingUrl).global) {
      pendingPool.get(pendingUrl).cancelFn()
      pendingPool.delete(pendingUrl)
    }
  })

  return pendingUrlList
}

instance.removeRequestInterceptor = removeRequestInterceptor
instance.removeResponseInterceptor = removeResponseInterceptor
instance.clearPendingPool = clearPendingPool

export default instance
