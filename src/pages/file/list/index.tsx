import { Card, List, Button } from 'antd';
import React, { useEffect } from 'react';
import { ConnectState } from '@/models/connect';

import { Dispatch, connect } from 'umi';
import { StateType } from '@/models/file/list';
import { ListItemDataType } from './data.d';
import DownloadBtn from './components/DownloadBtn';
import RenameBtn from './components/RenameBtn';
import DeleteBtn from './components/DeleteBtn';

import styles from './style.less';

interface ListProps {
  dispatch: Dispatch;
  fileList: StateType;
  loading?: boolean;
}

const FileList: React.FC<ListProps> = (props) => {
  const onGetListHandler = () => {
    const { dispatch } = props;
    dispatch({
      type: 'fileList/getList',
      payload: {
        limit: 20,
      },
    });
  }

  useEffect(() => {
    onGetListHandler()
  }, [])

  const {
    fileList: { list },
    loading,
  } = props;

  return (
    <div className={styles.filterCardList}>
      <Card
        bodyStyle={{ paddingBottom: 20 }}
      >
        <Button type="primary" onClick={() => onGetListHandler()}>查询</Button>
      </Card>

      <br />
      <List<ListItemDataType>
        rowKey="id"
        grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
        loading={loading}
        dataSource={list}
        renderItem={item => (
          <List.Item key={item.FileHash}>
            <Card
              bodyStyle={{ paddingBottom: 20 }}
              actions={[
                <DownloadBtn item={item} />,
                <RenameBtn item={item} />,
                <DeleteBtn item={item} />,
              ]}
            >
              <p>原文件名: {item.FileName}</p>
              {item.FileRename ? <p>修改文件名: {item.FileRename}</p> : null}
              <p>文件大小: {item.FileSize} KB</p>
              <p>上传日期: {item.UploadAt}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}


export default connect(({ fileList, loading }: ConnectState) => ({
  fileList,
  loading: loading.effects['fileList/getList'],
}))(FileList);
