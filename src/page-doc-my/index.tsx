import {asyncComponent} from '../common/utils'

export default asyncComponent(async () => {
  try {
    require('./doc-my.less')
    return await import('./doc-my')
  } catch (error) {
    console.error(error)
  }
  return null
})