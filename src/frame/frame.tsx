import React, {Component} from 'react'
import { Layout, Menu, Breadcrumb, Icon, Button, Spin, Avatar, Dropdown} from 'antd';

import {NavLink} from 'react-router-dom'
import {observer, inject} from 'mobx-react'
import {observable, action} from 'mobx'

import './frame.less'
import { write } from 'fs';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

@inject("globalStore")
@observer
 export default class Frame extends Component<any, any> {
  @observable activeKey = 'home'
  handleClickLogout = () =>{
    this.props.globalStore.logout();
  }
  componentWillMount() {
    console.log('componentWillMount');
    this.props.globalStore.loginInfo();
  }
  componentDidMount() {
    this.activeKey = window.location.pathname.split('/')[1] || 'home'
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <span onClick={this.handleClickLogout}>
            <Icon type="logout" theme="outlined" style={{marginRight: 10}} />
            退出登录
          </span>
        </Menu.Item>
      </Menu>
    )
    // 菜单设置渲染
    const menuList: any = [
      {
        title: '主页',
        route: '/home',
        icon: 'home',
        key: 'home',
        value: 0,
      }, {
        title: '用户管理',
        icon: 'user',
        key: '1',
        subMenu: [
          {
            title: '用户列表',
            route: '/user',
            key: 'user'
          },
          {
            title: '角色列表',
            route: '/role',
            key: 'role'
          }
        ]
      },
      {
        title: '系统设置',
        icon: 'setting',
        key: '2',
        subMenu: [
          {
            title: '设置',
            route: '/setting',
            key: 'setting'
          }
        ]
      },
    ]
    const {children} = this.props
    if(this.props.globalStore.userInfo) {
      return(
        <Layout style={{height: '100%'}}>
          <Header className="header">
            <div className="logo" style={{color: "white"}}>数澜科技</div>
            <div style={{float: 'right', color: '#ffffff'}}>
              {
                  this.props.globalStore.userInfo.avatar ? (<img
                    className="mr8"
                    src={this.props.globalStore.userInfo.avatar}
                    style={{width: 30, height: 30, borderRadius: '50%'}}
                  />) : <Avatar
                    style={{verticalAlign: 'middle'}}
                    icon='user'
                  />
                }
                <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link">
                    {this.props.globalStore.userInfo.nickname}
                    <Icon type="down" />
                  </a>
                </Dropdown>
            </div>
          </Header>
          <Layout  style={{height: '100%'}}>
            <Sider width={200} style={{ background: '#fff' ,height: '100%'}}>
              <Menu
                style={{height: '100%'}}
                mode="inline"
                defaultSelectedKeys={[this.activeKey]}
                defaultOpenKeys={['1','2']}
              >
                {
                  menuList.map((item: any) => {
                    if(item.subMenu) {
                      return (
                        <SubMenu
                          key={item.key}
                          title={
                            <span>
                              {item.icon && <Icon type={item.icon} />}
                              {item.title}
                            </span>
                          }
                        >
                          {item.subMenu.map((item2: any) => {
                            return (
                              <Menu.Item key={item2.key}>
                                {item2.icon && <Icon type={item2.icon} />}
                                <NavLink exact to={item2.route} style={{display: "inline-block"}}>{item2.title}</NavLink>
                              </Menu.Item>
                            )
                          })}
                          
                        </SubMenu>
                      )
                    } else {
                      return(
                        <Menu.Item key={item.key}>
                          <Icon type={item.icon} />
                          <NavLink exact to={item.route} style={{display: "inline-block"}}>{item.title}</NavLink>
                        </Menu.Item>
                      )
                    } 
                  })
                }
              </Menu>
            </Sider>
            <Layout>
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
