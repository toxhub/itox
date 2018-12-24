import {
  observable, action, computed, runInAction,
} from 'mobx'

class BaseStore {
  @observable text;
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
  login = (account, password) => {
    console.log(account, password)

    /* fetch('').then(
      action('fetchRes', res => {
        return res.json()
      })).then(
      action('fetchSuccess', data => {
        this.detail = data.query.results.json;
      })).catch(
      action('fetchError', e => {
        console.log(e.message)
      })) */
    fetch('/api/admins/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account,
        password: md5(password),
      }),
    })
      .then(res => {
        if (res.ok) {
          // this.isLogin = true;
          runInAction(() => {
            this.isLogin = true
          })
          return res.json()
        }
        return 'wu'
      })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  @action
  plus = () => {
    this.num = ++this.num
  }

  @action minus = () => {
    this.num = --this.num
  }
}

const baseStore = new BaseStore()

export default baseStore
