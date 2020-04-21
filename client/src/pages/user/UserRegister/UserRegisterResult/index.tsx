import {Button, Result} from 'antd';
import {FormattedMessage, formatMessage, Link} from 'umi';
import React from 'react';
import {RouteChildrenProps} from 'react-router';

import styles from './style.less';

const actions = (
  <div className={styles.actions}>
    <a href="">
      <Button size="large" type="primary">
        <FormattedMessage id="useranduserregisteranduserregisterresult.register-result.view-mailbox"/>
      </Button>
    </a>
    <Link to="/">
      <Button size="large">
        <FormattedMessage id="useranduserregisteranduserregisterresult.register-result.back-home"/>
      </Button>
    </Link>
  </div>
);

const UserRegisterResult: React.FC<RouteChildrenProps> = ({location}) => (
  <Result
    className={styles.registerResult}
    status="success"
    title={
      <div className={styles.title}>
        <FormattedMessage
          id="useranduserregisteranduserregisterresult.register-result.msg"
          values={{email: location.state ? location.state.account : 'AntDesign@example.com'}}
        />
      </div>
    }
    subTitle={formatMessage({id: 'useranduserregisteranduserregisterresult.register-result.activation-email'})}
    extra={actions}
  />
);

export default UserRegisterResult;
