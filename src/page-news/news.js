import React, {Component} from 'react';
import { DatePicker} from 'antd';
import {inject, observer} from "mobx-react";

@inject("store")
@observer
export default class News extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <div>
        <h2>News</h2>
        <DatePicker />
      </div>
    )
  }
}