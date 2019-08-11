import React from 'react'
import {render} from 'react-dom'

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from 'react-router-dom'
import '@babel/polyfill'

import {LocaleProvider} from 'antd' // 这个是ant的语言
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'antd/dist/antd.less'


const App = () => (
  <Router>
    <div>
      <header>
        <nav>
          <ul>
            <li><NavLink exact to="/">首页</NavLink></li>
            <li><NavLink to="/news">新闻</NavLink></li>
            <li><NavLink to="/login">登录</NavLink></li>
          </ul>
        </nav>
      </header>
    </div>
  </Router>
)

render(
  <LocaleProvider locale={zhCN}>
      <App />
  
  </LocaleProvider>,
  document.getElementById('root')
)
