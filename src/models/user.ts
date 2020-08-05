import { Effect, Reducer } from 'umi';
import { getPageQuery } from '@/utils/utils';
import Cookies from 'js-cookie';
import { message } from 'antd';

import { login as apiLogin, registered as apiRegistered, info as apiInfo } from '@/services/user';

export interface UserInfo {
  name?: string;
  signupAt?: string;
  // 用户权限等级
  authType?: string;
}

export interface UserModelState {
  userInfo?: UserInfo;
  token?: string;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    login: Effect;
    signup: Effect;
    info: Effect;
    logout: Effect;
  };
  reducers: {
    saveLoginInfo: Reducer<UserModelState>;
    saveUserInfo: Reducer<UserModelState>;
  };
}

const replaceGoto = () => {
  const urlParams = new URL(window.location.href);
  const params = getPageQuery();
  let { redirect } = params as { redirect: string };
  if (redirect) {
    const redirectUrlParams = new URL(redirect);
    if (redirectUrlParams.origin === urlParams.origin) {
      redirect = redirect.substr(urlParams.origin.length);
      if (redirect.match(/^\/.*#/)) {
        redirect = redirect.substr(redirect.indexOf('#'));
      }
    } else {
      window.location.href = '/';
      return;
    }
  }
  window.location.href = urlParams.href.split(urlParams.pathname)[0] + (redirect || '/');
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    userInfo: JSON.parse(localStorage.getItem('userinfo') || '{}'),
    token: Cookies.get('token'),
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(apiLogin, payload);
      if (response?.Code === 0) {
        yield put({
          type: 'saveLoginInfo',
          payload: response.Data,
        });
        const token = response.Data.Token
        Cookies.set('token', token);
        Cookies.set('username', payload.username);
        if (payload.autoLogin) {
          Cookies.set('token', token)
        }
        yield put({
          type: 'info',
          payload: {},
        });
      }
    },

    *signup({ payload }, { call }) {
      const response = yield call(apiRegistered, payload);
      if (response?.Code === 0) {
        message.success('创建成功');
      }
    },

    *info({ payload }, { call, put }) {
      const response = yield call(apiInfo, payload);
      if (response?.Code === 0) {
        const data = {
          name: response.Data.Username,
          signupAt: response.Data.SignupAt,
          authType: response.Data.AuthType,
        };
        yield put({
          type: 'saveUserInfo',
          payload: data,
        });
        localStorage.setItem('userinfo', JSON.stringify(data));
        replaceGoto()
        return data.authType
      }
      return ''
    },

    *logout(_, { put }) {
      Cookies.remove('token');
      Cookies.remove('username');
      localStorage.removeItem('userinfo');
      yield put({
        type: 'saveLoginInfo',
        payload: {
          token: '',
        },
      });
      yield put({
        type: 'saveUserInfo',
        payload: {},
      });
    },
  },

  reducers: {
    saveLoginInfo(state, action) {
      return {
        ...state,
        token: action.payload.Token,
      };
    },
    saveUserInfo(state, action) {
      return {
        ...state,
        userInfo: action.payload || {},
      };
    },
  },
};

export default UserModel;
