const moment = require('moment')
const path = require('path')
const pkg = require('../package.json')

const dateFormat = () => `[${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}]`

module.exports = {
  debug: true,
  projectName: pkg.name,
  port: 3333, // 单独起服务的端口
  cdnPrefix: `//cdn.dtwave.com//${pkg.name}/${pkg.version}/`,
  versionPrefix: `/${pkg.version}/`,
}
