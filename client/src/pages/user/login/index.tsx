import {Alert, Checkbox} from 'antd';
import React, {useState} from 'react';
import {connect, Dispatch, Link} from 'umi';
import {StateType} from '@/models/login';
import {LoginParamsType} from '@/services/login';
import {ConnectState} from '@/models/connect';
import LoginFrom from './components/Login';
import {CodeType} from "@/utils/request";


import styles from './style.less';

const {Tab, UserName, Password, Submit} = LoginFrom;

interface LoginProps {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const {userLogin = {}, submitting} = props;
  const {code, msg = '登录失败'} = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);

  const handleSubmit = (values: LoginParamsType) => {
    const {dispatch} = props;
    dispatch({
      type: 'login/login',
      payload: {...values},
    });
  };
  return (
    <div className={styles.main}>
      <LoginFrom activeKey={'account'} onSubmit={handleSubmit}>
        <Tab key="account" tab="账户密码登录">
          {code !== CodeType.noLogin && code !== CodeType.success && !submitting && (
            <LoginMessage content={msg}/>
          )}
          <UserName
            name="id"
            placeholder="用户名"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            自动登录
          </Checkbox>
          {/*<a*/}
          {/*  style={{*/}
          {/*    float: 'right',*/}
          {/*  }}*/}
          {/*>*/}
          {/*  忘记密码*/}
          {/*</a>*/}
        </div>
        <Submit loading={submitting}>登录</Submit>
        <div className={styles.other}>
          <Link className={styles.register} to="/user/register">
            注册账户
          </Link>
        </div>
      </LoginFrom>
    </div>
  );
};

export default connect(({login, loading}: ConnectState) => {
  // console.info(state);
  return ({
    userLogin: login,
    submitting: loading.effects['login/login'],
  })
})(Login);
