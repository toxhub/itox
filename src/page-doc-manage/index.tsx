import {asyncComponent} from '../common/utils'

export default asyncComponent(async () => {
  try {
    require('./doc-manage.less')
    return await import('./doc-manage')
  } catch (error) {
    console.error(error)
  }
  return null
})