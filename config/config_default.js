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
    '/render-server/api/*': {
      target: `http://127.0.0.1:9102`,
      changeOrigin: true, // 支持跨域请求
      secure: true, // 支持 https
    },
  },
  // 这个配置 config/conf.json中的数据
  conf: {
    dev: {
      pathPrefix: '/render-server',
      apiPrefix: '/api',
      debug: 'true'
    },
    build: {}
  }
}
