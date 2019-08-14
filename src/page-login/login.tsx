import React, {Component} from 'react';
import { Form, Icon, Input, Button } from 'antd';
import {inject, observer} from "mobx-react";
import './login.css';
import { any } from 'prop-types';
const FormItem = Form.Item;

@inject("globalStore")
@observer
class NormalLoginForm extends Component<any, any> {
  handleSubmit = (e:any) => {
    e.preventDefault();
    this.props.form.validateFields(async (err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log('this.props', this.props)
        const success = await this.props.globalStore.login(values.account, values.password);
        if (success) {
          this.props.history.push('/home')
        }
      } else {
        console.log(err)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="page-login">
        <div className="container">
          <div className="login-main">
            <div style={{textAlign: "center", fontSize: '16px', marginBottom: '20px'}}>管理后台登录</div>
            <Form onSubmit={this.handleSubmit}>
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
              <FormItem>
                <Button type="primary" className="btn" htmlType="submit">登录</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
const LoginForm = Form.create()(NormalLoginForm);
export default LoginForm; 