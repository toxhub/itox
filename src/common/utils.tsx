import {message, Modal} from 'antd'
import history from './history'
import React, {Component} from 'react'
import moment from 'moment'
import conf from '../../config/conf.json';

// 和`webpack chunk`配合使用的异步加载模块
export function asyncComponent(importComponent: any) {
  class AsyncComponent extends Component {
    constructor(props: any) {
      super(props)
      this.state = {
        component: {},
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

// ajax 请求的统一封装
export async function request(option: any = {}) {
  option = Object.assign(
    {
      url: '',
      method: 'GET',
      showError: false,
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
  return retData
}

// 统一成功提示
export function successTip(content: string) {
  message.success(content)
}
// 统一失败提示
export function errorTip(title: string, content: string) {
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
export function infoTip(content: any) {
  message.info(content)
}

// 统一警告提示
export function warningTip(content: any) {
  message.warning(content)
}

// 时间戳转化时间显示
export function getFormatTime(time: string, format = 'YYYY-MM-DD') {
  return time ? moment(time).format(format) : ''
}

export let config = Object.assign(conf, window.conf);

// 获取日志配置
export function log(...arg) {
  if (config.debug) {
    console.log(...arg);
  }
}
