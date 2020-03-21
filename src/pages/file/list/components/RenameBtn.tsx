import {
  EditOutlined,
} from '@ant-design/icons';
import '@ant-design/compatible/assets/index.css';
import { Modal, Tooltip, Input } from 'antd';
import React from 'react';
import { ConnectState } from '@/models/connect';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'dva';
import { ListItemDataType } from '../data.d';

interface RenameBtnProps {
  dispatch: Dispatch<AnyAction>;
  submitting?: boolean;
  item: ListItemDataType
}

const RenameBtn: React.FC<RenameBtnProps> = props => {
  const {
    dispatch,
    item,
  } = props;


  let renameValue = item.FileName

  const setRenameValue = (value: string) => {
    renameValue = value
  }

  const handlerRename = () => {
    Modal.confirm({
      centered: true,
      title: '修改文件名',
      content: (
        <Input defaultValue={renameValue} onChange={e => setRenameValue(e.target.value)} />
      ),
      onOk: async () => {
        await dispatch({
          type: 'fileList/renameFile',
          payload: {
            filehash: item.FileHash,
            filename: renameValue,
            optype: '0',
          }
        })
      },
      onCancel: () => {
        renameValue = item.FileName
      }
    })
  }

  return (
    <Tooltip key="edit" title="重命名">
      <EditOutlined onClick={handlerRename} />
    </Tooltip>
  );
}

export default connect(({ loading }: ConnectState) => ({
  submitting: loading.effects['fileList/renameFile'],
}))(RenameBtn);