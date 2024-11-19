class RequestError extends Error {
  public status: number;
  public message: string;
  public errors?: Array<any>;

  constructor(status: number, message: string, errors?: Array<any>) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors;
  }

  static BadRequest(message: string, errors?: Array<any>) {
    return new RequestError(400, message, errors);
  }

  static Unauthorized(message: string, errors?: Array<any>) {
    return new RequestError(401, message, errors);
  }

  static Forbidden(message: string, errors?: Array<any>) {
    return new RequestError(403, message, errors);
  }

  static NotFound(message: string, errors?: Array<any>) {
    return new RequestError(404, message, errors);
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
    return new RequestError(500, message);
  }

  static NotImplemented(message: string) {
    return new RequestError(501, message);
  }
}

export { RequestError, ResponseError };
