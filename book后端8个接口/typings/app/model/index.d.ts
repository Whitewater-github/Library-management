// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBooklist = require('../../../app/model/booklist');
import ExportUserbook = require('../../../app/model/userbook');

declare module 'egg' {
  interface IModel {
    Booklist: ReturnType<typeof ExportBooklist>;
    Userbook: ReturnType<typeof ExportUserbook>;
  }
}
