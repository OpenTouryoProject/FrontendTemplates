import * as React from 'react';

import constants from '../const';
import common from '../touryo/common';
import oauth_oidc from '../touryo/oauth_oidc';

// String.prototype.format の型宣言 (touryo/common.ts で実装済み)
declare global {
    interface String {
        format(...args: unknown[]): string;
    }
}

interface UserInfo {
    sub: string;
    [key: string]: unknown;
}

interface SignInState {
    isSignedIn: boolean;
}

export default class SignIn extends React.Component<
    Record<string, never>,
    SignInState
> {
    constructor(props: Record<string, never>) {
        super(props);
        this.state = { isSignedIn: false };
        this.signedIn = this.signedIn.bind(this);

        const access_token = oauth_oidc.getAccessToken();
        if (access_token) {
            oauth_oidc.callUserInfo(access_token, this.signedIn);
        }
    }

    render() {
        if (this.state.isSignedIn) {
            const userInfo: UserInfo = JSON.parse(oauth_oidc.getUserInfo() ?? "{}") as UserInfo;
            return (
                <div>
                    <a onClick={() => { this.signOut(); }}>
                        Sign Out({userInfo.sub})
                    </a>
                </div>
            );
        } else {
            return (
                <div>
                    <a href="#" onClick={() => { this.authRequest(); }}>Sign In</a>
                </div>
            );
        }
    }

    async authRequest() {
        // 初期化
        common.initStringFormat();
        oauth_oidc.initSignUpStatus();

        const state = oauth_oidc.getState();
        const code_challenge = await oauth_oidc.getCodeChallenge(true);

        // 認可リクエスト
        let params =
            '?client_id={0}&response_type=code&scope=profile%20email%20phone%20address%20userid%20roles'
            + '&state={1}&code_challenge={2}&code_challenge_method=S256&response_mode=fragment';

        params = params.format(constants.ClientId, state, code_challenge);
        window.location.href = constants.AuthRequestUrl + params;
    }

    signedIn() {
        this.setState({ isSignedIn: true });
    }

    signOut() {
        oauth_oidc.initSignUpStatus();
        window.location.href = constants.FrontendHostRootUrl;
    }
}
