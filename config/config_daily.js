
const pkg = require('../package.json')

module.exports = {
  debug: false,
  env: 'daily',
  listenType: 'file', // 设置程序监听的类型是port还是文件file
  logger: {
    prd: {
      name: 'prd',
      level: 'debug',
    },
  },
  dingLogin: {
    // dev
    appId: 'dingoa6gas6br0fhjhrwqa',
    redirectUri: 'http://merak_cms.test.dtwave-inc.com/dingtalk/login',
  },
  render: {
    cdnPrefix: `/${pkg.version}/`,
  },
  proxy: {
    paths: ['/api/*'], // 代理的接口列表
    needCheckLogin: true,
    checkInfo: {
      uncheckPaths: [], // 不进行
      // checkPrefix: 'http://192.168.1.9:9018',
      checkPrefix: 'http://120.26.105.132:9018',
      checkApiUrl: '/api/v1/cms/check_login',
    },
    headerMap: {
      userId: 'X-Dtwave-Access-UserId',
    },
    defaultUser: {
    },
    // apiPrefix: 'http://192.168.1.9:9018',
    apiPrefix: 'http://120.26.105.132:9018',
  },
}
