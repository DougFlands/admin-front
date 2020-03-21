import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { ConnectState } from '@/models/connect';

import {
  Form,
  Input,
  Button,
} from "antd";
import { RegParamsType, } from '@/services/user';
import { FormComponentProps } from 'antd/es/form';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'dva';

interface RegProps {
  dispatch: Dispatch<AnyAction>;
  submitting?: boolean;
  form: FormComponentProps['form'],
}

interface RegState {
}

class RegistrationForm extends Component<RegProps, RegState> {
  state: RegState = {
  };

  handleSubmit = async (err: unknown, values: RegParamsType) => {
    if (!err) {
      const { dispatch } = this.props;
      await dispatch({
        type: 'user/signup',
        payload: {
          ...values,
        },
      })
    }
  }

  compareToFirstPassword = (rule: any, value: string, callback: Function) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("两次输入的密码不一致!");
    } else {
      callback();
    }
  };

  render() {
    const { submitting, form } = this.props
    const { getFieldDecorator } = form

    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 8 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 12,
          offset: 0
        },
        sm: {
          span: 8,
          offset: 4
        }
      }
    };

    return (
      <Form {...formItemLayout}>
        <Form.Item
          label={
            <span>
              用户名
            </span>
          }
        >
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "请输入用户名!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="密码" hasFeedback>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "请输入密码!"
              },
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="确认密码" hasFeedback>
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "请再次输入密码!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={submitting} onClick={() => {
            this.props.form.validateFields(this.handleSubmit)
          }}>
            提交注册
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = connect(
  ({ loading }: ConnectState) => ({
    submitting: loading.effects['user/signup'],
  })
)(
  Form.create({ name: "register" })(
    RegistrationForm
  )
)

export default (): React.ReactNode => (
  <PageHeaderWrapper>
    <WrappedRegistrationForm />
  </PageHeaderWrapper>
)