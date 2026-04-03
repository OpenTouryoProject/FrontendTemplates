import * as React from 'react';
import constants from '../const';
import oauth_oidc from '../touryo/oauth_oidc';

export class RedirectOfAuth extends React.Component {
    render(): React.ReactElement {
        if (window.location.hash.indexOf("code=") !== -1) {
            // Tokenリクエスト
            const params: Record<string, string> = oauth_oidc.getParameterFromFragment();
            const code: string = params.code;
            const code_verifier: string = oauth_oidc.getCodeVerifier() ?? "";
            // alert("code: " + code);
            // alert("code_verifier: " + code_verifier);
            oauth_oidc.callConvertCodeToToken(code, code_verifier, this.transfer);
        }
        return <div>...</div>;
    }

    transfer(): void {
        window.location.href = constants.FrontendHostRootUrl;
    }
}