import * as React from 'react';
import {ClientId, TokenRequestUrl, UserInfoRequestUrl} from './const.js';
import oauth_oidc from './touryo/oauth_oidc';

// ---------------------------------------------------------------
// /tokenにリクエスト
// ---------------------------------------------------------------
// 引数    code, code_verifier, callback
// 戻り値  －
// ---------------------------------------------------------------
export function callConvertCodeToToken(code, code_verifier, callback) {

    // リクエストの生成
    const method = "POST";
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    const body = 
        "grant_type=authorization_code"
        + "&client_id=" + ClientId
        + "&code=" + code
        + "&code_verifier=" + code_verifier;
        
    // fetchする。
    fetch(TokenRequestUrl, {method, headers, body})　
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(data => 
      {
        if(data.access_token)
        {
            callUserInfo(data.access_token, callback);
        }
      }
    )
    .catch(
      // 異常系
      error => {
        alert("error.stack: " + error.stack);
        return "";
      }
    );
}

// ---------------------------------------------------------------
// /userinfoにリクエスト
// ---------------------------------------------------------------
// 引数    access_token, callback
// 戻り値  －
// ---------------------------------------------------------------
export function callUserInfo(access_token, callback) {
    // リクエストの生成
    const method = "GET";
    const headers = {
        'Authorization': 'Bearer ' + access_token,
        'Accept': 'application/json',
    };

    // fetchする。
    fetch(UserInfoRequestUrl, {method, headers})　
    .then(fetchStatusHandler)
    .then(response => response.json())
    .then(userInfo => 
      {
        if(userInfo.sub)
        {
            oauth_oidc.setAccessToken(access_token);
            oauth_oidc.setUserInfo(JSON.stringify(userInfo));
            callback();
        }
      }
    )
    .catch(
      // 異常系
      error => {
        alert("error.stack: " + error.stack);
        return "";
      }
    );
}

function fetchStatusHandler(response) {
    if (response.status === 200) {
        return response;
    }
    else {
        throw new Error(response.statusText);
    }
  }
