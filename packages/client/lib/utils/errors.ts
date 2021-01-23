export class BadRequestError extends Error {
  private data: { error: string };
  private statusCode: number;

  constructor(error) {
    super(error.message);

    this.data = { error };
    this.statusCode = 400;
  }
}

export class UnauthorizedError extends Error {
  private data: { error: string };
  private statusCode: number;

  constructor(error?) {
    super(error?.message);

    this.data = { error };
    this.statusCode = 401;
  }
}
