'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hello world';
  }
  async indexss() {
    const { ctx } = this;
    ctx.body = 'hello world试试';
  }
  async indexs() {
    const { ctx } = this;
    ctx.body = 'indexs';
  }
  async list() { // 用户列表
    const res = await this.ctx.service.home.list(this.ctx.request);
    this.ctx.body = res;
    this.ctx.status = res.status;
  }
}

module.exports = HomeController;
