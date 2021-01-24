import { IDriver } from './driver.interfaces';

export interface IOptions {
  driver: IDriver;
  tokenSecret: string;
  refreshTokenSecret: string;
  tokenExpires?: number;
  refreshTokenExpires?: number;
  sendGridApiKey: string;
}
