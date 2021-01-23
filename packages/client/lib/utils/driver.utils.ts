import { IDriver } from '@authcom/common/interfaces/driver.interfaces';

export class DriverHolder {
  private static instance: DriverHolder;
  private driver: IDriver | null = null;

  static getInstance(): DriverHolder {
    if (!DriverHolder.instance) {
      DriverHolder.instance = new DriverHolder();
    }

    return DriverHolder.instance;
  }

  public static setDriver(driver: IDriver) {
    DriverHolder.getInstance().driver = driver;
  }

  public static getDriver(): IDriver | null {
    return DriverHolder.getInstance().driver;
  }
}
