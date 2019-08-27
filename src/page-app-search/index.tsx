import {asyncComponent} from '../common/utils'

export default asyncComponent(async () => {
  try {
    require('./app-search.less')
    return await import('./app-search')
  } catch (error) {
    console.error(error)
  }
  return null
})