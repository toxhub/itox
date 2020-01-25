import * as React from 'react'

import * as ReactDOM from 'react-dom'
import '@babel/polyfill'

import 'antd/dist/antd.less'; 
import './common/flexbox.css'
import './common/common.styl'


class App extends React.Component {
  render() {
    return (
      <div>这是admin页面</div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
