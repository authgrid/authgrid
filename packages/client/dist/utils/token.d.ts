export declare const createTokens: (user: any, SECRET: any, REFRESH_SECRET: any) => Promise<[any, any]>;
export declare const refreshTokens: (token: any, refreshToken: any, SECRET: any, REFRESH_SECRET: any) => Promise<{
    accessToken: any;
    refreshToken: any;
}>;
