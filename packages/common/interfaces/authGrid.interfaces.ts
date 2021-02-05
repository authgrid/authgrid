import { IDriver } from './driver.interfaces';
import { IMailer } from './mailer.interfaces';

export interface IOptions {
  driver: IDriver;
  tokenSecret: string;
  refreshTokenSecret: string;
  mailer: (params: IMailer) => Promise<any>;
  tokenExpires?: number;
  refreshTokenExpires?: number;
}
