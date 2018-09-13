import React from "react";
import {render} from "react-dom";

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom'
import "@babel/polyfill";
import {Provider} from 'mobx-react'
import * as stores from './store'

// import Home from './page-home/home'
import News from './page-news/news'
import asyncComponent from './common/AsyncComponent';
const Home = asyncComponent(() => import("./page-home/home"));
import Login from './page-login/login'
const App = () => (
  <Router>
    <div>
      <header>
        <nav>
          <ul>
            <li><NavLink exact to="/">首页</NavLink></li>
            <li><NavLink to="/news">新闻</NavLink></li>
            <li><NavLink to='/login'>登录</NavLink></li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/news" component={News}/>
        <Route path="/login" component={Login}/>
        <Route path="/home" component={Home}/>
      </Switch>
    </div>
  </Router>
)

render(
  <Provider store = {stores}>
    <App />
  </Provider>,
  document.getElementById('root')
)