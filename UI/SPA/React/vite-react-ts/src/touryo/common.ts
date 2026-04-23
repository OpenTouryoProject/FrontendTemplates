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
// fetch のレスポンスのステータスコードをチェック
// ---------------------------------------------------------------
export function fetchStatusHandler(response: Response): Response {
  if (response.status === 200) {
    return response;
  } else {
    throw new Error(response.statusText);
  }
}

// ---------------------------------------------------------------
// 型拡張：String.prototype.format を TypeScript に認識させる
// ---------------------------------------------------------------
declare global {
  interface String {
    format(...args: unknown[]): string;
  }
}

// ---------------------------------------------------------------
// ランダム文字列を取得する。
// ---------------------------------------------------------------
// 引数    l（生成する文字列の長さ）
// 戻り値  ランダム文字列
// ---------------------------------------------------------------
export function getRandomString(l: number): string {
  const c = "abcdefghijklmnopqrstuvwxyz0123456789";
  const cl = c.length;
  let r = "";
  for (let i = 0; i < l; i++) {
    r += c[Math.floor(Math.random() * cl)];
  }
  return r;
}

// ---------------------------------------------------------------
// 文字列を ASCII（Uint8Array）に変換する。
// ---------------------------------------------------------------
// 引数    str
// 戻り値  Uint8Array
// ---------------------------------------------------------------
export function stringToAscii(str: string): Uint8Array {
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}

// ---------------------------------------------------------------
// Base64URL エンコーディングする。
// ---------------------------------------------------------------
// 引数    buffer（ArrayBuffer または Uint8Array）
// 戻り値  Base64URL エンコーディングした値
// ---------------------------------------------------------------
export function base64URLEncode(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  // btoa はブラウザ標準の Base64 エンコード関数
  const base64 = btoa(String.fromCharCode(...bytes));
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// ---------------------------------------------------------------
// JavaScriptで .NET ライクな String.Format() を初期化する。
// ---------------------------------------------------------------
export function initStringFormat(): void {
  if (!String.prototype.format) {
    String.prototype.format = function (...args: unknown[]): string {
      return this.replace(/{(\d+)}/g, (match: string, number: string) => {
        return typeof args[Number(number)] !== 'undefined'
          ? String(args[Number(number)])
          : match;
      });
    };
  }
}

// 全関数をオブジェクトとしてデフォルトエクスポート
const common = {
  fetchStatusHandler,
  getRandomString,
  stringToAscii,
  base64URLEncode,
  initStringFormat,  
};

export default common;