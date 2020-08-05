// import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, {  } from 'react';
import { ConnectState } from '@/models/connect';

import {
  Form,
  Input,
  Button,
} from "antd";
import { Dispatch, connect } from 'umi';

interface RegProps {
  dispatch: Dispatch;
  submitting?: boolean;
}

const Registration: React.FC<RegProps> = (props) => {
  const { submitting } = props
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
  };

  const handleSubmit = async () => {
    const { dispatch } = props;
    try {
      const values = await form.validateFields();
      await dispatch({
        type: 'user/signup',
        payload: {
          ...values,
        },
      })
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }

  return (
    <Form {...layout} onFinish={handleSubmit} form={form}>
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名!' }]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: '请输入密码!' }]}
        hasFeedback>
        <Input type="password" placeholder="请输入密码" />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="确认密码"
        rules={[
          { required: true, message: '请输入密码!' },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              // eslint-disable-next-line prefer-promise-reject-errors
              return Promise.reject('两次输入的密码不一致!');
            },
          })
        ]}
        hasFeedback>
        <Input type="password" placeholder="请再次输入密码" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={submitting}>
          提交注册
        </Button>
      </Form.Item>
    </Form>
  )
}




const WrappedRegistrationForm = connect(
  ({ loading }: ConnectState) => ({
    submitting: loading.effects['user/signup'],
  })
)(Registration)

export default (): React.ReactNode => (
  // <PageHeaderWrapper>
  <WrappedRegistrationForm />
  // </PageHeaderWrapper>
)