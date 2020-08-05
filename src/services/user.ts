import { request } from 'umi';

export interface LoginParamsType {
  username: string;
  password: string;
}

export async function login(params: LoginParamsType) {
  return request('/api/user/signin', {
    method: 'POST',
    data: params,
  });
}

export interface RegParamsType {
  username: string;
  password: string;
}

export async function registered(params: RegParamsType) {
  return request('/api/user/signup', {
    method: 'POST',
    data: params,
  });
}

export interface InfoParamsType {
  username: string;
}

export async function info(params: InfoParamsType) {
  return request('/api/user/info', {
    method: 'POST',
    data: params,
  });
}