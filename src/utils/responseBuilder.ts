import { IResponseMessage } from "../types/common";

class ResponseBuilderRPC {
  static successResponse(message: string, code: number): IResponseMessage {
    return {
      access: true,
      code: code,
      message: message,
    };
  }

  static errorResponse(message: string, code: number): IResponseMessage {
    return {
      access: false,
      code: code,
      message: message,
    };
  }
}

export default ResponseBuilderRPC;
