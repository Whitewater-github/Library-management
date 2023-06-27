'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async list(data) { // 用户列表
    return {
      message: 'ok',
      status: 200,
      result: {
        list: [
          { id: 1, name: '王大娃' },
          { id: 2, name: '王二娃' },
          { id: 3, name: '王三娃' },
        ],
        pageSize: data.pageSize,
        current: data.current,
        totalCount: 3,
        total: 1,
      },
    };
  }
}

module.exports = HomeService;
