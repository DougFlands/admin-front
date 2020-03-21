import { Request, Response } from 'express';
import resData from './format'

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'POST /api/user/signin': (req: Request, res: Response) => {
    const { password, username } = req.body;
    if (password === '123' && username === '123') {
      res.send(resData(0, '', {
        Token: "446b016c6ff19b7d50a4011079131c065e5f5ff3",
        Username: "admin",
      }));
      return;
    }
    res.send({
      status: 'error',
    });
  },
  'POST /api/user/info': (req: Request, res: Response) => {
    const { username } = req.body;
    const { token } = req.query;
    if (username === '123' && token === '123') {
      res.send(resData(0, '', {
        name: username,
        authType: 'admin',

        AuthType: "admin",
        SignupAt: "2019-12-26 10:36:59",
        Username: "admin",
      }));
      return;
    }

    res.send(resData());
  },
  'POST /api/user/signup': (req: Request, res: Response) => {
    res.send(resData(0, '', {}));
  },
};
