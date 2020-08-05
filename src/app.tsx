import React from 'react';
import { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { notification } from 'antd';
import { history, RequestConfig, } from 'umi';
import RightContent from '@/components/RightContent';
import { ResponseError, } from 'umi-request';
import defaultSettings from '../config/defaultSettings';

export async function getInitialState(): Promise<{
  authType?: String
  settings?: LayoutSettings
}> {
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/user/login') {
    const locaUserinfo = localStorage.getItem('userinfo')
    if (locaUserinfo) {
      const { authType } = JSON.parse(locaUserinfo)
      return {
        authType,
        settings: defaultSettings,
      }
    }
    history.push('/user/login');
  }
  return {
    settings: defaultSettings,
  };
}

export const layout = ({
  initialState,
}: {
  initialState: {
    settings?: LayoutSettings
  };
}): BasicLayoutProps => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    onPageChange: () => {
      // token 校验由 errorHandler 完成
    },
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  console.log(error)
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response
};

/**
 * 配置request请求时的默认参数
 */

const ResInterceptors = async (res: any) => {
  const data = await res.clone().json()
  if (data.Code !== 0) {
    notification.error({
      message: `请求错误: ${data.Code} \n ${res.url}`,
      description: data.Msg,
    })
  }
  console.log(res)
  return res;
}

export const request: RequestConfig = {
  errorHandler,
  responseInterceptors: [ResInterceptors],
  credentials: 'include', // 默认请求是否带上cookie
  requestType: 'form',
  headers: {
    "Sec-Fetch-Mode": "no-cors"
  },
  prefix: process.env.NODE_ENV === "test" ? "http://xx.cn" : ""
};
