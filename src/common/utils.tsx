import {message} from 'antd'
import history from './history'
import { any } from 'prop-types';

export async function request(option: any = {}) {
  console.log(option)
  option = Object.assign(
    {
      url: '',
      method: 'GET',
      showError: true,
      action: (data: any) => {
        if (data.success === false && data.code === 'ERROR_NEED_LOGIN') {
          // TODO 这里可能统一跳转到 也可以是弹窗点击跳转
          history.push(`/login?redirect=${window.location.pathname}${window.location.search}`)
        }
      },
      headers: {},
      options: {},
    },
    option
  )
  if (option.params) {
    Object.keys(option.params).forEach(key => {
      option.url = option.url.replace(`:${key}`, encodeURIComponent(option.params[key]))
    })
  }
  if (option.query) {
    const paramsArray: string[] = []
    Object.keys(option.query).forEach(key => paramsArray.push(`${key}=${encodeURIComponent(option.query[key])}`))
    if (option.url.search(/\?/) === -1) {
      option.url += `?${paramsArray.join('&')}`
    } else {
      option.url += `&${paramsArray.join('&')}`
    }
  }
  let options: any = {
    method: option.method,
    credentials: 'include',
    headers: Object.assign({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }, option.headers),
  }
  options = Object.assign(options, option.options)
  if (option.body) {
    if (typeof option.body === 'object') option.body = JSON.stringify(option.body)
    options.body = option.body
  }
  let retData: any = {success: true}
  if (option.mock) {
    retData = option.mock
  } else{
    try {
      const res = await fetch(option.url, options)
      if (res.ok) {
        const data = await res.json()
        retData.success = data.success
        retData.content = data.content
        retData.message = data.message
        retData.code = data.code
      } else {
        retData.success = false
        retData.status = res.status
        retData.content = await res.text()
        retData.message = `请求非正常返回: 状态码 ${retData.status} ${retData.data}`
      }
    } catch (err) {
      retData.success = false
      retData.message = err.message
    }
  }
  if (option.showError && !retData.success) {
    message.error(retData.message)
  }
  if (option.action) {
    option.action(retData)
  }
  console.log('fetch return', retData)
  return retData
}