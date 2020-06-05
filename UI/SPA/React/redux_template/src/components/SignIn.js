import * as React from 'react';

import {ClientId, AuthRequestUrl, FrontendHostRootUrl} from '../const.js';
import {callUserInfo} from '../common.js';

import common from '../touryo/common.js';
import oauth_oidc from '../touryo/oauth_oidc';

export default class SignIn extends React.Component {
    constructor() {
        super();
        this.state = { isSignedIn: false };
        this.signedIn = this.signedIn.bind(this);

        let access_token = oauth_oidc.getAccessToken();
        if(access_token){
            callUserInfo(access_token, this.signedIn);
        }
    }
    render() {
        if(this.state.isSignedIn)
        {
            let userInfo = JSON.parse(oauth_oidc.getUserInfo());
            return <div>
                <a onClick={ () => { this.signOut() } }>Sign Out({ userInfo.sub })</a>
            </div>;
        }
        else
        {
            return <div>
                <a onClick={ () => { this.authRequest() } }>Sign In</a>
            </div>;
        }
    }
    authRequest() {
        // 初期化
        common.initStringFormat();
        oauth_oidc.initSignUpStatus();

        let state = oauth_oidc.getState();
        let code_challenge = oauth_oidc.getCodeChallenge(true);

        // 認可リクエスト
        let params =
            "?client_id={0}&response_type=code&scope=profile%20email%20phone%20address%20userid%20roles"
            + "&state={1}&code_challenge={2}&code_challenge_method=S256&response_mode=fragment";
                    
        params = params.format(ClientId, state, code_challenge);
        window.location.href = AuthRequestUrl + params;
    }
    signedIn() {
        this.setState({ isSignedIn: true });
    }
    signOut() {
        oauth_oidc.initSignUpStatus();
        window.location.href = FrontendHostRootUrl;
    }
}