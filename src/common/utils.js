import {message} from 'antd'
import uuid from 'uuid/v4'
import history from './history'

export async function request(option = {}) {
  console.log(option)
  option = Object.assign(
    {
      url: '',
      method: 'GET',
      showError: true,
      action: data => {
        if (data.success === false && data.code === 'ERROR_NEED_LOGIN') {
          // 这里可能统一跳转到
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
    const paramsArray = []
    Object.keys(option.query).forEach(key => paramsArray.push(`${key}=${encodeURIComponent(option.query[key])}`))
    if (option.url.search(/\?/) === -1) {
      option.url += `?${paramsArray.join('&')}`
    } else {
      option.url += `&${paramsArray.join('&')}`
    }
  }
  let options = {
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
  let retData = {success: true}
  if (option.mock) {
    retData = option.mock
    return retData
  }
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
  if (option.showError && !retData.success) {
    message.error(retData.message)
  }
  if (option.action) {
    option.action(retData)
  }
  console.log('fetch return', retData)
  return retData
}

// 从loaction 获取页面参数
export function GetQueryString(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return (r[2])
  }
  return null
}
// 对图片进行base64处理
function getBase64(img) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result))
    reader.readAsDataURL(img)
  })
}

// 上传图片
export async function uploadLogo(file, type, teamId) {
  let fileName = uuid()
  if (file.type === 'image/jpeg') {
    fileName += '.jpeg'
  } else if (file.type === 'image/png') {
    fileName += '.png'
  }
  console.log(fileName)
  const imageUrl = await getBase64(file)
  // console.log(imageUrl)
  const result = await request({
    url: '/api/v1/cms/upload_logo',
    method: 'POST',
    body: {
      type,
      teamId,
      name: fileName,
      data: imageUrl,
    },
  })
  console.log(result)
  return result
}
