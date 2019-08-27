import * as React from 'react'
import {observer, inject} from 'mobx-react'
import {observable, toJS, action} from 'mobx'
import {Button, Input, Select, Table, Modal, Tooltip} from 'antd'
import DocManageStore from './store-doc-manage'

const {Search} = Input
const {confirm} = Modal
const {Option} = Select


@inject("globalStore")
@observer
export default class DocMange extends React.Component<any, any> {
  public store = new DocManageStore();
  public columns = [
    {title: '文档类型名称', dataIndex: 'typeName', key: 'typeName'},
    {
      title: '文档类型描述', dataIndex: 'typeDesc', key: 'typeDesc',
      render: (text: string) => {
        return text.length > 15 ? (
          <Tooltip title={text}>
            <span style={{cursor: 'pointer'}}>{text.slice(0, 15) + '....'}</span>
          </Tooltip>
        ) : text
      },
    },
    {
      title: '创建人', dataIndex: 'creator', key: 'leader_list',
      render: (text, record) => {
        let str = ''
        const list = text || []
        list.forEach((item:any) => {
          str += `${item.account_name}(${item.account_code})、`
        })
        return _.trim(str, '、')
      },
    },
    {title: '接入类型', dataIndex: 'importType', key: 'importType', width: 100, render: text => text || '--'},
    {
      title: '解析类型', dataIndex: 'decodeType', key: 'decodeType', width: 120,
      render: text => text || '系统初始化',
    },
    {
      title: '应用类型', dataIndex: 'appType', key: 'appType',
      render: text => getFormatTime(text, 'YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '文档数量', dataIndex: 'num', key: 'num',
      render: text => getFormatTime(text, 'YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '是否启用', dataIndex: 'enabled', key: 'enabled',
      render: text => getFormatTime(text, 'YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      width: 80,
      render: (txt, record) => (
        <div className="FBH">
          <a className="mr8" onClick={() => this.handleEdit(record)}>编辑</a>
          <a className="mr8" onClick={() => this.handleDelete(record)}>删除</a>
        </div>
      ),
    },
  ]
  UNSAFE_componentWillMount() {
   this.store.getDocTypes();
  }
  componentDidMount() {
    this.props.globalStore.frameChange(
      [
        {url: '/doc/manage', text: ' 文档中心'},
        {url: '', text: ' 文档类型管理'},
      ], 
      'document'
    )
    window.document.title = '文档智能管理平台 - 文档类型管理'
  }
  render() {
    const {store} = this
    const searchProps = {
      placeholder: '请输入项目关键字搜索',
      onSearch: value => this.updateSearch([{key: 'keyword', value}]),
      style: {width: 280, marginRight: 12},
      size: "small"
    }
    const filters = toJS(store.filters);
    const {
      totalCount,
      page,
      pageSize,
    } = store.searchOptions

    const {
      decodeType,
      importType,
      appType,
    } = store.filter

    const tableProps = {
      columns: this.columns,
      dataSource: store.groupList,
      loading: store.isLoading,
      pagination: {
        showTotal: total => `共${total}条`,
        total: +totalCount,
        current: +page,
        pageSize: +pageSize,
        onChange: action(currentPage => {
          this.updateSearch([{key: 'page', value: currentPage}])
        }),
        onShowSizeChange: action((current, size) => {
          this.updateSearch([{key: 'pageSize', value: size}])
        }),
      },
    }
    return (
      <div className="page-doc-manage FBV">
        <div className="fc8 fs16 mb16 bold">文档类型管理</div>
        <div className="FBH mb8">
          <div>
            <span>接入类型：</span>
            <Select
              size="small"
              className="filter mr8"
              value={importType}
              placeholder="全部"
              allowClear
              onChange={val => store.changeFilter(val, 'importType')}
              getPopupContainer={() => document.getElementsByClassName('filter')[0]}
            >
              {filters.importType.map((item, index) => <Option key={index} value={item.value || item.name}>{item.name}</Option>)}
            </Select>
          </div>
          <div className="ml8">
            <span>解析类型:</span>
            <Select
              size="small"
              className="filter mr8"
              value={decodeType}
              placeholder="全部"
              allowClear
              onChange={val => store.changeFilter(val, 'decodeType')}
              getPopupContainer={() => document.getElementsByClassName('filter')[0]}
            >
              {this.store.filters.decodeType.map((item, index) => <Option key={item.value} value={item.value || item.name}>{item.name}</Option>)}
            </Select>
          </div>
          <div className="ml8">
            <span>应用类型:</span>
            <Select
              size="small"
              className="filter mr8"
              value={appType}
              placeholder="全部"
              allowClear
              onChange={val => store.changeFilter(val, 'appType')}
              getPopupContainer={() => document.getElementsByClassName('filter')[0]}
            >
              {this.store.filters.appType.map((item, index) => <Option  key={item.value} value={item.value || item.name}>{item.name}</Option>)}
            </Select>
          </div>
          <Search size="small" className="mla" {...searchProps} />
        </div>
        <Table {...tableProps} />
      </div>
    )
  }
}