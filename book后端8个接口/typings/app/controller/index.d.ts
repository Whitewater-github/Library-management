// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBooklist = require('../../../app/controller/booklist');
import ExportHome = require('../../../app/controller/home');
import ExportUserbook = require('../../../app/controller/userbook');

declare module 'egg' {
  interface IController {
    booklist: ExportBooklist;
    home: ExportHome;
    userbook: ExportUserbook;
  }
}
