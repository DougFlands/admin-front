export default {
  dev: {
    '/api/user': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
    '/api/file': {
      target: 'http://localhost:8081',
      changeOrigin: true,
    },
  },
  test: {
    '/api': {
      target: 'https://xx.cn',
      changeOrigin: true,
      bypass: (req: any) => {
        req.headers.referer = 'xx.cn';
        req.headers.host = 'xx.cn';
      },
    },
  },
};
