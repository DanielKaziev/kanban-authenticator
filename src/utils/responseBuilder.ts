import { IResponseMessage } from "../types/common";

class ResponseBuilder {
  static successResponse(message: string): IResponseMessage {
    return {
      access: true,
      message: message,
    };
  }
  static errorResponse(message: string): IResponseMessage {
    return {
      access: false,
      message: message,
    };
  }
}

export default ResponseBuilder;
