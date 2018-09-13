import React, {Component} from 'react';
import {inject, observer} from "mobx-react";

@inject("store")
@observer
class News extends Component {
  render() {
    return (
      <div>
        <h2>news{this.props.store.baseStore.text}</h2>
      </div>
    )
  }
}
export default News;
