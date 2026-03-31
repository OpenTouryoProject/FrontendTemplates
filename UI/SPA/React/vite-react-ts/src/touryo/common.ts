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
// 型拡張：String.prototype.format を TypeScript に認識させる
// ---------------------------------------------------------------
declare global {
  interface String {
    format(...args: unknown[]): string;
  }
}

// ---------------------------------------------------------------
// URLのパラメタを抽出する。
// ---------------------------------------------------------------

// -----------------------------------------------------------
// フラグメント（# ～ の部分）を取得する。
// ---------------------------------------------------------------
// 引数    －
// 戻り値  Record<string, string>
// -----------------------------------------------------------
export function getParameterFromFragment(): Record<string, string> {
  const temp = window.location.hash;
  window.location.hash = "";

  if (temp.indexOf("#") === 0) {
    // # が1文字目にある場合
    // 2文字目以降を object に parse
    return parseQueryString(temp.substring(1));
  } else {
    return {}; // 空
  }
}

// -----------------------------------------------------------
// クエリストリング（? ～ の部分）を取得する。
// ---------------------------------------------------------------
// 引数    －
// 戻り値  Record<string, string>
// -----------------------------------------------------------
export function getParameterFromQueryString(): Record<string, string> {
  const temp = window.location.search;
  // ※ window.location.search への代入はブラウザで無視されるため
  //    URLSearchParams を使う形に変更
  if (temp.indexOf("?") === 0) {
    // ? が1文字目にある場合
    // 2文字目以降を object に parse
    return parseQueryString(temp.substring(1));
  } else {
    return {}; // 空
  }
}

// -----------------------------------------------------------
// QueryString を object に parse する。
// ---------------------------------------------------------------
// 引数    queryString
// 戻り値  Record<string, string>
// -----------------------------------------------------------
function parseQueryString(queryString: string): Record<string, string> {
  const data: Record<string, string> = {};

  if (!queryString) {
    return data; // 空で返す
  }

  const pairs = queryString.split("&");

  for (const pair of pairs) {
    const separatorIndex = pair.indexOf("=");

    let escapedKey: string;
    let escapedValue: string;

    if (separatorIndex === -1) {
      escapedKey = pair;
      escapedValue = "";
    } else {
      escapedKey = pair.substring(0, separatorIndex);
      escapedValue = pair.substring(separatorIndex + 1);
    }

    const key = decodeURIComponent(escapedKey);
    const value = decodeURIComponent(escapedValue);

    data[key] = value;
  }

  return data;
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