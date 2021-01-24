interface IRoutes {
  login: string;
  signup: string;
  forgot: string;
  logout: string;
}

export interface IContext {
  baseUrl: string;
  routes: IRoutes;
}

export class ContextHolder {
  private static instance: ContextHolder;
  private context: IContext | null = null;
  private accessToken: string | null = null;

  static getInstance(): ContextHolder {
    if (!ContextHolder.instance) {
      ContextHolder.instance = new ContextHolder();
    }

    return ContextHolder.instance;
  }

  public static setContext(context: IContext) {
    ContextHolder.getInstance().context = context;
  }

  public static getContext(): IContext | null {
    return ContextHolder.getInstance().context;
  }

  public static setAccessToken(accessToken: string | null) {
    ContextHolder.getInstance().accessToken = accessToken;
  }

  public static getAccessToken(): string | null {
    return ContextHolder.getInstance().accessToken;
  }
}
