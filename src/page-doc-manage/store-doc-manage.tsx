import {observable, action, runInAction, computed} from 'mobx'
import {message} from 'antd'
import io from '../io'

export default class DocManageStore {
  constructor() {}
  @observable isLoading = false
  @observable filters = {
    decodeType: [
      {
        name: '人工打标',
        value: 'manual'
      },
      {
        name: '算法解析',
        value: 'algorithm'
      },
    ],
    importType: [
      {
        name: '文档上传',
        vale: 'upload'
      }
    ],
    appType: [
      {
        name: '搜索应用',
        value: 'search'
      }
    ]
  };
  @observable filter = { // 筛选条件
    decodeType: undefined, // 项目阶段
    importType: undefined, // 项目类型
    appType: undefined, // 项目状态
    search: undefined, // 项目名称或编号
  }
  @observable searchOptions = {
    type: '',
    keyword: '',
    sort: '',
    order: '',
    page: 1,
    pageSize: 10,
    totalCount: 0,
  }
  @observable visible = {
    add: false,
    edit: false,
  }

  @action async getDocTypes() {
    
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
    

  }
  // 修改当前的筛选项
  @action changeFilter(val, type) {
    this.filter[type] = val
  }

}

