import { IDriver } from '@authgrid/common/interfaces/driver.interfaces';
import { IOptions } from '@authgrid/common/interfaces/authGrid.interfaces';

interface IContext extends IOptions {
  driver: IDriver;
}

export class ContextHolder {
  private static instance: ContextHolder;
  private context: IContext | null = null;

  static getInstance(): ContextHolder {
    if (!ContextHolder.instance) {
      ContextHolder.instance = new ContextHolder();
    }

    return ContextHolder.instance;
  }

  public static setContext(context: IContext) {
    ContextHolder.getInstance().context = context;
  }

  public static getContext(): IContext {
    return <IContext>ContextHolder.getInstance().context;
  }

  public static getDriver(): IDriver {
    return <IDriver>ContextHolder.getInstance().context?.driver;
  }
}
