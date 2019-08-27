import {message} from 'antd'
import history from './history'
import React, {Component} from 'react'
import moment from 'moment'

// 和`webpack chunk`配合使用的异步加载模块
export function asyncComponent(importComponent: any) {
  class AsyncComponent extends Component {
    constructor(props: any) {
      super(props)
      this.state = {
        component: null,
      }
    }

    async UNSAFE_componentWillMount() {
      const {component: C} = this.state
      if (!C) {
        const {default: component} = await importComponent()
        this.setState({component})
      }
    }

    render() {
      const {component: C} = this.state

      return C ? <C {...this.props} /> : null
    }
  }
  return AsyncComponent
}

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
// 暂时添加
window.__userConfig = {
  // tenantId: 4,
}

export function getUserConfig(param) {
  const userConfig = window.__userConfig || {}
  if (param) {
    return userConfig[param]
  }
  return userConfig
}

// 用于冻结__keeper的值，防止getKeeper取到之前被篡改
export function freezeKeeper() {
  window.keeper = Object.freeze(window.__keeper)
}

// 从__keeper获取部分信息
export function getKeeper(key) {
  const keeper = window.keeper || {}
  return keeper[key]
}

// 统一成功提示
export function successTip(content) {
  message.success(content)
}
// 统一失败提示
export function errorTip(title, content) {
  const l = arguments.length
  if (l === 0) {
    title = '系统异常'
  } else if (l === 1) {
    content = title
    title = ''
  }
  Modal.error({
    title,
    content,
  })
}
// 统一信息提示
export function infoTip(content) {
  message.info(content)
}
// 统一警告提示
export function warningTip(content) {
  message.warning(content)
}


function myToFixed(num, divisor, isToFixed) {
  if (isToFixed) {
    return Math.round((num * 100) / divisor) / 100
  }
  return Math.round(num / divisor)
}


// 计算文件大小
export function calcSize(size = 0, defaultUnit = 'B', isToFixed = true) {
  if (size === '') {
    return ''
  }

  const map = {
    b: 1,
    kb: 2 ** 10,
    mb: 2 ** 20,
    gb: 2 ** 30,
    tb: 2 ** 40,
  }

  // 后端给的是单位是B
  size = parseInt(size, 10)

  // 添加正负数判断
  // let isNegative = false
  if (size < 0) {
    // isNegative = true
    size = Math.abs(size)
  }

  if (size === 0) {
    return '0 B'
  } else if (size < map.mb && size >= map.kb) {
    defaultUnit = 'KB'
  } else if (size < map.gb && size >= map.mb) {
    defaultUnit = 'MB'
  } else if (size < map.tb && size >= map.gb) {
    defaultUnit = 'GB'
  } else if (size >= map.tb) {
    defaultUnit = 'TB'
  }

  size = myToFixed(size, map[defaultUnit.toLowerCase()], isToFixed)
  return `${size} ${defaultUnit}`
}

// 获取文档类型文字
export function getFileTypeText(fileType) {
  let text = ''
  switch (fileType) {
    case 'project_file':
      text = '项目文件'
      break
    case 'project_news':
      text = '项目动态'
      break
    case 'work_brief_report':
      text = '工作简报'
      break
    case 'reference':
      text = '参考资料'
      break
    case 'solution_doc':
      text = '方案文档'
      break
    case 'intellectual_property':
      text = '知识产权'
      break
    default:
      text = '其他'
  }
  return text
}

export function checkAuthCode(code: any) {
  const userAuthCodeList = window.userAuthCode || []
  return userAuthCodeList.includes(code)
}

// 转化时间显示
export function getFormatTime(time: string, format = 'YYYY-MM-DD') {
  return time ? moment(time).format(format) : ''
}


const {apiV = '1'} = window
const {pathPrefix = ''} = window
export const dubheApi = `${pathPrefix}/api/v${apiV}/dubhe`
export const resourceApi = `${pathPrefix}/api/v${apiV}/resource`
export const accountApi = `${pathPrefix}/account/v${apiV}`
export const entApi = `${pathPrefix}/api/v${apiV}/ent`
export const dataApi = `${pathPrefix}/api/v${apiV}/megrez_shuqi`
export const uicApi = `${pathPrefix}/api/v${apiV}/uic`