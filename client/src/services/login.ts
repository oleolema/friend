import request from '@/utils/request';
import md5 from 'md5';

export interface LoginParamsType {
  userName: string;
  password: string;
}

export async function accountLogin(params: LoginParamsType) {
  return request('/user/login', {
    method: 'POST',
    data: {
      ...params,
      password: md5(params.password),
    },
  });
}
