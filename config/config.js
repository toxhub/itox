const pkg = require('../package.json')

module.exports = {
  listenType: 'port',
  render: {
    cdnPrefix: '/0.0.1/',
  },
  webpack: {
    cdnPrefix: '/',
    versionPrefix: `/${pkg.version}/`,
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
