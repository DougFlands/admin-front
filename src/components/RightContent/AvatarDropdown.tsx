import React, { useCallback } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { history, useModel, connect } from 'umi';
import { getPageQuery } from '@/utils/utils';
// import { outLogin } from '@/services/login';
import { stringify } from 'querystring';
import { UserInfo } from '@/models/user';
import { ConnectProps, ConnectState } from '@/models/connect';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export interface GlobalHeaderRightProps extends ConnectProps {
  userInfo?: UserInfo;
  menu?: boolean;
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ userInfo, menu, dispatch, }) => {

  const onMenuClick = useCallback((event: {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
  }) => {
    const { key } = event;
    if (key === 'logout') {
      if (dispatch) {
        dispatch({
          type: 'user/logout',
        });
      }
      history.push(`/user/login`);
    }
  }, []);

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!userInfo || !userInfo.name) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {/* {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )} */}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>{userInfo.name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default connect(({ user }: ConnectState) => ({
  userInfo: user.userInfo,
}))(AvatarDropdown);
