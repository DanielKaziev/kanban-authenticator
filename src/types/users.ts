import { EUserState } from "../config/state";

export interface IUserTokensPayload {
  username: string;
  email: string;
  state: EUserState;
  permissions: Array<string>;
}

export interface IBaseUserCredentials {
  email: string;
  password: string;
}

export interface ICreateUserCredentials extends IBaseUserCredentials {
  username: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenData {
  id: string;
  username: string;
  email: string;
  state: string;
  permissions: Array<string>;
  iat: number;
  exp: number;
}
