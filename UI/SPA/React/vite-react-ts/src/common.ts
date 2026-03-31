import { ClientId, TokenRequestUrl, UserInfoRequestUrl } from './const';
import oauth_oidc from './touryo/oauth_oidc';

// UserInfo の型定義
interface UserInfo {
  sub: string;
  [key: string]: unknown;
}

interface TokenResponse {
  access_token?: string;
  [key: string]: unknown;
}

// ---------------------------------------------------------------
// /token にリクエスト
// ---------------------------------------------------------------
export function callConvertCodeToToken(
  code: string,
  code_verifier: string,
  callback: () => void
): void {
  const method = "POST";
  const headers: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const body =
    "grant_type=authorization_code" +
    "&client_id=" + ClientId +
    "&code=" + code +
    "&code_verifier=" + code_verifier;

  fetch(TokenRequestUrl, { method, headers, body })
    .then(fetchStatusHandler)
    .then((response) => response.json() as Promise<TokenResponse>)
    .then((data) => {
      if (data.access_token) {
        callUserInfo(data.access_token, callback);
      }
    })
    .catch((error: Error) => {
      alert("error.stack: " + error.stack);
    });
}

// ---------------------------------------------------------------
// /userinfo にリクエスト
// ---------------------------------------------------------------
export function callUserInfo(
  access_token: string,
  callback: () => void
): void {
  const method = "GET";
  const headers: HeadersInit = {
    Authorization: "Bearer " + access_token,
    Accept: "application/json",
  };

  fetch(UserInfoRequestUrl, { method, headers })
    .then(fetchStatusHandler)
    .then((response) => response.json() as Promise<UserInfo>)
    .then((userInfo) => {
      if (userInfo.sub) {
        oauth_oidc.setAccessToken(access_token);
        oauth_oidc.setUserInfo(JSON.stringify(userInfo));
        callback();
      }
    })
    .catch((error: Error) => {
      alert("error.stack: " + error.stack);
    });
}

// ---------------------------------------------------------------
// fetch ステータスハンドラ
// ---------------------------------------------------------------
function fetchStatusHandler(response: Response): Response {
  if (response.status === 200) {
    return response;
  } else {
    throw new Error(response.statusText);
  }
}