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

// モジュール定義
const crypto = require('crypto');
//const $ = require('jQuery');
const common = require('./common.js');

// ---------------------------------------------------------------
// 状態の初期化
// ---------------------------------------------------------------
// 引数    －
// 戻り値  －
// ---------------------------------------------------------------
exports.initSignUpStatus = function () {
    // init
    localStorage.removeItem('state');
    localStorage.removeItem('code_verifier');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_info');
    
    // state
    let state = common.getRandomString(12);
    localStorage.setItem('state', state);

    // code_verifier
    let code_verifier = common.getRandomString(64);
    localStorage.setItem('code_verifier', code_verifier);
}

// ---------------------------------------------------------------
// stateの取得
// ---------------------------------------------------------------
// 引数    －
// 戻り値  －
// ---------------------------------------------------------------
exports.getState = function () {
    return localStorage.getItem('state');
}

// ---------------------------------------------------------------
// code_verifierの取得
// ---------------------------------------------------------------
// 引数    －
// 戻り値  －
// ---------------------------------------------------------------
exports.getCodeVerifier = function () {
    return localStorage.getItem('code_verifier');
}

// ---------------------------------------------------------------
// code_challengeの取得
// ---------------------------------------------------------------
// 引数    isS256
// 戻り値  code_challenge
// ---------------------------------------------------------------
exports.getCodeChallenge = function (isS256) {
    let code_verifier = localStorage.getItem('code_verifier');

    let code_challenge = '';

    if(isS256)
    {
        let ascii_str = common.stringToAscii(code_verifier);
        code_challenge = common.base64URLEncode(sha256(ascii_str));
    }
    else
    {
        code_challenge = code_verifier;
    }

    return code_challenge;
}

// ---------------------------------------------------------------
// access_tokenの設定
// ---------------------------------------------------------------
// 引数    access_token
// 戻り値  －
// ---------------------------------------------------------------
exports.setAccessToken = function (access_token) {
    localStorage.setItem('access_token', access_token);
}

// ---------------------------------------------------------------
// access_tokenの取得
// ---------------------------------------------------------------
// 引数    －
// 戻り値  access_token
// ---------------------------------------------------------------
exports.getAccessToken = function () {
    return localStorage.getItem('access_token');
}

// ---------------------------------------------------------------
// user_infoの設定
// ---------------------------------------------------------------
// 引数    user_info
// 戻り値  －
// ---------------------------------------------------------------
exports.setUserInfo = function (user_info) {
    localStorage.setItem('user_info', user_info);
}

// ---------------------------------------------------------------
// user_infoの取得
// ---------------------------------------------------------------
// 引数    －
// 戻り値  user_info
// ---------------------------------------------------------------
exports.getUserInfo = function () {
    return localStorage.getItem('user_info');
}

// ---------------------------------------------------------------
// S256で暗号化・ハッシュ化する。
// ---------------------------------------------------------------
// 引数    buffer(UInt8Array)
// 戻り値  S256で暗号化・ハッシュ化した値(Uint8Array)
// ---------------------------------------------------------------
function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
}
