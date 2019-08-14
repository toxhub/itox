import { observable, action, computed, runInAction} from 'mobx';
import io from '../io';
import history from '../common/history'

export class GlobalStore {

  @observable userInfo: any = null;

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
}
export default new GlobalStore();
