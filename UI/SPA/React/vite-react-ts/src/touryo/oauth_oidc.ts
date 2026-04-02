// Apache License
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
 
// ---------------------------------------------------------------
// 注意: Node.js の crypto モジュールはブラウザ非対応のため、
//       Web Crypto API (globalThis.crypto) に置き換えています。
// ---------------------------------------------------------------

import { getRandomString, base64URLEncode } from './common.ts';
 
// ---------------------------------------------------------------
// ローカルストレージのキー定数
// ---------------------------------------------------------------
const STORAGE_KEYS = {
  STATE: 'state',
  CODE_VERIFIER: 'code_verifier',
  ACCESS_TOKEN: 'access_token',
  USER_INFO: 'user_info',
} as const;
 
// ---------------------------------------------------------------
// SHA-256 ハッシュ化 (Web Crypto API 使用・非同期)
// ---------------------------------------------------------------
// 引数    input: ハッシュ化する文字列
// 戻り値  SHA-256 ハッシュの ArrayBuffer (Promise)
// ---------------------------------------------------------------
async function sha256(input: string): Promise<ArrayBuffer> {
  const encoded = new TextEncoder().encode(input);
   return await crypto.subtle.digest('SHA-256', encoded);
}

// ---------------------------------------------------------------
// 状態の初期化
// ---------------------------------------------------------------
// 引数    －
// 戻り値  －
// ---------------------------------------------------------------
export function initSignUpStatus(): void {
  // init
  localStorage.removeItem(STORAGE_KEYS.STATE);
  localStorage.removeItem(STORAGE_KEYS.CODE_VERIFIER);
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_INFO);
 
  // state
  const state = getRandomString(12);
  localStorage.setItem(STORAGE_KEYS.STATE, state);
 
  // code_verifier
  const code_verifier = getRandomString(64);
  localStorage.setItem(STORAGE_KEYS.CODE_VERIFIER, code_verifier);
}
 
// ---------------------------------------------------------------
// state の取得
// ---------------------------------------------------------------
// 引数    －
// 戻り値  state 文字列 または null
// ---------------------------------------------------------------
export function getState(): string | null {
  return localStorage.getItem(STORAGE_KEYS.STATE);
}
 
// ---------------------------------------------------------------
// code_verifier の取得
// ---------------------------------------------------------------
// 引数    －
// 戻り値  code_verifier 文字列 または null
// ---------------------------------------------------------------
export function getCodeVerifier(): string | null {
  return localStorage.getItem(STORAGE_KEYS.CODE_VERIFIER);
}
 
// ---------------------------------------------------------------
// code_challenge の取得
// ---------------------------------------------------------------
// 引数    isS256: S256方式を使うか (false の場合は plain)
// 戻り値  code_challenge 文字列 (Promise)
// ---------------------------------------------------------------
export async function getCodeChallenge(isS256: boolean): Promise<string> {
  const code_verifier = localStorage.getItem(STORAGE_KEYS.CODE_VERIFIER);
 
  if (!code_verifier) {
    throw new Error('code_verifier が見つかりません。initSignUpStatus() を先に呼び出してください。');
  }
 
  if (isS256) {
    const hashBuffer = await sha256(code_verifier);
    return base64URLEncode(hashBuffer);
  }
 
  // plain 方式
  return code_verifier;
}
 
// ---------------------------------------------------------------
// access_token の設定
// ---------------------------------------------------------------
// 引数    access_token
// 戻り値  －
// ---------------------------------------------------------------
export function setAccessToken(access_token: string): void {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access_token);
}
 
// ---------------------------------------------------------------
// access_token の取得
// ---------------------------------------------------------------
// 引数    －
// 戻り値  access_token 文字列 または null
// ---------------------------------------------------------------
export function getAccessToken(): string | null {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}
 
// ---------------------------------------------------------------
// user_info の設定
// ---------------------------------------------------------------
// 引数    user_info
// 戻り値  －
// ---------------------------------------------------------------
export function setUserInfo(user_info: string): void {
  localStorage.setItem(STORAGE_KEYS.USER_INFO, user_info);
}
 
// ---------------------------------------------------------------
// user_info の取得
// ---------------------------------------------------------------
// 引数    －
// 戻り値  user_info 文字列 または null
// ---------------------------------------------------------------
export function getUserInfo(): string | null {
  return localStorage.getItem(STORAGE_KEYS.USER_INFO);
}

// 全関数をオブジェクトとしてデフォルトエクスポート
const oauth_oidc = {
  initSignUpStatus,
  getState,
  getCodeVerifier,
  getCodeChallenge,
  setAccessToken,
  getAccessToken,
  setUserInfo,
  getUserInfo,
};

export default oauth_oidc;