import {Button, Form, Input, message, Popover, Progress} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {connect, Dispatch, FormattedMessage, history, Link} from 'umi';


import styles from './style.less';
import {formatMessage} from "@@/plugin-locale/localeExports";
import {StateType} from "@/models/login";
import {CodeType} from "@/utils/request";

const FormItem = Form.Item;


const passwordStatusMap = {
  ok: (
    <div className={styles.success}>
      <FormattedMessage id="useranduserregister.strength.strong"/>
    </div>
  ),
  pass: (
    <div className={styles.warning}>
      <FormattedMessage id="useranduserregister.strength.medium"/>
    </div>
  ),
  poor: (
    <div className={styles.error}>
      <FormattedMessage id="useranduserregister.strength.short"/>
    </div>
  ),
};

const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

interface UserRegisterProps {
  dispatch: Dispatch;
  userAndUserRegister: StateType;
  submitting: boolean;
}

export interface UserRegisterParams {
  mail: string;
  password: string;
  confirm: string;
  mobile: string;
  captcha: string;
  prefix: string;
}

const UserRegister: FC<UserRegisterProps> = ({
                                               submitting,
                                               dispatch,
                                               userAndUserRegister,
                                             }) => {
  // const [count, setcount]: [number, any] = useState(0);
  const [visible, setvisible]: [boolean, any] = useState(false);
  const [popover, setpopover]: [boolean, any] = useState(false);
  const confirmDirty = false;
  let interval: number | undefined;
  const [form] = Form.useForm();
  useEffect(() => {
    if (!userAndUserRegister || userAndUserRegister.code === undefined) {
      return;
    }
    const account = form.getFieldValue('name');
    if (userAndUserRegister.code === CodeType.success) {
      message.success('注册成功！');
      history.push({
        pathname: '/user/register-result',
        state: {
          account,
        },
      });
    } else {
      message.error(userAndUserRegister.msg);
    }
  }, [userAndUserRegister]);
  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [],
  );
  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };
  const onFinish = (values: { [key: string]: any }) => {
    dispatch({
      type: 'userAndUserRegister/submit',
      payload: {
        ...values,
      },
    });
  };
  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject(formatMessage({id: 'useranduserregister.password.twice'}));
    }
    return promise.resolve();
  };
  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    // 没有值的情况
    if (!value) {
      setvisible(!!value);
      return promise.reject(formatMessage({id: 'useranduserregister.password.required'}));
    }
    // 有值的情况
    if (!visible) {
      setvisible(!!value);
    }
    setpopover(!popover);
    if (value.length < 6) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <div className={styles.main}>
      <h3>
        <FormattedMessage id="useranduserregister.register.register"/>
      </h3>
      <Form form={form} name="UserRegister" onFinish={onFinish}>
        <FormItem
          name="id"
          rules={[
            {
              required: true,
              message: formatMessage({id: 'useranduserregister.name.required'}),
            },
          ]}
        >
          <Input size="large" placeholder={formatMessage({id: 'useranduserregister.name.placeholder'})}/>
        </FormItem>
        <Popover
          getPopupContainer={node => {
            if (node && node.parentNode) {
              return node.parentNode as HTMLElement;
            }
            return node;
          }}
          content={
            visible && (
              <div style={{padding: '4px 0'}}>
                {passwordStatusMap[getPasswordStatus()]}
                {renderPasswordProgress()}
                <div style={{marginTop: 10}}>
                  <FormattedMessage id="useranduserregister.strength.msg"/>
                </div>
              </div>
            )
          }
          overlayStyle={{width: 240}}
          placement="right"
          visible={visible}
        >
          <FormItem
            name="password"
            className={
              form.getFieldValue('password') &&
              form.getFieldValue('password').length > 0 &&
              styles.password
            }
            rules={[
              {
                validator: checkPassword,
              },
            ]}
          >
            <Input
              size="large"
              type="password"
              placeholder={formatMessage({id: 'useranduserregister.password.placeholder'})}
            />
          </FormItem>
        </Popover>
        <FormItem
          name="confirm"
          rules={[
            {
              required: true,
              message: formatMessage({id: 'useranduserregister.confirm-password.required'}),
            },
            {
              validator: checkConfirm,
            },
          ]}
        >
          <Input
            size="large"
            type="password"
            placeholder={formatMessage({id: 'useranduserregister.confirm-password.placeholder'})}
          />
        </FormItem>
        {/*<FormItem*/}
        {/*  name="sex"*/}
        {/*>*/}
        {/*  <Select size="large" value={'0'}*/}
        {/*          placeholder={'性别'}*/}
        {/*  >*/}
        {/*    <Option value="0">男</Option>*/}
        {/*    <Option value="1">女</Option>*/}
        {/*  </Select>*/}
        {/*</FormItem>*/}

        {/*<FormItem*/}
        {/*  name="phone"*/}
        {/*  rules={[*/}
        {/*    {*/}
        {/*      // required: true,*/}
        {/*      message: formatMessage({id: 'useranduserregister.phone-number.required'}),*/}
        {/*    },*/}
        {/*    {*/}
        {/*      pattern: /^\d{3,}$/,*/}
        {/*      message: formatMessage({id: 'useranduserregister.phone-number.wrong-format'}),*/}
        {/*    },*/}
        {/*  ]}*/}
        {/*>*/}
        {/*  <Input*/}
        {/*    // size="large"*/}
        {/*    placeholder={formatMessage({id: 'useranduserregister.phone-number.placeholder'})}*/}
        {/*  />*/}
        {/*</FormItem>*/}

        {/*<FormItem*/}
        {/*  name="qq"*/}
        {/*  rules={[*/}
        {/*    {*/}
        {/*      // required: true,*/}
        {/*      message: formatMessage({id: 'useranduserregister.qq.required'}),*/}
        {/*    },*/}
        {/*    {*/}
        {/*      pattern: /^\d{5,}$/,*/}
        {/*      message: formatMessage({id: 'useranduserregister.qq.wrong-format'}),*/}
        {/*    },*/}
        {/*  ]}*/}
        {/*>*/}
        {/*  <Input*/}
        {/*    size="large"*/}
        {/*    placeholder={formatMessage({id: 'useranduserregister.qq.placeholder'})}*/}
        {/*  />*/}
        {/*</FormItem>*/}
        <FormItem>
          <Button
            size="large"
            loading={submitting}
            className={styles.submit}
            type="primary"
            htmlType="submit"
          >
            <FormattedMessage id="useranduserregister.register.register"/>
          </Button>
          <Link className={styles.login} to="/user/login">
            <FormattedMessage id="useranduserregister.register.sign-in"/>
          </Link>
        </FormItem>
      </Form>
    </div>
  );
};
export default connect(
  ({
     userAndUserRegister,
     loading,
   }: {
    userAndUserRegister: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userAndUserRegister,
    submitting: loading.effects['userAndUserRegister/submit'],
  }),
)(UserRegister);
