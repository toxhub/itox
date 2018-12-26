import React, {Component} from 'react'

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        component: null,
      }
    }

    async componentWillMount() {
      const {component: C} = this.state
      if (!C) {
        const {default: component} = await importComponent()
        this.setState({component})
      }
    }

    render() {
      const {component: C} = this.state

      return C ? <C {...this.props} /> : null
    }
  }
  return AsyncComponent
}
