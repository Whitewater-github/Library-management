'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const userbookSchema = new mongoose.Schema({
    id: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true, 
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false, // 去除版本锁，否则会有_v
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },

  });

  return mongoose.model('Userbook', userbookSchema, 'userbook');
};
