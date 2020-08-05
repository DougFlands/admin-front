import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { ConnectState } from '@/models/connect';
import { UserModelState } from '@/models/user';
import { connect, Dispatch } from 'umi';
import { Form, Input, Checkbox, Button } from 'antd';
import React, { useState } from 'react';
import logo from '@/assets/logo.png';
import styles from './style.less';

interface LoginProps {
  dispatch: Dispatch;
  userModel: UserModelState;
  submitting?: boolean;
}


const Login: React.FC<LoginProps> = (props) => {
  const [autoLogin, setAutoLogin] = useState(true);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const { dispatch } = props;
    try {
      const values = await form.validateFields();
      await dispatch({
        type: 'user/login',
        payload: {
          ...values,
          autoLogin
        },
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }

  }

  const { submitting } = props;

  return (
    <div className={styles.container}>

      <div className={styles.top}>
        <div className={styles.header}>
          <img alt="logo" className={styles.logo} src={logo} />
          <span className={styles.title}>ADMIN</span>
        </div>
      </div>

      <div className={styles.main}>
        <Form
          className={styles.loginForm}
          onFinish={handleSubmit}
          form={form}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="请输入用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="请输入密码"
              onPressEnter={e => {
                e.preventDefault();
                handleSubmit()
              }}
            />
          </Form.Item>

          <div>
            <Checkbox checked={autoLogin} onChange={e => setAutoLogin(e.target.checked)}>
              自动登录
          </Checkbox>
          </div>

          <Form.Item>
            <Button
              size="large"
              loading={submitting}
              className={styles.submit}
              type="primary"
              htmlType="submit">登录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}


export default connect(({ user, loading }: ConnectState) => ({
  userModel: user,
  submitting: loading.effects['user/login'],
}))(Login);
