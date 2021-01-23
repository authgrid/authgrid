export declare class BadRequestError extends Error {
    private data;
    private statusCode;
    constructor(error: any);
}
export declare class UnauthorizedError extends Error {
    private data;
    private statusCode;
    constructor(error?: any);
}
