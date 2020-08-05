import { MenuDataItem } from '@ant-design/pro-layout';
import { RouterTypes, Dispatch } from 'umi';
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';
import { UserModelState } from './user';
import { StateType as FileListState } from './file/list'
import { StateType as FileUploadState } from './file/upload'

export { GlobalModelState, SettingModelState, UserModelState, FileListState, FileUploadState };

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    
    fileList?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: SettingModelState;
  user: UserModelState;

  fileList: FileListState;
  fileUpload: FileUploadState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch;
}
