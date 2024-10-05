class RequestError extends Error {
  public status: number;
  public message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }

  static BadRequest(message: string) {
    throw new RequestError(400, message);
  }

  static Unauthorized(message: string) {
    throw new RequestError(401, message);
  }

  static Forbidden(message: string) {
    throw new RequestError(403, message);
  }

  static NotFound(message: string) {
    throw new RequestError(404, message);
  }
}

class ResponseError extends Error {
  public status: number;
  public message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }

  static InternalServerError(message: string) {
    throw new RequestError(500, message);
  }

  static NotImplemented(message: string) {
    throw new RequestError(501, message);
  }
}

export { RequestError, ResponseError };
