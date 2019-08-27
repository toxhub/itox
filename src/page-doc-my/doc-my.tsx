import * as React from 'react'
import {observer, inject} from 'mobx-react'
import {observable, toJS, action} from 'mobx'

@inject("globalStore")
@observer
export default class DocMy extends React.Component<any, any> {
  componentDidMount() {
    this.props.globalStore.frameChange(
      [
        {url: '/doc/manage', text: ' 文档中心'},
        {url: '', text: ' 我的文档库'},
      ], 
      'document'
    )
  }
  render() {
    return (
        <div>
            <h1>Doc My</h1>
        </div>
    );
  }
}