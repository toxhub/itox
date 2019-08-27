import React, {Component} from 'react'
import {Divider, Layout, Menu, Spin, Dropdown, Icon, Avatar} from 'antd';

import {observer, inject} from 'mobx-react'
import {observable, action, toJS} from 'mobx'
import {withRouter} from 'react-router-dom'

import Nav from './nav'
import Side from './side'

import logo from '../assets/svg/logo.svg'
import '../icon'

const {Sider, Content} = Layout

@inject("globalStore")
@observer
class Frame extends Component<any, any> {
  constructor(props: any) {
    super(props)
    console.log('props', props)
  }

  handleClickLogout = () =>{
    this.props.globalStore.logout();
  }
  UNSAFE_componentWillMount() {
    console.log('componentWillMount');
    this.props.globalStore.loginInfo();
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <span onClick={this.props.globalStore.logout}>
            <Icon type="logout" theme="outlined" style={{marginRight: 10}} />
            退出登录
          </span>
        </Menu.Item>
      </Menu>
    )
    const {children} = this.props
    if(this.props.globalStore.userInfo) {
      return (
        <div className="frame FBV">
          <div className="frame-header">
            <div className="header-container FBH FBAC">
              <div className="header-front FBH FBAC">
                <img src={logo} className="logo ml10" alt="logo"/>
                <Divider type="vertical" style={{height: 24, margin: '0 6px 0 2px'}} />
                <span className="mr16" style={{color: '#000', fontWeight: 400}}>文档智能管理平台</span>
              </div>
              <Nav
                {...this.props}
                navList={toJS(this.props.globalStore.navList)}
                frameInfo={toJS(this.props.globalStore.frameInfo)}
              />

              <div className="header-behind mla FBH FBAC FBJC pr20">
                <span className="avatar mr12">
                  {this.props.globalStore.userInfo.nickname.charAt(0)}
                </span>
                <Dropdown overlay={menu} className="mr12">
                  <span >
                    {this.props.globalStore.userInfo.nickname}
                    <Icon className="ml4" type="down" />
                  </span>
                  
                </Dropdown>
                {
                  this.props.globalStore.userInfo.avatar ? (<img
                    src={this.props.globalStore.userInfo.avatar}
                    className="avatar"
                  />) : <Avatar
                    style={{verticalAlign: 'middle'}}
                    icon='user'
                  />
                }
              </div>
            </div>
          </div>
          <div className="frame-main FBH">
            <Side 
             sideList = {this.props.globalStore.sideList}
             system={this.props.globalStore.system}
             {...this.props}
             store={this.props.globalStore}
            />
            <div className="frame-container p10" >
                {this.props.children}
            </div>
          </div>
        </div>
      )
    }
    return (<div style={{textAlign: 'center'}}> <Spin /></div>);
  }
}
export default withRouter(Frame)