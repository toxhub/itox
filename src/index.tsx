import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {DatePicker} from 'antd'
import '@babel/polyfill'

import 'antd/dist/antd.less'; 

import './common/common.less'
import './index.css'



ReactDOM.render(
  <DatePicker />,
  document.getElementById('root')
)
