import * as React from 'react'

import * as ReactDOM from 'react-dom'
import {ConfigProvider, DatePicker} from 'antd'
import zh_CN from 'antd/es/locale-provider/zh_CN';
import '@babel/polyfill'

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

import Login from './page-login/login'
import Home from './page-home/home'

import DocManage from './page-doc-manage'
import DocMy from './page-doc-my'
import AppSearch from './page-app-search'
import OrgMember from './page-org-member'
import OrgRole from './page-org-role'
import OrgGroup from './page-org-group'

class App extends React.Component {
  render() {
    return (
      <Router  history={history} basename="doc">
        <Switch>
          <Route path={ window.pathPrefix + "/login"} component={Login} />
          <Frame>
            <Switch>
              <Route path={window.pathPrefix + "/home"} component={Home} />
              <Route path={window.pathPrefix + "/doc/manage"} component={DocManage} />
              <Route path={window.pathPrefix + "/doc/my"} component={DocMy} />
              <Route path={window.pathPrefix + "/app/search"} component={AppSearch} />
              <Route path={window.pathPrefix + "/organization/member"} component={OrgMember} />
              <Route path={window.pathPrefix + "/organization/role"} component={OrgRole} />
              <Route path={window.pathPrefix + "/organization/group"} component={OrgGroup} />
              <Route path={window.pathPrefix + "/404"} render={() => <div style={{fontSize: 100}}>404</div>} />
              <Redirect from={window.pathPrefix || "/"} to={window.pathPrefix + "/doc/manage"} />
              <Redirect from="/" to={window.pathPrefix + "/doc/manage"} />
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
