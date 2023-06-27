'use strict';

// const { registerRuntimeCompiler } = require('vue');

const Service = require('egg').Service;
class UserbookService extends Service {
  async register(params) {
    console.log(params);
    const correct = await this.ctx.model.Userbook.findOne({ username: params.username});
    if (!correct) {
      await this.ctx.model.Userbook.create(params);
      const code = 200;
      this.ctx.body = code;
    } else {
      this.ctx.body = '该用户已经存在';
    }
  }
  async login(userbook) {
    const corrct = await this.ctx.model.Userbook.findOne({ username: userbook.username });
    if (!corrct) {
      this.ctx.body = '用户名错误';
    } else {
      if (userbook.password === corrct.password) {
      // 本来是==
        const output = await this.ctx.model.Userbook.find({ username: userbook.username});
        console.log(output);
        const code = 200;
        this.ctx.body = code;
      } else {
        this.ctx.body = '密码错误';
      }
    }
  }
}
module.exports = UserbookService;
