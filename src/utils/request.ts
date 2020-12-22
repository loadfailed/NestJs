import axios from 'axios'

const baseURL = 'https://www.iesdouyin.com/'

const $axios = axios.create({
  baseURL,
  withCredentials: true, // 允许携带cookie
  timeout: 10000 // 超时时间
})

// 请求拦截
$axios.interceptors.request.use(
  (config) => {
    // 处理请求之前的配置
    config.headers['user-agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
    return config
  },
  (error) => {
    // 请求失败的处理
    return Promise.reject(error)
  }
)

// 响应拦截
$axios.interceptors.response.use(
  (response) => {
    // 处理响应数据
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      const error = new Error(response.statusText)
      return Promise.reject(error)
    }
  },
  async (error) => {
    // 请求超时的之后，抛出 error.code = ECONNABORTED的错误..错误信息是 timeout of  xxx ms exceeded
    if (
      error.code === 'ECONNABORTED' &&
      error.message.indexOf('timeout') !== -1
    ) {
      const config = error.config
      // If config does not exist or the retry option is not set, reject
      if (!config || !config.retry) return Promise.reject(error)

      // Set the variable for keeping track of the retry count
      config.__retryCount = config.__retryCount || 1

      // Check if we've maxed out the total number of retries
      if (config.__retryCount >= config.retry) {
        return Promise.reject(error)
      }

      // Increase the retry count
      config.__retryCount += 1

      // Create new promise to handle exponential backoff
      const backoff = new Promise(resolve => {
        setTimeout(() => {
          // console.log("resolve");
          resolve('')
        }, config.retryDelay || 1)
      })

      await backoff
      return await $axios(config)
    } else {
      return Promise.reject(error?.response?.data)
    }
  }
)

export default $axios
