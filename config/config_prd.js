const pkg = require('../package.json')

module.exports = {
  debug: false,
  env: 'prd',
  logger: {
    prd: {
      name: 'prd',
      level: 'debug',
    },
  },
  render: {
    cdnPrefix: `/${pkg.version}/`,
    pages: [
      {
        paths: ['/a/*'],
        scripts: [],
        styleSheets: [
          'https://cdnjs.cloudflare.com/ajax/libs/antd/3.9.3/antd.css',
        ],
        page: 'admin',
        template: 'template',
      },
      {
        paths: ['/*'],
        scripts: [],
        styleSheets: [
          'https://cdnjs.cloudflare.com/ajax/libs/antd/3.9.3/antd.css',
        ],
        page: 'index',
        template: 'template',
      },
    ],
  },
  proxy: {
    paths: ['/api/*'], // 代理的接口列表
    needCheckLogin: true, // 是否需要调checkLogin 的接口
    checkInfo: {
      uncheckPaths: [], // 不进行checkLogin的接口
      checkPrefix: 'http://120.26.105.132:9018',
      checkApiUrl: '/api/v1/cms/check_login',
      method: 'post',
    },
    headerMap: { // 头参数设置映射
      userId: 'X-Dtwave-Access-UserId',
    },
    defaultUser: {}, // 测试的时候默认的数据 {userId: 1}
    apiPrefix: 'http://120.26.105.132:9018', // 网关的地址
  },
}
