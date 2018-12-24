/**
 * response 格式化中间件
 */

const log = require('../common/logger')

module.exports = () => async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    /* istanbul ignore next */
    log.error('[server warn]: ', ctx.request.method, ctx.request.originalUrl, ctx.status, err)
    ctx.status = err.status || 200
    ctx.body = {
      code: err.code || 0,
      success: false,
      content: 'from front',
      message: err.message,
    }
  }
}
