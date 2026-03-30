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

// -----------------------------------------------------------
// URLのパラメタを抽出する。
// -----------------------------------------------------------

// -----------------------------------------------------------
// フラグメント（# ～ の部分）を取得する。
// ---------------------------------------------------------------
// 引数    －
// 戻り値  object
// -----------------------------------------------------------
exports.getParameterFromFragment = function () {
    // URLの「#」記号の後の部分を取得し、
    let temp = window.location.hash;
    window.location.hash = "";

    if (temp.indexOf("#") === 0) {
        // # が1文字目にある場合
        // 2文字目以降をobjectにparse。
        return parseQueryString(temp.substr(1));
    } else {
        // そうではない場合。
        return {}; // 空
    }
}

// -----------------------------------------------------------
// クエリストリング（? ～ の部分）を取得する。
// ---------------------------------------------------------------
// 引数    －
// 戻り値  object
// -----------------------------------------------------------
exports.getParameterFromQueryString = function () {
    // URLの「#」記号の後の部分を取得し、
    let temp = window.location.search;
    window.location.search = "";

    if (temp.indexOf("?") === 0) {
        // ? が1文字目にある場合
        // 2文字目以降をobjectにparse。
        return parseQueryString(temp.substr(1));
    } else {
        // そうではない場合。
        return {}; // 空
    }
}

// -----------------------------------------------------------
// QueryStringをobjectにparseする。
// ---------------------------------------------------------------
// 引数    queryString
// 戻り値  object
// -----------------------------------------------------------
function parseQueryString(queryString) {
    //alert(queryString);
    var data = {},
        pairs, pair, separatorIndex, escapedKey, escapedValue, key, value;

    if (queryString === null) {
        return data; // 空で返す。
    }

    // 分解して、
    pairs = queryString.split("&");

    // 詰めて、
    for (var i = 0; i < pairs.length; i++) {
        pair = pairs[i];
        separatorIndex = pair.indexOf("=");

        if (separatorIndex === -1) {
            escapedKey = pair;
            escapedValue = null;
        } else {
            escapedKey = pair.substr(0, separatorIndex);
            escapedValue = pair.substr(separatorIndex + 1);
        }

        key = decodeURIComponent(escapedKey);
        value = decodeURIComponent(escapedValue);

        // インデクサで。
        data[key] = value;
    }

    // 返す。
    return data;
}

// ---------------------------------------------------------------
// ランダム文字列を取得する。
// ---------------------------------------------------------------
// 引数    l(len)
// 戻り値  ランダム文字列
// ---------------------------------------------------------------
exports.getRandomString = function (l) {
    // https://qiita.com/ryounagaoka/items/4736c225bdd86a74d59c
    // 生成する文字列に含める文字セット
    var c = "abcdefghijklmnopqrstuvwxyz0123456789";
    var cl = c.length;
    var r = "";
    for (var i = 0; i < l; i++) {
        r += c[Math.floor(Math.random() * cl)];
    }
    return r;
}

// ---------------------------------------------------------------
// 文字列をASCIIに変換する。
// ---------------------------------------------------------------
// 引数    str(string)
// 戻り値  ASCII(Uint8Array)
// ---------------------------------------------------------------
exports.stringToAscii = function (str) {
    let bytes = new Uint8Array(str.length);
    for (var i = 0; i < str.length; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes;
}

// ---------------------------------------------------------------
// Base64URLエンコーディングする。
// ---------------------------------------------------------------
// 引数    buffer(ArrayBuffer)
// 戻り値  Base64URLエンコーディングした値(string)
// ---------------------------------------------------------------
exports.base64URLEncode = function (buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

// -----------------------------------------------------------
// JavaScriptで.NETライクなString.Format()
// -----------------------------------------------------------
exports.initStringFormat = function(){
    if (!String.prototype.format) {
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined'? args[number]: match;
            });
        };
    }
}