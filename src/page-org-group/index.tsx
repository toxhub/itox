import {asyncComponent} from '../common/utils'

export default asyncComponent(async () => {
  try {
    require('./org-group.less')
    return await import('./org-group')
  } catch (error) {
    console.error(error)
  }
  return null
})