import * as React from 'react'
import {observer, inject} from 'mobx-react'
import {observable, toJS, action} from 'mobx'

@inject("globalStore")
@observer
export default class OrgRole extends React.Component<any, any> {
  componentDidMount() {
    this.props.globalStore.frameChange(
      [
        {url: '/organization/member', text: ' 用户管理'},
        {url: '', text: ' 角色管理'},
      ], 
      'organize'
    )
  }
  render() {
    return (
        <div>
            <h1>OrgRole</h1>
        </div>
    );
  }
}