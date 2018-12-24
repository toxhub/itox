import React, {Component} from 'react'
import './home.css'
/*
class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
        <DatePicker />
      </div>
    )
  }
}
export default Home; */
/* export default () => (
  <div className="home">
    <h2>Home</h2>
  </div>
) */

/*
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)
export default Home */
import {inject, observer} from 'mobx-react'

@inject('store')
@observer
class Home extends Component {
  render() {
    return (
      <div className="home">
        <h2>
Home
          {this.props.store.baseStore.text}
        </h2>
      </div>
    )
  }
}
export default Home
