import request from '@/utils/request';
import {FriendData, TableListParams} from '@/pages/FriendTableList/data';


export async function query(params?: TableListParams) {
  return request('/friend/query', {
    params
  });
}

export async function add(friend: FriendData) {
  return request('/friend/add', {
    method: 'POST',
    data: {
      ...friend,
    },
  });
}

export async function update(friend: FriendData) {
  return request('/friend/update', {
    method: 'POST',
    data: {
      ...friend,
    },
  });
}

export async function deleteFriendByIds(ids: string[]) {
  return request('/friend/delete', {
    method: 'POST',
    data: ids,
  });
}
