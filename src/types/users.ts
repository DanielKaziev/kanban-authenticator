import { EUserState } from "../config/state";

export interface IUserTokensPayload {
  username: string;
  email: string;
  state: EUserState;
}

export interface IUserCredentials {
  email: string;
  password: string;
  username: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
