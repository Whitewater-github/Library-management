// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportBooklist = require('../../../app/service/booklist');
import ExportHome = require('../../../app/service/home');
import ExportUserbook = require('../../../app/service/userbook');

declare module 'egg' {
  interface IService {
    booklist: AutoInstanceType<typeof ExportBooklist>;
    home: AutoInstanceType<typeof ExportHome>;
    userbook: AutoInstanceType<typeof ExportUserbook>;
  }
}
