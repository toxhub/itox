import React, {Component} from 'react';
import { Form, Icon, Input, Button } from 'antd';
import {inject, observer} from "mobx-react";

const FormItem = Form.Item;

@inject("store")
@observer
class NormalLoginForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.store.baseStore.login(values.account, values.password);
      } else {
        console.log(err)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{    position: 'absolute',
        width: '500px',
        height: '500px',
        top: '40%',
        left: '50%',
        'marginTop': '-200px',
        'marginLeft':'-250px',
        'zIndex': 3}}>
      <Form onSubmit={this.handleSubmit} className="login-form">
        {this.props.store.baseStore.text}{this.props.store.baseStore.flag}
        <FormItem>
          {getFieldDecorator('account', {
            rules: [{ required: true, message: '请输入账号' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}
const WrappedHorizontalLoginForm = Form.create()(NormalLoginForm);
export default WrappedHorizontalLoginForm;