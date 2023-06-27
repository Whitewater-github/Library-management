'use strict';

const Service = require('egg').Service;

class BookService extends Service {
  async addbook(params) {
    console.log(params);
    const correct = await this.ctx.model.Booklist.findOne({ bookname: params.bookname });
    if (!correct) {
      await this.ctx.model.Booklist.create(params);
      const code = 200;
      this.ctx.body = code;
    } else {
      this.ctx.body = '该图书已存在';
    }
  }
  async delete(_id) {
    const correct = await this.ctx.model.Booklist.findOneAndDelete(_id);
    console.log(correct);
    if (correct) {
      const code = 200;
      this.ctx.body = code;
    } else {
      this.ctx.body = '该图书不存在';
    }
  }

  async findAllBook() {
    return await this.ctx.model.Booklist.find();

  }
  async findname(bookname) {
    const correct = await this.ctx.model.Booklist.find({ bookname: { $regex: bookname.bookname } });
    console.log(correct);
    if (correct) {
      const code = 200;
      this.ctx.body = { correct, code };
    } else {
      this.ctx.body = '该图书不存在';
    }
  }
  async update(params) {
    const correct = await this.ctx.model.Booklist.findByIdAndUpdate(params._id, params, { new: true });
    console.log(correct);
    if (correct) {
      const code = 200;
      this.ctx.body = code;
    } else {
      this.ctx.body = '更新失败';
    }

  }
  // 借书
  async borrowbook(booklist) {
    console.log(booklist,"testSer")
    const correct = await this.ctx.model.Booklist.findOneAndUpdate({"_id":booklist._id},{$set: {state : " 已借阅",  borrower: booklist._id, date: new Date() }});// 当borrower与returner同时不为空则returner则是上次还书的人
    console.log(correct)
    console.log(new Date());
    return correct;
  }

  // 还书
  async rebook(booklist) {
    console.log(booklist,"testSer")
    const correct = await this.ctx.model.Booklist.findOneAndUpdate({"_id":booklist._id},{$set: {state : " 未借阅",  returner: booklist._id, date: new Date() }});// 当borrower与returner同时不为空则returner则是上次还书的人
    console.log(correct);
    return correct;

  }
}

module.exports = BookService;
