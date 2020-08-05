import {
  EditOutlined,
} from '@ant-design/icons';
import { Modal, Tooltip, Input } from 'antd';
import React, { useState } from 'react';
import { ConnectState } from '@/models/connect';
import { Dispatch, connect } from 'umi';
import { ListItemDataType } from '../data.d';

interface RenameBtnProps {
  dispatch: Dispatch;
  submitting?: boolean;
  item: ListItemDataType
}

const RenameBtn: React.FC<RenameBtnProps> = props => {
  const {
    dispatch,
    item,
  } = props;

  const [renameValue, setRenameValue] = useState(item.FileName);

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
      onCancel: () => setRenameValue(item.FileName)
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