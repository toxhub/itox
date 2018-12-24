
const pathToRegexp = require('path-to-regexp')

module.exports = (renderConf, filiter = ['/api/*']) => async (ctx, next) => {
  if (typeof filiter === 'string') {
    filiter = [filiter]
  }
  if (ctx.headers['x-requested-with'] === 'XMLHttpRequest'
    || (filiter && filiter.find(path => pathToRegexp(path).exec(ctx.path)))) {
    await next()
    return
  }
  let renderInfo
  if (renderConf.pages) {
    renderInfo = renderConf.pages.find(pageInfo => {
      let paths = []
      if (typeof pageInfo.paths === 'string') {
        paths = [pageInfo.paths]
      } else {
        paths = paths.concat(pageInfo.paths)
      }
      if (paths.find(path => pathToRegexp(path).exec(ctx.path))) {
        return pageInfo
      }
      return null
    })
  }
  if (renderInfo) {
    renderInfo.cdnPrefix = renderConf.cdnPrefix || '/'
    await ctx.render(renderInfo.template || 'template', renderInfo)
  } else {
    await next()
  }
}
