import React from 'react';
import { connect } from 'dva';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
import { stringify } from 'querystring';
import { ConnectState, ConnectProps } from '@/models/connect';
import { UserModelState } from '@/models/user';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  userState: UserModelState;
}

interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;
    if (dispatch) {
      // dispatch({
      //   type: 'user/fetchCurrent',
      // });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, userState } = this.props;
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const isLogin = userState.userInfo && userState.userInfo.name;
    const queryString = stringify({
      redirect: window.location.href,
    });

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }
    if (!isLogin) {
      return <Redirect to={`/user/login?${queryString}`} />;
    }
    return children;
  }
}

export default connect(({ user, loading }: ConnectState) => ({
  userState: user,
  loading: loading.models.user,
}))(SecurityLayout);
