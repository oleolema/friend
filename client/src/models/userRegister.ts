import {Effect, Reducer} from 'umi';

import {register} from '@/services/userRegister';
import {StateType} from "@/models/login";


export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submit: Effect;
  };
  reducers: {
    registerHandle: Reducer<StateType>;
  };
}

const UserRegister: ModelType = {
  namespace: 'userAndUserRegister',

  state: {
    code: undefined,
    msg: undefined,
  },

  effects: {
    * submit({payload}, {call, put}) {
      const response = yield call(register, payload);
      if (!response) {
        return;
      }
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
  },

  reducers: {
    registerHandle(state, {payload}) {
      return {
        ...state,
        code: payload.code,
        msg: payload.msg,
      };
    },
  },
};

export default UserRegister;
