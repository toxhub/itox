import React, {Component} from 'react'
import { Layout, Menu, Breadcrumb, Icon, Button, Spin} from 'antd';

import {NavLink} from 'react-router-dom'
import {observer, inject} from 'mobx-react'

import './frame.less'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

@inject("globalStore")
@observer
 export default class Frame extends Component<any, any> {
  handleClickLogout = () =>{
    this.props.globalStore.logout();
  }
  componentWillMount() {
    console.log('componentWillMount');
    this.props.globalStore.loginInfo();
  }
  render() {
    const {children} = this.props
    if(this.props.globalStore.userInfo) {
      return(
        <Layout>
          <Header className="header">
            <div className="logo" />
            <div style={{float: 'right', color: '#ffffff'}}>
                <Icon type="user"/> {this.props.globalStore.userInfo.nickname}<Button onClick={this.handleClickLogout} type="primary" size="small" style={{marginLeft: '10px', fontSize: '12px'}}>登出</Button>
              </div>
          </Header>
          <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="user" />
                      用户管理
                    </span>
                  }
                >
                  <Menu.Item key="1"><NavLink exact to="/user">用户列表</NavLink></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content>
                {children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      )
    }
    return (<div style={{textAlign: 'center'}}> <Spin /></div>);
  }
 }
