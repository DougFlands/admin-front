// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'Ant Design Pro',
    locale: true,
    siderWidth: 208,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/home',
      name: '首页',
      icon: 'smile',
      component: './Home',
    },
    {
      path: '/admin',
      name: '管理',
      icon: 'crown',
      access: 'canAdmin',
      routes: [
        {
          path: '/admin/registered',
          component: './Admin/registered',
          name: '新用户注册',
          icon: 'smile',
        },
      ],
    },
    {
      path: '/file',
      name: '文件管理',
      icon: 'crown',
      routes: [
        {
          name: '文件列表',
          icon: 'smile',
          path: '/file/list',
          component: './file/list',
        },
        {
          name: '文件上传',
          icon: 'smile',
          path: '/file/upload',
          component: './file/upload',
        },
      ],
    },

    {
      path: '/',
      redirect: '/home',
    },
    {
      component: './404',
    },
  ],
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});