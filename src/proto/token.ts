import { EUserResponse } from "../config/messages";
import tokenService from "../service/tokenService";
import { logMessage } from "../utils/logger";
import ResponseBuilder from "../utils/responseBuilder";

export function handleValidateTokenPermission(call: any, callback: any) {
  const { token, permission } = call.request;
  const verifiedToken = tokenService.validateAccessToken(token);

  if (!verifiedToken) {
    callback(null, ResponseBuilder.errorResponse(EUserResponse.TOKEN_INVALID));
    return;
  }

  const hasPermission = verifiedToken.permissions.includes(permission);
  if (hasPermission) {
    callback(
      null,
      ResponseBuilder.successResponse(EUserResponse.HAS_PERMISSION)
    );
  } else {
    callback(null, ResponseBuilder.errorResponse(EUserResponse.NO_PERMISSION));
  }
  logMessage("info", "handleValidateTokenPermission");
}

export function handleValidateToken(call: any, callback: any) {
  const { token } = call.request;
  const validationResult = tokenService.validateAccessToken(token);

  if (!validationResult) {
    callback(null, ResponseBuilder.errorResponse(EUserResponse.TOKEN_INVALID));
  } else {
    callback(null, ResponseBuilder.successResponse(EUserResponse.TOKEN_VALID));
  }
  logMessage("info", "handleValidateToken");
}
