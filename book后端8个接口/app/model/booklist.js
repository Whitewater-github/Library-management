'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const booklistSchema = new mongoose.Schema({
    id: {
      type: String,
      require: true,
    },
    bookname: {
      type: String,
      // unique: true,  //唯一的
      require: true, // 必须的
    },
    writer: {
      type: String,
      // unique: true,
      // require: true
    },
    xiangqing: {
      type: String,
    },
    img: {
      type: String,
    },
    state: { type: String },
    borrower: { type: String },
    returner: { type: String },
    date: { type: String },
  },
  {
    versionKey: false, // 去除版本锁，否则会有_v
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },

  });

  return mongoose.model('Booklist', booklistSchema, 'booklist');
};
