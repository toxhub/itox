

const axios = require('axios')
const pathToRegexp = require('path-to-regexp')
const log = require('../common/logger')

module.exports = proxyInfo => async (ctx, next) => {
  if (typeof proxyInfo.paths === 'string') {
    proxyInfo.paths = [proxyInfo.paths]
  }
  if (proxyInfo.paths.find(path => pathToRegexp(path).exec(ctx.path))) {
    let userInfo = proxyInfo.defaultUser || {}
    const reqHeaders = ctx.headers
    delete reqHeaders['content-length']
    delete reqHeaders.host
    delete reqHeaders['content-type']
    if (proxyInfo.needCheckLogin && !proxyInfo.checkInfo.uncheckPaths.find(path => pathToRegexp(path).exec(ctx.path))) {
      const option = {
        url: proxyInfo.checkInfo.checkApiUrl,
        baseURL: proxyInfo.checkInfo.checkPrefix,
        method: proxyInfo.checkInfo.method || 'post',
        headers: reqHeaders,
      }
      log.debug('option checklogin:', option)
      const {data} = await axios(option)
      log.debug('checklogin result:', data)
      if (data.success) {
        userInfo = data.content
      }
    }
    if (proxyInfo.headerMap) {
      for (const k in proxyInfo.headerMap) {
        if (typeof userInfo[k] !== 'undefined') {
          reqHeaders[proxyInfo.headerMap[k]] = userInfo[k]
        }
      }
    }
    const option = {
      url: ctx.url,
      baseURL: proxyInfo.apiPrefix,
      method: ctx.method.toLocaleUpperCase(),
      headers: reqHeaders,
      // url中带有query参数时，params不要传
      // params: ctx.query,
      data: ctx.request.body,
    }
    const optionStr = JSON.stringify(option)
    if (optionStr.length <= 1000) {
      log.debug('option:', optionStr)
    }
    const {data, headers} = await axios(option)
    log.debug('proxy result', data, headers)
    // 添加headers会报错
    // ctx.set(headers)
    ctx.body = data
  } else {
    await next()
  }
}
