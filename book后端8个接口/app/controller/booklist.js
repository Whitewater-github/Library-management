'use strict';

const Controller = require('egg').Controller;

class BookController extends Controller {
  async addbook() {
    const params = this.ctx.request.body;
    console.log(params);
    await this.ctx.service.booklist.addbook(params);
  }
  async delete() {
    // 不是很懂这个params
    // const q = this.ctx.params;
    const _id = this.ctx.query;
    console.log(_id);
    console.log('调用了delete接口进行删除');
    await this.ctx.service.booklist.delete(_id);
  }
  async findAllBook() {
    const ctx = this.ctx;
    const allbooks = await ctx.service.booklist.findAllBook();
    ctx.body = allbooks;
  }
  async findbybookname() {
    console.log(this.ctx.params);
    const bookname = this.ctx.query;
    console.log(bookname);
    await this.ctx.service.booklist.findname(bookname);
  }
  async update() {
    const params = this.ctx.request.body;
    await this.ctx.service.booklist.update(params);

  }
  async borrowbook() {
    const booklist = this.ctx.request.body;
    const res = await this.ctx.service.booklist.borrowbook(booklist);
    if (!res) {
      this.ctx.body = {
        code: 400,
        data: null,
      };
    } else {
      this.ctx.body = {
        code: 200,
      };
    }
  }
  async rebook() {
    const booklist = this.ctx.request.body;
    const res = await this.ctx.service.booklist.rebook(booklist);
    if (!res) {
      this.ctx.body = {
        code: 400,
        data: null,
      };
    } else {
      this.ctx.body = {
        code: 200,
        data: null,
      };
    }
  }


}

module.exports = BookController;
