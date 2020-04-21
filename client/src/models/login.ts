import {stringify} from 'querystring';
import {Effect, history, Reducer} from 'umi';

import {accountLogin} from '@/services/login';
import {getPageQuery} from '@/utils/utils';
import {CodeType} from "@/utils/request";


export interface StateType {
  code?: CodeType;
  msg?: string;
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
    logout: Reducer<StateType>;
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    code: CodeType.noLogin,
    msg: undefined,
  },

  effects: {
    * login({payload}, {call, put}) {
      const response = yield call(accountLogin, payload);
      if (!response) {
        return;
      }
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.code === CodeType.success) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {redirect} = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      }
    },

  },

  reducers: {
    changeLoginStatus(state, {payload}) {
      return {
        ...state,
        code: payload.code,
        msg: payload.msg,
      };
    },
    logout(state, {payload}) {
      const {redirect} = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
      return {
        ...state,
        code: CodeType.noLogin,
        msg: '',
      }
    },
  },


};

export default Model;
