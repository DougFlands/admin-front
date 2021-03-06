import {
  DeleteTwoTone,
} from '@ant-design/icons';
import { Modal, Tooltip } from 'antd';
import React from 'react';
import { ConnectState } from '@/models/connect';
import { connect, Dispatch } from 'umi';
import { ListItemDataType } from '../data.d';

interface DeleteBtnProps {
  dispatch: Dispatch;
  submitting?: boolean;
  item: ListItemDataType
}

const DeleteBtn: React.FC<DeleteBtnProps> = props => {
  const {
    dispatch,
    item,
  } = props;

  const handlerDelete = () => {
    Modal.confirm({
      centered: true,
      content: '确定要删除吗？',
      title: '删除文件',
      onOk: () => dispatch({
        type: 'fileList/deleteFile',
        payload: {
          filehash: item.FileHash
        }
      })
    })
  }

  return (
    <Tooltip key="delete" title="删除">
      <DeleteTwoTone twoToneColor="#eb2f96" onClick={handlerDelete} />
    </Tooltip>
  )
}

export default connect(({ loading }: ConnectState) => ({
  submitting: loading.effects['fileList/deleteFile'],
}))(DeleteBtn)