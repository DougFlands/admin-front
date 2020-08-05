import {
  DownloadOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import { ConnectState } from '@/models/connect';
import { Dispatch, connect } from 'umi';
import { ListItemDataType } from '../data.d';

interface DownloadBtnProps {
  dispatch: Dispatch;
  submitting?: boolean;
  item: ListItemDataType
}

const DownloadBtn: React.FC<DownloadBtnProps> = props => {
  const {
    dispatch,
    item,
    submitting,
  } = props;

  const handlerDownLoad = () => {
    dispatch({
      type: 'fileList/getDownLoadUrl',
      payload: {
        filehash: item.FileHash
      }
    })
  }

  return (
    <Tooltip key="download" title="下载">
      {
        submitting ?
          <LoadingOutlined />
          :
          <DownloadOutlined onClick={handlerDownLoad} />
      }
    </Tooltip>

  );
}

export default connect(({ loading }: ConnectState) => ({
  submitting: loading.effects['fileList/getDownLoadUrl'],
}))(DownloadBtn);