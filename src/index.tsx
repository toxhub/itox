import * as React from 'react'

import * as ReactDOM from 'react-dom'
import {ConfigProvider, DatePicker} from 'antd'
import zh_CN from 'antd/es/locale-provider/zh_CN';
import '@babel/polyfill'

import 'antd/dist/antd.less'; 
import {
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import history from './common/history'


import {Provider} from 'mobx-react'
import globalStore from './store/global_store';
const stores = {globalStore}

import './common/common.less'
import './index.css'

import Frame from './frame/frame'

import Login from './page-login/login'
import Home from './page-home/home'
import User from './page-user/user'


class App extends React.Component {
  render() {
    return (
      <Router  history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Frame>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/user" component={User} />
              <Route path="/404" render={() => <div style={{fontSize: 100}}>404</div>} />
              <Redirect from="/" to="/home" />
            </Switch>
          </Frame>
       </Switch>
       </Router>
    )
  }
}

ReactDOM.render(
  <ConfigProvider locale={zh_CN}>
    <Provider {...stores} >
      <App/>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
)
