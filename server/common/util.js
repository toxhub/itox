

const isAjaxRequest = ctx => ctx.header['x-requested-with'] === 'XMLHttpRequest'


module.exports = {isAjaxRequest}
