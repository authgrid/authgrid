import express from 'express';
import { IDriver } from '@authcom/common/interfaces/driver.interfaces';
interface IOptions {
    driver: IDriver;
}
export declare class DriverHolder {
    private static instance;
    private driver;
    static getInstance(): DriverHolder;
    static setDriver(driver: IDriver): void;
    static getDriver(): IDriver | null;
}
declare const _default: (options: IOptions) => express.Router;
export default _default;
