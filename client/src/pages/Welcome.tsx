import React from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import {Card} from 'antd';

export default (): React.ReactNode => (
  <PageHeaderWrapper>
    <Card>
      欢迎使用好友管理系统.
    </Card>
    <p
      style={{
        textAlign: 'center',
        marginTop: 24,
      }}
    >
    </p>
  </PageHeaderWrapper>
);
