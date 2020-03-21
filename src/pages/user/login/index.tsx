import { ConnectState } from '@/models/connect';
import { UserModelState } from '@/models/user';
import { LoginParamsType, } from '@/services/user';
import { Form, Input, Icon, Checkbox, Button } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import React, { Component } from 'react';
import { AnyAction, Dispatch } from 'redux';
import styles from './style.less';

interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  userModel: UserModelState;
  submitting?: boolean;
  form: FormComponentProps['form'],
}
interface LoginState {
  autoLogin: boolean
}

class Login extends Component<LoginProps, LoginState> {

  state: LoginState = {
    autoLogin: true,
  }

  changeAutoLogin = (e: CheckboxChangeEvent) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (err: unknown, values: LoginParamsType) => {
    const { autoLogin } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'user/login',
        payload: {
          ...values,
          autoLogin
        },
      })
    }
  }

  render() {
    const { submitting } = this.props;
    const { autoLogin } = this.state;
    if (!this.props.form) {
      return null;
    }
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.main}>
        <Form className={styles.loginForm}>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "请输入用户名!" }]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="请输入用户名"
              />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码!" }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="请输入密码"
                onPressEnter={e => {
                  e.preventDefault();
                  this.props.form.validateFields(this.handleSubmit);
                }}
              />
            )}
          </Form.Item>

          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
          </div>

          <Form.Item>
            <Button size="large" loading={submitting} className={styles.submit} type="primary"
              onClick={() => {
                this.props.form.validateFields(this.handleSubmit);
              }}  >登录</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const LoginForm = Form.create()(Login);

export default connect(({ user, loading }: ConnectState) => ({
  userModel: user,
  submitting: loading.effects['user/login'],
}))(LoginForm);
