module.exports = {
  // 管理控制台
  // admin_console: [{
  //   productName: '总览',
  //   url: '/overview',
  //   withProduct: 'data_asset',
  // }, {
  //   productName: '我的产品',
  //   url: '/console',
  //   withProduct: 'admin_console',
  // }],
  // 开发套件
  ide: [{
    productName: '项目列表',
    url: '/',
  }, {
    productName: '开发中心',
    url: '/dipper',
  }, {
    productName: '发布管理',
    url: '/publish',
  }, {
    productName: '运维中心',
    url: '/operation',
  }, {
    productName: '监控管理',
    url: '/monitor',
  }, {
    productName: '数据管理',
    url: '/data',
  }],

  // 算法平台
  AIplat: [{
    productName: '项目列表',
    url: '/project-list',
  }, {
    productName: '模型列表',
    url: '/model-list',
  },
  {
    productName: '发布包中心',
    url: '/package-center',
  },
  //   productName: '部署审核',
  //   url: '/deploy-audit',
  // }, {
  //   productName: '模型引擎',
  //   url: '/model-engine',
  // },
  ],

  // 澜图
  // waveview: [{
  //   productName: '我的项目',
  //   url: '21',
  // }, {
  //   productName: '优秀案例',
  //   url: '23',
  // }, {
  //   productName: '使用手册',
  //   url: '24',
  // }],

  // 幻数
  magic: [{
    productName: '项目管理',
    url: '/app-list',
  }, {
    productName: '图表授权',
    url: '/chart-authorize',
  }, {
    productName: '邮件通知',
    url: '/email-inform',
  }],

  // 资源管理
  resource: [{
    productName: '计算引擎',
    // onlyHost: true,
    withProduct: 'admin_console',
    url: '/engine',
  }, {
    productName: '资源组',
    // onlyHost: true,
    withProduct: 'admin_console',
    url: '/resource#/',
  }],

  // 服务中心
  service_center: [{
    productName: '项目列表',
    url: '/service/list',
  }, {
    productName: '调用方管理',
    url: '/service/callers',
  }],

  // 标签管理
  tags: [{
    productName: '标签总览',
    url: '#/overview',
  }, {
    productName: '前台类目',
    url: '#/front',
  }, {
    productName: '后台类目',
    url: '#/backend',
  }],

  // 任务管理
  task_manage: [{
    productName: '任务列表',
    url: '#/list',
  }],

  // 后台管理
  audit: [{
    productName: '审计日志',
    url: '#/auditAction',
    children: [{
      productName: '行为类',
      url: '#/auditAction',
    }, {
      productName: '数据类',
      url: '#/auditData',
    }],
  }, {
    productName: '监控信息',
    url: '#/hardwareMonitor',
    children: [{
      productName: '硬件监控',
      url: '#/hardwareMonitor',
    }, {
      productName: '服务监控',
      url: '#/serviceMonitor',
    }],
  }],

  // 埋点
  dpm: [{
    productName: '项目管理',
    url: '/project',
  }, {
    productName: '帮助文档',
    url: '/help-doc',
  }],
  
  // 数据资产
  data_asset: [{
    productName: '概览',
    url: '/tag#/overview',
  }, {
    productName: '前台标签',
    url: '/tag#/front',
  }, {
    productName: '后台标签',
    url: '/tag#/backend',
  }, {
    productName: '数据表',
    url: '/physical',
  }, {
    productName: '数据标准',
    url: '/data-rule',
  }, {
    productName: '安全策略',
    url: '/strategy',
  }],

  // 网关
  gateway: [{
    productName: '服务管理',
    url: '/service',
  }, {
    productName: '密钥管理',
    url: '/key',
  }, {
    productName: '流量控制',
    url: '/ratelimit',
  }, {
    productName: '监控管理',
    url: '/monitor',
  }, {
    productName: '文档中心',
    url: '/doc',
  }, {
    productName: '回收站',
    url: '/recycle',
  }],
}
