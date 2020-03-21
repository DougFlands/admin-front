import { Reducer } from 'redux';

import { Effect } from 'dva';
import { 
  uploadFile as apiUploadFile, 
  fastUploadFile as apiFastUploadFile 
} from '@/services/file'

export interface StateType {
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    uploadFile: Effect;
    fastUploadFile: Effect;
  };
  reducers: {
    saveList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'fileUpload',

  state: {
    
  },

  effects: {
    *uploadFile({ payload }, { call }) {
      const response = yield call(apiUploadFile, payload);
      return response
    },

    *fastUploadFile({ payload }, { call }) {
      const response = yield call(apiFastUploadFile, payload);
      return response
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
