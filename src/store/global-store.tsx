import { observable, action, computed, runInAction} from 'mobx';
import io from '../io';
import history from '../common/history'

export class GlobalStore {

  @observable userInfo: any = null;
  @observable sideList = [{
    url: '/',
    code: 'document',
    name: '文档中心',
    children: [
      {name: '文档类型管理', url: '/doc/manage', code: 'doc_manage', authCode: 'search_doc', authValue: 1},
      {name: '我的文档库', url: '/doc/my', code: 'doc_my', authCode: 'check_record', authValue: 1},
    ],
  }, {
    url: '/app',
    code: 'service_center',
    name: '我的应用',
    children: [
      {name: '文档搜索', url: '/app/search', code: 'app_search', authCode: 'search_doc', authValue: 1},
    ],
  }, {
    url: '/organization',
    code: 'organize',
    name: '用户管理',
    children: [
      // {name: '部门管理', url: '/organization/department', code: 'department'},
      {name: '账户管理', url: '/organization/member', code: 'member', authCode: 'accounts', authValue: 1},
      {name: '角色管理', url: '/organization/role', code: 'role', authCode: 'role_manage', authValue: 1},
      {name: '项目组管理', url: '/organization/group', code: 'group', authCode: 'group_manage', authValue: 1},
    ],
  }]
  @observable system = ''
  @observable frameInfo = {}
  // 面包屑
  @observable navList = []
  // 右边菜单栏是否关闭
  @observable collapsed = window.localStorage.collapsed !== 'false'

  @observable subMenuObj: any = {}
  @action
  async login (account:string, password:string)  {
    const {success, content} = await io.auth.login({
      body: {
        account,
        password
      },
    })
    if (success) {
      runInAction(() => {
        this.userInfo = content
      })
    }
    return success;
  }
  @action
  async loginInfo() {
    if (this.userInfo) return;
    const {success, content} = await io.auth.loginInfo({showError: false})
    if (success) {
      runInAction(() => {
        this.userInfo = content
      })
    } else {
      history.push('/login')
    }
  }
  @action
  async logout() {
    history.push('/login')
    runInAction(() => {
      this.userInfo = null
    })
  }
  // 外部调用的方法，可更新产品列表或者导航面包屑 和当前的system
  @action.bound frameChange(list: any, system = '') {
    this.navList = list || []
    if (system) {
      this.system = system;
    }
  }
    // 收起展开操作
  @action changeCollapsed = () => {
    const newCollapsed = !this.collapsed
    window.localStorage.collapsed = `${newCollapsed}`
    this.collapsed = newCollapsed
  }
  @action mouseEnterParent(e: any, parent:any, index: number) {
    const target = e.currentTarget
    const subMenuObj: any = {
      parent,
      mouse: '',
      code: parent.code,
      index,
      style: {
        left: target.offsetWidth,
        top: target.offsetTop - target.parentElement.scrollTop,
      },
    }
    if (e.clientY > (document.body.clientHeight / 2)) {
      subMenuObj.style.top = 'auto'
      subMenuObj.style.bottom = target.parentElement.parentElement.clientHeight - target.offsetTop - target.clientHeight + target.parentElement.scrollTop
    }
    this.subMenuObj = subMenuObj
  }
    // 鼠标移开产品列表
  @action mouseLeaveProduct() {
    this.subMenuObj.mouse = 'leave'
    setTimeout(action(() => {
      if (this.subMenuObj.mouse === 'leave') {
        this.subMenuObj = {}
      }
    }), 200)
  }
    // 鼠标指向二级菜单
  @action mouseEnterProductItems() {
    if (this.subMenuObj.mouse === 'leave') {
      this.subMenuObj.mouse = ''
    }
  }
}
export default new GlobalStore();
