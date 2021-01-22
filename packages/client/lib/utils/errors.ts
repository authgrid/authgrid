export class BadRequestError extends Error {
  private data: { error: string };
  private statusCode: number;

  constructor(error) {
    super(error.message);

    this.data = { error };
    this.statusCode = 400;
  }
}
