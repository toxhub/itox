import * as React from 'react'

import * as ReactDOM from 'react-dom'
import {ConfigProvider} from 'antd'
import zh_CN from 'antd/es/locale-provider/zh_CN';
import '@babel/polyfill'
import {config} from "./common/utils";
import {
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import history from './common/history'


import {Provider} from 'mobx-react'
import globalStore from './store/global-store';
const stores = {globalStore}

import 'antd/dist/antd.less';
import './common/flexbox.css'
import './common/common.styl'

import Frame from './frame'

import Login from './pages/login/login'
import Home from './pages/home/home'
import About from './pages/about/about'
import Plugin from './pages/plugin/plugin'

class App extends React.Component {
  render() {
    console.log('config', config)
    return (
      <Router  history={history} >
        <Switch>
          <Route path={ config.pathPrefix + "/login"} component={Login} />
          <Frame>
            <Switch>
              <Route path={config.pathPrefix + "/home"} component={Home} />
              <Route path={config.pathPrefix + "/about"} component={About} />
              <Route path={config.pathPrefix + "/plugin"} component={Plugin} />
              <Route path={config.pathPrefix + "/404"} render={() => <div style={{fontSize: 100}}>404</div>} />
              <Redirect from="/" to={config.pathPrefix + "/home"} />
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
