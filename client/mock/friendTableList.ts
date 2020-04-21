import {Request, Response} from 'express';
import Mock from 'mockjs';
import {parse} from "url";

export default {
  'GET /friend/query': (req: Request, res: Response, u: string) => {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      // eslint-disable-next-line prefer-destructuring
      url = req.url;
    }
    const params = (parse(url, true).query as unknown) as any;
    console.info(params);
    res.send(
      Mock.mock({
        code: 0,
        msg: '获取成功',
        data: {
          'data|10': [
            {
              'id': '@id',
              name: '@cname',
              'sex|1': [0, 1],
              'phone|13200000000-18000000000': 1,
              'qq|700000000-8000000000': 1,
            },
          ],
          total: 100,
          success: true,
          pageSize: parseInt(params?.pageSize),
          current: parseInt(params?.current),
        }
      }),
    );
  },

  'POST /friend/add': (req: Request, res: Response) => {
    let json;
    try {
      json = req.body;
      res.send({
        code: 0,
        msg: '添加成功',
        data: Mock.mock({
          id: '@id',
          name: json['name'],
          'sex|1': json['sex'],
          'phone|13200000000-18000000000': json['phone'],
          'qq|700000000-8000000000': json['qq'],
        }),
      });
    } catch (e) {
      res.send({
        code: 1,
        msg: '添加失败',
      });
    } finally {
      console.info(json);
    }
  },
  'POST /friend/update': (req: Request, res: Response) => {
    let json;
    try {
      json = req.body;
      res.send({
        code: 0,
        msg: '修改成功',
        data: Mock.mock({
          id: '@id',
          name: json['name'],
          'sex|1': json['sex'],
          'phone|13200000000-18000000000': json['phone'],
          'qq|700000000-8000000000': json['qq'],
        }),
      });
    } catch (e) {
      res.send({
        code: 1,
        msg: '修改失败',
      });
    } finally {
      console.info(json);
    }
  },
  'POST /friend/delete': (req: Request, res: Response) => {
    let json;
    try {
      json = req.body;
      res.send({
        code: 0,
        msg: '删除成功',
      });
    } catch (e) {
      res.send({
        code: 1,
        msg: '删除失败',
      });
    } finally {
      console.info(json);
    }
  },
};
