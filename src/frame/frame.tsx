import React, {Component} from 'react'
import {Layout, Menu, Spin, Dropdown, Icon} from 'antd';
import {observer, inject} from 'mobx-react'
import {withRouter, Link} from 'react-router-dom'
import {config, log} from "../common/utils";

const { Header, Sider, Content, Footer } = Layout

import logo from '../assets/svg/logo.svg'
import '../icon'

@inject("globalStore")
@observer
class Frame extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      collapsed: false,
      selectedKeys: ['home']
    }
  }

  UNSAFE_componentWillMount() {
    log('Frame componentWillMount');
    this.props.globalStore.loginInfo();
    log('Frame props', this.props);
    const {location} = this.props;
    const nameArray = location.pathname.split("/")
    this.setState({
      selectedKeys: [nameArray[nameArray.length -1]],
    })
  }
  logout = () => {
    this.props.globalStore.logout();
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  render() {
    const {userInfo} = this.props.globalStore
    const {children} = this.props
    if(userInfo) {
      return (
        <Layout className="frame">
          <Header className="FBH FBAC" style={{ background: '#fff', padding: 0 }}>
            <div className="frame-logo p10">
              <img src={logo} className="w100 h100" />
            </div>

            <div className="FB1 FBH FBAC FBJB">
              <div className="fs26 fw500">
                前端渲染服务管理
              </div>
              <Menu
                mode="horizontal"
                defaultSelectedKeys={this.state.selectedKeys}
                style={{ lineHeight: '64px' }}
                className="FB1 ml10"
              >
                <Menu.Item key="home"><Link to={`${config.pathPrefix}/home`}>首页</Link></Menu.Item>
                <Menu.Item key="about"><Link to={`${config.pathPrefix}/about`}>说明</Link></Menu.Item>
                <Menu.Item key="plugin"><Link to={`${config.pathPrefix}/plugin`}>插件</Link></Menu.Item>
              </Menu>
            </div>
            <div>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item className="mt0 mb0 pt4 pb4" onClick={this.logout}>退出登录</Menu.Item>
                  </Menu>
                }
                trigger={['click']}
              >
                <div className="FBH FBAC FBJE pr20 hand">
                  <div className="ml8">{userInfo.nickname} <Icon type="down" /></div>
                </div>
              </Dropdown>
            </div>
          </Header>
          <Content className="p10">
            {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <div>Copyright 2016-2020 Trends Online CO,LTD. All Rights Reserved.</div>
            <div>杭州数澜科技有限公司</div>
          </Footer>
        </Layout>
      )
    }
    return (<div style={{textAlign: 'center'}}> <Spin /></div>);
  }
}
export default withRouter(Frame)
