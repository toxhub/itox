import {asyncComponent} from '../common/utils'

export default asyncComponent(async () => {
  try {
    require('./org-role.less')
    return await import('./org-role')
  } catch (error) {
    console.error(error)
  }
  return null
})