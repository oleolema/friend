// eslint-disable-next-line import/no-extraneous-dependencies
import {Request, Response} from 'express';
import Mock from 'mockjs'

export default {
  'POST  /user/register': (_: Request, res: Response) => {

    res.send({
      code: 0,
      msg: '登录成功',
      data: Mock.mock({
        'id': '@id',
        name: '@cname',
        'sex|1': [0, 1],
        'phone|13200000000-18000000000': 1,
        'qq|700000000-8000000000': 1,
      })
    });
  },
};
