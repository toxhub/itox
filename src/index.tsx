import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {LocaleProvider, DatePicker} from 'antd'
import zh_CN from 'antd/es/locale-provider/zh_CN';
import '@babel/polyfill'

import 'antd/dist/antd.less'; 

import './common/common.less'
import './index.css'



ReactDOM.render(
  <LocaleProvider locale={zh_CN}>
    <DatePicker />
  </LocaleProvider>,
  document.getElementById('root')
)
