import { IResponseMessage } from "../types/common";

class ResponseBuilder {
  static createResponse(access: boolean, message: string): IResponseMessage {
    return {
      access: access,
      message: message,
    };
  }
}

export default ResponseBuilder;
