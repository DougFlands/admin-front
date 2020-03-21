import { Reducer } from 'redux';

import { Effect } from 'dva';
import { ListItemDataType } from '@/pages/file/list/data';
import { 
  getFileList as apiGetFileList, 
  downloadFile as apiDownloadFile, 
  renameFile as apiRenameFile, 
  deleteFile as apiDeleteFile } from '@/services/file'
import {message} from 'antd'

export interface StateType {
  list: ListItemDataType[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    getList: Effect;
    getDownLoadUrl: Effect;
    renameFile: Effect;
    deleteFile: Effect;
  };
  reducers: {
    saveList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'fileList',

  state: {
    list: [],
  },

  effects: {
    *getList({ payload }, { call, put }) {
      const response = yield call(apiGetFileList, payload);
      if (response?.Code === 0) {
        response.Data.list.forEach((item: ListItemDataType) => {
          item.FileSize = Math.round(item.FileSize/1024*100)/100
        });
        yield put({
          type: 'saveList',
          payload: response.Data,
        });
      }
    },
    *getDownLoadUrl({ payload }, { call }) {
      const response = yield call(apiDownloadFile, payload)
      if (response?.Code === 0) {
        const elemIF = document.createElement("iframe");
        elemIF.src = response.Data.url;
        elemIF.style.display = "none";
        document.body.appendChild(elemIF);
      }
    },
    *renameFile({ payload }, { call, put }) {
      const response = yield call(apiRenameFile, payload)
      if (response?.Code === 0) {
        message.success('重命名成功')
        yield put({
          type: 'getList',
          payload: {
            limit: 20,
          },
        });
      }
    },

    *deleteFile({ payload }, { call, put }) {
      const response = yield call(apiDeleteFile, payload)
      if (response?.Code === 0) {
        message.success('删除成功')
        yield put({
          type: 'getList',
          payload: {
            limit: 20,
          },
        });
      }
    },

  },

  reducers: {
    saveList(state, action) {
      return {
        ...state,
        list: action.payload.list,
      };
    },
  },
};

export default Model;
