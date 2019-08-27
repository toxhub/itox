import * as React from 'react'
import {observer, inject} from 'mobx-react'
import {observable, toJS, action} from 'mobx'

@inject("globalStore")
@observer
export default class AppHome extends React.Component<any, any> {
  componentDidMount() {
    this.props.globalStore.frameChange(
      [
        {url: '/app/search', text: ' 应用管理'},
        {url: '', text: ' 文档搜索'},
      ], 
      'service_center'
    )
  }
  render() {
    return (
        <div>
            <h1>AppHome My</h1>
        </div>
    );
  }
}