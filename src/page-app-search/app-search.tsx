import * as React from 'react'
import {observer, inject} from 'mobx-react'
import {observable, toJS, action} from 'mobx'
import {Input, Select, Button} from 'antd'
const {Option} = Select

const {Search} = Input

const docType = [
  {title: '全部', key: 'all'},

  {title: '项目动态', key: 'project_news'},
  // {title: '项目文件', key: 'project_file'},
  {title: '参考资料', key: 'reference'},
  {title: '工作简报', key: 'work_brief_report'},

  {title: '方案文档', key: 'solution_doc'},

  {title: '知识产权', key: 'intellectual_property'},
]


@inject("globalStore")
@observer
export default class AppSearch extends React.Component<any, any> {
  componentDidMount() {
    this.props.globalStore.frameChange(
      [
        {url: '/app/search', text: ' 应用管理'},
        {url: '', text: ' 文档搜索'},
      ], 
      'service_center'
    )
  }
  @action.bound handleSearch(searchKey) {
    const {location, history} = this.props
    const search = new URLSearchParams(location.search)
    this.searchKey = searchKey

    search.set('keyword', searchKey)
    search.set('page', 1)
    store.searchOptions.keyword = searchKey
    store.searchOptions.page = 1
    history.push(`/doc/search?${search.toString()}`)
    if (location.pathname.includes('/doc/search')) {
      return store.getSearchList()
    }
  }

  @action.bound handleChange(e) {
    this.searchKey = e.target.value
  }
  render() {
    const searchProps = {
      placeholder: '输入搜索关键词',
      enterButton: '检索',
      size: 'large',
      style: {width: '80%', border: "2px solid blue"}
    }
    const selectBefore = (
      <Select defaultValue="Http://" style={{ width: 150, paddingLeft: 50 }}>
        <Option value="Http://">Http://</Option>
        <Option value="Https://">Https://</Option>
      </Select>
    );
    const selectAfter = (
      <div style={{width:200, background: 'blue'}}>Primary</div>
    );
    return (
        <div className="page-app-search FBV">
            <div className="search-header FBH">
              <div className="FBV">
    
                搜索主页
              </div>
            </div>
            <div className="search-main">

            </div>
           
        </div>
    );
  }
}