
const views = require('koa-views')
const path = require('path')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const responseFormat = require('./response_format')
const apiProxy = require('./api_proxy')
const render = require('./render')
const config = require('../../config')

module.exports = app => {
  app.use(views(path.join(__dirname, '../view'), {
    extension: 'ejs',
  }))
  app.use(koaStatic(path.join(__dirname, '../public'), {maxage: 8 * 3600 * 100, index: null}))
    .use(bodyParser({
      enableTypes: ['json', 'form'],
      formLimit: '2mb',
      jsonLimit: '3mb',
    }))
  app.use(responseFormat())
  app.use(render(config.render))
  app.use(apiProxy(config.proxy))
    .use(async ctx => {
      ctx.throw(404, `path '${ctx.path}' not found`)
    })
}
