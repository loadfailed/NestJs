import request = require('request')

interface RequestParamsConfig {
  url: string
  method: string
  headers?: Record<string, unknown>
  data?: Record<string, unknown>
}

/**
 * @description 定义一个通用的请求函数
 * @param 请求参数为对象 url必填，method必填( 'GET' / 'POST' ) ，headers选填，data选填
 * @return 返回请求后的Promise
 */
const uRequest = async (options: RequestParamsConfig): Promise<any> => {
  const result = new Promise((resolve, reject) => {
    request(
      {
        url: options.url,
        method: options.method,
        headers: options.headers,
        form: options.data
      },
      function (err, res, body) {
        const response = JSON.parse(body)
        if (err || response.error) {
          reject(err || response)
        } else {
          resolve(response)
        }
      }
    )
  })
  return result
    .then((response) => response)
    .catch((e) => {
      throw e
    })
}

export default uRequest
