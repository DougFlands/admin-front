import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  UploadOutlined,
  InboxOutlined
} from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import React, { Component } from 'react';
import { ConnectState } from '@/models/connect';
import { Dispatch, connect } from 'umi';

import styles from './style.less';

interface UploadFileProps {
  dispatch: Dispatch;
  submitting?: boolean;
}

interface UploadFileState {
  fileList: any[]
}

class UploadFile extends Component<UploadFileProps, UploadFileState> {

  state: UploadFileState = {
    fileList: [],
  }

  formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 14 },
  }

  draggerProps = {
    name: 'file',
    onChange: (info: any) => {
      this.setState({
        fileList: info.fileList
      })
    },
    beforeUpload: () => false,
    multiple: false,
  }

  handleSubmit = async () => {
    if (this.state.fileList.length > 1) {
      message.error(`当前仅能上传一个文件，请删除文件后再试!`)
      return
    }
    if (this.state.fileList.length === 0) {
      message.error(`请选择要上传的文件`)
      return
    }
    const fileSize = this.state.fileList[0].size / 1024 / 1024 < 10
    if (!fileSize) {
      message.error("仅能上传10M以内的文件")
      return
    }
    const formData = new FormData();
    formData.append('file', this.state.fileList[0].originFileObj);
    const res: any = await this.props.dispatch({
      type: 'fileUpload/uploadFile',
      payload: formData,
    })
    if (res.Code === 0) {
      message.success('上传成功')
      this.setState({
        fileList: [],
      })
    }
  }

  render() {
    const {submitting} = this.props
    return (
      <div className={styles.warpper}>

        <Upload.Dragger {...this.draggerProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖曳至此上传文件</p>
        </Upload.Dragger>

        <Button size="large" loading={this.props.submitting} className={styles.submit} type="primary"
          onClick={this.handleSubmit} disabled={submitting}>
          <UploadOutlined />
          {
            submitting ? '上传中' : '上传'
          }
        </Button>

      </div>
    )
  }
}


const WrappedUploadFile = connect(({ loading }: ConnectState) => ({
  submitting: loading.effects['fileUpload/uploadFile'],
}))(UploadFile);

export default (): React.ReactNode => (
  <PageHeaderWrapper>
    <WrappedUploadFile />
  </PageHeaderWrapper>
);
