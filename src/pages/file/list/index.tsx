import { PageHeaderWrapper } from '@ant-design/pro-layout';
import '@ant-design/compatible/assets/index.css';
import { Card, List, Button } from 'antd';
import React, { Component } from 'react';
import { ConnectState } from '@/models/connect';

import { AnyAction, Dispatch } from 'redux';
import { connect } from 'dva';
import { StateType } from '@/models/file/list';
import { ListItemDataType } from './data.d';
// import BtnGroup from './components/BtnGroup';
import DownloadBtn from './components/DownloadBtn';
import RenameBtn from './components/RenameBtn';
import DeleteBtn from './components/DeleteBtn';

import styles from './style.less';

interface ListProps {
  dispatch: Dispatch<AnyAction>;
  fileList: StateType;
  loading?: boolean;
}

class FileList extends Component<ListProps> {
  componentDidMount() {
    this.onGetListHandler();
  }

  onGetListHandler() {
    const { dispatch } = this.props;
    dispatch({
      type: 'fileList/getList',
      payload: {
        limit: 20,
      },
    });
  }

  render() {
    const {
      fileList: { list },
      loading,
    } = this.props;

    return (
      <div className={styles.filterCardList}>
        <Button onClick={() => this.onGetListHandler}>获取列表</Button>
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
}

const WrapperFileList = connect(({ fileList, loading }: ConnectState) => ({
  fileList,
  loading: loading.effects['fileList/getList'],
}))(FileList);

export default (): React.ReactNode => (
  <PageHeaderWrapper>
    <WrapperFileList />
  </PageHeaderWrapper>
);
