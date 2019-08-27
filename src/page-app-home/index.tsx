import {asyncComponent} from '../common/utils'

export default asyncComponent(async () => {
  try {
    require('./app-home.less')
    return await import('./app-home')
  } catch (error) {
    console.error(error)
  }
  return null
})