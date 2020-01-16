import * as React from 'react';
import { List, Card, Input, Modal, Button} from 'antd';
import {observer, inject} from "mobx-react";
import {action, toJS} from "mobx";
import classNames from 'classnames';
import {config, log, warningTip} from "../../common/utils";
const {Search} = Input

import {CodeBoxRead, CodeBoxEdit} from '../../components/component-code-box';
import './home.styl'

@inject("globalStore")
@observer
export default class Home extends React.Component<any, any> {
  state = {
    readVisible: false,
    editVisible: false,
    appConfig: {
      config: {},
      key: ''
    },
    value: '',
    title: '',
    add: false
  };
  UNSAFE_componentWillMount() {
    this.props.globalStore.getList();
  }
  actionView = (key: string) => {
    const {appConfigList} = this.props.globalStore;
    let appConfig = appConfigList.find((config: any) => {
      return key == config.key
    })
    if (!appConfig) return warningTip('配置未找到');
    this.setState({
      readVisible: true,
      appConfig: appConfig
    })
  }
  actionDelete = (key: string) => {
    log('actionDelete key', key);
    const {appConfigList} = this.props.globalStore;
    let appConfig = appConfigList.find((config: any) => {
      return key == config.key
    })
    if (!appConfig) return warningTip('配置未找到');
    if(!(appConfig.permission & 8)) return;
    Modal.confirm({
      title: `删除配置 (${key})`,
      content: `确认删除该配置: ${appConfig.config.name}`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.props.globalStore.delete(appConfig.key)
      }
    });
  }
  /**
   *  // 复制 cope编辑 edit 新建 add
   * @param {string} type
   * @param key
   */
  actionChange = (type = 'edit', key: any,) => {
    const {userInfo} = this.props.globalStore;
    if ((type != 'edit' && !(userInfo.permission & 2)) ) return;
    const {appConfigList} = this.props.globalStore;
    let title = '新建';
    let appConfig = {config : {}};
    if (type !== 'add') {
      appConfig = appConfigList.find((config: any) => {
        return key == config.key
      })
      if (!appConfig) return warningTip('配置未找到');
      if(type == 'edit' && !(appConfig.permission & 4)) return;
    }
    let add = true;
    if (type == 'edit') {
      title = `编辑--${appConfig.config.name} (${key})`;
      add = false;
    }
    this.setState({
      editVisible: true,
      appConfig: appConfig,
      title,
      value: JSON.stringify(toJS(appConfig.config)),
      add
    })
  }
  handleSave = (e: any ) => {
    try {
      log('home this.state.value', this.state.value)
      let value = JSON.parse(this.state.value);
      log('home value',value)
      if (!value.name || !value.description) {
        return warningTip('配置填写不规范');
      }
      if (this.state.add) {
        this.props.globalStore.add(value);
      } else {
        this.props.globalStore.edit(this.state.appConfig.key, value);
      }
      this.setState({
        editVisible: false,
      });
    } catch (e) {
      warningTip('配置填写不规范' + e.message);
    }
  };

  handleCancel = (e: any ) => {
    this.setState({
      readVisible: false,
      editVisible: false
    });
  };
  handleGetAppConfig = (value: any)=> {
    if (value) {
      this.setState({
        value
      });
    }
  }
  handleFiliter = (e: any) => {
    this.props.globalStore.setFilterWord(e.target.value)
  }
  render() {
    log('xxx', toJS(this.state.appConfig.config))
    const {userInfo} = this.props.globalStore;
    const {configList: appConfigList} = this.props.globalStore;
    return (
      <div className='home'>
        <div style={{height: 32, marginBottom: 8}}>
          <Search
            placeholder="请输入关键字"
            style={{width: 200}}
            className="fr"
            onChange={this.handleFiliter}
          />
          <Button type="primary" className="fr mr10" onClick={() => {this.actionChange('add', '')}}>新建</Button>
          <Button type="primary" className="fr mr10" onClick={() => {this.props.globalStore.getList(true)}}>刷新</Button>
        </div>
        <List
          grid={{
            gutter: 16,
            xs: 2,
            md: 4,
            xxl: 4,
          }}
          dataSource={appConfigList}
          renderItem={(item: any) => (
            <List.Item>
              <Card
                title={`${item.config.name} `}
                actions={[
                  <a onClick={() => this.actionView(item.key)} >查看</a>,
                  <a onClick={() => this.actionChange('cope', item.key)} className={classNames({actionDisable: !(userInfo.permission & 2)})}>复制</a>,
                  <a onClick={() => this.actionChange('edit', item.key)} className={classNames({actionDisable: !(item.permission & 4)})}>编辑</a>,
                  <a onClick={() => this.actionDelete(item.key)} className={classNames({actionDisable: !(item.permission & 8)})}>删除</a>
                ]}
              >
                <p>配置标识: {item.key}</p>
                <p>{item.config.description}</p>
              </Card>
            </List.Item>
          )}
        />
        <Modal
          visible={this.state.readVisible}
          onCancel={this.handleCancel}
          onOk={this.handleCancel}
          width={700}
        >
          {this.state.readVisible ? <CodeBoxRead value={toJS(this.state.appConfig.config)} /> : ''}
        </Modal>
        <Modal
          title={this.state.title}
          visible={this.state.editVisible}
          onOk={this.handleSave}
          onCancel={this.handleCancel}
          maskClosable={false}
          width={700}
        >
          {this.state.editVisible ?  <CodeBoxEdit value={toJS(this.state.appConfig.config)} onChange={this.handleGetAppConfig} /> : ''}
        </Modal>
      </div>
    );
  }
}
