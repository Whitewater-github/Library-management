'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);// 首页
  router.get('/ss', controller.home.indexss);// 首页
  router.redirect('/', '/home/index', 302);// 没有指定路由时重新定向到首页
  // 用户登录路由
  router.post('/login', controller.userbook.login);// 登陆
  router.post('/register', controller.userbook.register);// 注册
  // 图书路由
  router.post('/addbook', controller.booklist.addbook);// 增加方法
  router.get('/deletebook', controller.booklist.delete);// 删除方法
  router.get('/findallbook', controller.booklist.findAllBook);// 查找所有
  router.get('/findbybookname', controller.booklist.findbybookname);// 根据名称查找
  router.post('/updatabook', controller.booklist.update);// 更新图书信息
  // 借书还书路由
  router.post('/rebook', controller.booklist.rebook);// ok还书
  router.post('/borrowbook', controller.booklist.borrowbook);// ok借书
};
