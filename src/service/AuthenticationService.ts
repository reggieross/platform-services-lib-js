import { HttpClient } from '../client/HttpClient';
import { CookieMonster } from '../utils';
import { ENV } from '../env';
import { UserInfo } from '../types';

const authServiceURI = ENV.AUTHENTICATION_URL;
export enum ResponseType {
  SUCCESS,
}

export type LoginResp =
  | ResponseType
  | {
      status: number;
      message: string;
    };

export interface ValidateTokenResponse {
  valid: boolean;
  user?: UserInfo;
}

const login = async (
  username: string,
  password: string
): Promise<LoginResp> => {
  const res = await HttpClient.post(`${authServiceURI}/login/user`, {
    username,
    password,
  });

  return res.statusCode === 200
    ? ResponseType.SUCCESS
    : { status: res.statusCode, message: '' };
};

const validateToken = async (
  accessToken: string,
  decodeAfterValidations: boolean = false
): Promise<ValidateTokenResponse> => {
  const res = await HttpClient.get(
    `${authServiceURI}/token/validate?decode=${decodeAfterValidations}`,
    `access_token=${accessToken}`
  );
  return res.responseObj as ValidateTokenResponse;
};

export const AuthenticationService = {
  login,
  validateToken,
};
