import request from '@/utils/request';
import {UserRegisterParams} from '@/pages/user/UserRegister';

import md5 from 'md5';

export async function register(params: UserRegisterParams) {
  return request('/api/user/register', {
    method: 'POST',
    data: {
      ...params,
      password: md5(params.password),
      confirm: md5(params.confirm),
    },
  });
}
