const moment = require('moment')
const path = require('path')
const pkg = require('../package.json')

const dateFormat = () => `[${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}]`

module.exports = {
  debug: true,
  projectName: 'react-starter',
  env: 'dev',
  port: 9090, // 单独起服务的端口
  listenType: 'port', // 设置程序监听的类型是port还是文件file
  devPort: 8080, // 前端webpack dev的端口
  sockFile: path.join(__dirname, `../../${pkg.name}_${pkg.version}.sock`), // 设置程序监听的类型是文件监听的文件地址 去适配merak发包的部署方式
  render: {
    cdnPrefix: `/${pkg.version}/`,
    pages: [
      {
        paths: ['/a/*'],
        title: 'Node前端开发框架模板',
        description: 'node 的代理服务前端模板',
        scripts: [],
        styleSheets: [
          'https://cdnjs.cloudflare.com/ajax/libs/antd/3.9.3/antd.css',
        ],
        page: 'admin',
        template: 'template', // 模板的名称
      },
      {
        paths: ['/*'],
        title: '管理后台-数澜内容管理系统',
        description: '数澜内容管理系统',
        scripts: [],
        styleSheets: [
          'https://cdnjs.cloudflare.com/ajax/libs/antd/3.9.3/antd.css',
        ],
        page: 'index',
        template: 'template', // 模板的名称
      },
    ],
  },
  proxy: {
    paths: ['/api/*'], // 代理的接口列表
    needCheckLogin: true,
    checkInfo: {
      uncheckPaths: [], // 不进行
      checkPrefix: 'http://120.26.105.132:9018',
      checkApiUrl: '/api/v1/cms/check_login',
      method: 'post',
    },
    headerMap: {
      userId: 'X-Dtwave-Access-UserId',
    },
    defaultUser: {},
    apiPrefix: 'http://120.26.105.132:9018',
  },
  logger: {
    dev: {
      name: 'dev',
      level: 'debug',
      json: false,
      colorize: 'all',
      localTime: true,
      label: process.pid,
      timestamp: dateFormat,
    },
    prd: {
      name: 'prd',
      level: 'info',
      json: false,
      colorize: false,
      localTime: true,
      label: process.pid,
      timestamp: dateFormat,
      datePattern: 'YYYY-MM-DD',
      filename: 'server.%DATE%.log',
      dirname: `/data/${pkg.name}/logs/`,
      maxFiles: '60d',
    },
  },
}
