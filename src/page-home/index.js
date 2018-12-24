import asyncComponent from '../common/AsyncComponent'

export default asyncComponent(async () => await import('./home'))
