import { Request, Response } from 'express';
import resData from './format'



export default {
  'POST /api/file/query': (req: Request, res: Response) => {
    res.send(resData(0, '', {
      list: [
        {
          FileHash: 'string',
          FileName: 'string',
          FileSize: 'string',
          UploadAt: 'string',
          LastUpdated: 'string',
        },
        {
          FileHash: 'string',
          FileName: 'string',
          FileSize: 'string',
          UploadAt: 'string',
          LastUpdated: 'string',
        },
      ]
    }));
  },
  'POST /api/file/downloadurl': (req: Request, res: Response) => {
    res.send(resData(0, '', {
      url: 'https://www.baidu.com'
    }));
  },
  'POST /api/file/rename': (req: Request, res: Response) => {
    res.send(resData(0, '', {}));
  },

}