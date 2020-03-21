export default {
  dev: {
    '/api': {
      target: 'http://xx.com',
      changeOrigin: true,
    },
  },
  test: {
    '/api': {
      target: 'http://xx.cn',
      changeOrigin: true,
      bypass: (req: any) => {
        req.headers.referer = 'xx.cn';
        req.headers.host = 'xx.cn';
      },
    },
  },
};
