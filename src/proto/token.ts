import { EUserResponse } from "../config/messages";
import tokenService from "../service/tokenService";
import { logMessage } from "../utils/logger";
import ResponseBuilderRPC from "../utils/responseBuilder";

export function handleValidateTokenPermission(call: any, callback: any) {
  logMessage("info", "handleValidateTokenPermission");
  const { token, permission } = call.request;
  const verifiedToken = tokenService.validateAccessToken(token);

  if (!verifiedToken) {
    callback(
      null,
      ResponseBuilderRPC.errorResponse(EUserResponse.TOKEN_INVALID, 401)
    );
    return;
  }

  const hasPermission = verifiedToken.permissions.includes(permission);
  if (hasPermission) {
    callback(
      null,
      ResponseBuilderRPC.successResponse(EUserResponse.HAS_PERMISSION, 200)
    );
  } else {
    callback(
      null,
      ResponseBuilderRPC.errorResponse(EUserResponse.NO_PERMISSION, 403)
    );
  }
}

export function handleValidateToken(call: any, callback: any) {
  logMessage("info", "handleValidateToken");
  const { token } = call.request;
  const validationResult = tokenService.validateAccessToken(token);

  if (!validationResult) {
    callback(
      null,
      ResponseBuilderRPC.errorResponse(EUserResponse.TOKEN_INVALID, 401)
    );
  } else {
    callback(
      null,
      ResponseBuilderRPC.successResponse(EUserResponse.TOKEN_VALID, 204)
    );
  }
}
