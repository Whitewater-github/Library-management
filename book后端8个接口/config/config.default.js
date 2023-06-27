/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // cors跨域配置和csrf安全防范
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: false,
    },
    domainWhiteList: [ 'http://localhost:8080' ],
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/books', // 写你自己的数据库名字
      options: {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        bufferMaxEntries: 0,
      },
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1636701642402_747';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {

  };
  return {
    ...config,
    ...userConfig,
  };
};
// cors跨域配置和csrf安全防范
// config.security = {
//   csrf: {
//     enable: false,
//     ignoreJSON: false
//   },
//   domainWhiteList: ["http://localhost:8080"]
// }
// config.cors = {
//   origin: "*",
//   allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH"
// }

// config.mongoose = {
//   client: {
//     url: "mongodb://127.0.0.1:27017/books", //写你自己的数据库名字
//     options: {
//       useNewUrlParser: true,
//       autoReconnect: true,
//       reconnectTries: Number.MAX_VALUE,
//       bufferMaxEntries: 0
//     }
//   }
// }
