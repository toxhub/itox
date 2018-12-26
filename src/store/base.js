import md5 from 'md5'
import {
  observable, action, computed, runInAction,
} from 'mobx'
import io from '../common/io'

class BaseStore {
  @observable userInfo;
  @observable num;
  @observable isLogin;
  constructor() {
    this.num = 0
    this.text = 'Hello Word!'
    this.isLogin = false
  }

  @computed get flag() {
    return this.isLogin ? '登录了' : '没有登录'
  }

  @action
  login = async (account, password) => {
    console.log(account, password)
    const opts = {
      body: {
        account,
        password: md5(password),
      },
      // params: {
      //   teamId: this.teamId,
      //   bookId: this.bookId,
      // },
      // query: {
      //   id: 1
      // }
    }
    const {content} = await io.auth.dingtalkLogin(opts)
    runInAction(() => {
      this.userInfo = content
    })
  }

  @action
  plus = () => {
    this.num = this.num + 1
  }

  @action minus = () => {
    this.num = this.num - 1
  }
}

const baseStore = new BaseStore()

export default baseStore
