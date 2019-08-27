import * as React from 'react'
import {observer, inject} from 'mobx-react'
import {observable, toJS, action} from 'mobx'

@inject("globalStore")
@observer
export default class OrgGroup extends React.Component<any, any> {
  componentDidMount() {
    this.props.globalStore.frameChange(
      [
        {url: '/organization/member', text: ' 用户管理'},
        {url: '', text: ' 项目组管理'},
      ], 
      'organize'
    )
  }
  render() {
    return (
        <div>
            <h1>OrgGroup</h1>
        </div>
    );
  }
}