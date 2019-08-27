import {asyncComponent} from '../common/utils'

export default asyncComponent(async () => {
  try {
    require('./org-member.less')
    return await import('./org-member')
  } catch (error) {
    console.error(error)
  }
  return null
})