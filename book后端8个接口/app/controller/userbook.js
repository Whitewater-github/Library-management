'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {

  async register() {
    const params = this.ctx.request.body;
    console.log(params);
    await this.ctx.service.userbook.register(params);
  }

  async login() {
    const userbook = this.ctx.request.body;
    await this.ctx.service.userbook.login(userbook);
  }

}

module.exports = UserController;
