
const Koa = require('koa')
const config = require('../config')
const log = require('./common/logger')
const middleware = require('./middleware')

const app = new Koa()
middleware(app)
log.info(`============= env: ${config.env} =============`)

if (config.listenType === 'file') {
  app.listen(config.sockFile, () => {
    log.info(`Server listening on file: ${config.sockFile}`)
  })
} else {
  app.listen(config.port, '0.0.0.0', () => {
    log.info(`Server listening on port: ${config.port}`)
  })
}

// 暴露app出去，用于测试
module.exports = app
