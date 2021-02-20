export default (axios, config = {}) => {
  const defaultConfig = {
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 10000,
    headers: {
      // 'custom-defined-header-key': 'custom-defined-header-value',
      // 自定义请求头：对所有请求方法生效
      common: {
        // 'common-defined-key-b': 'custom value: for all methods'
      },
      // 自定义请求头：只对post方法生效
      post: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'post-custom-key': 'custom value: only for post method',
      },
      // 自定义请求头：只对get方法生效
      get: {
        'Content-Type': 'application/json;charset=UTF-8',
        // 'get-custom-key': 'custom value: only for get method',
      },
    },
  }
  // 这里会报错
  Object.assign(axios.defaults, defaultConfig, config)
  return axios
}
