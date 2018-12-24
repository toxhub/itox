import asyncComponent from '../common/AsyncComponent'

export default asyncComponent(async () => import('./home'))
