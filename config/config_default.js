const moment = require('moment')
const path = require('path')
const pkg = require('../package.json')

const dateFormat = () => `[${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}]`

module.exports = {
  debug: true,
  projectName: pkg.name,
  port: 3333, // 单独起服务的端口
  cdnPrefix: `//cdn.dtwave.com//${pkg.name}/${pkg.version}/`,
  versionPrefix: `/${pkg.name}/${pkg.version}/`,
  // 接口的转发
  proxy: {
    '/api/*': {
      target: `http://192.168.9.68:9118`,
      changeOrigin: true, // 支持跨域请求
      secure: true, // 支持 https
    },
  },

}
