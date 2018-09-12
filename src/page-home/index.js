import asyncComponent from '../common/AsyncComponent';

export default asyncComponent(async () => {
  return await import('./home')
})
