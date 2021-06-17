import * as React from 'react';

import {FrontendHostRootUrl} from '../const.js';
import {callConvertCodeToToken} from '../common.js';

import util from '../touryo/common.js';
import oauth_oidc from '../touryo/oauth_oidc';

export class RedirectOfAuth extends React.Component {
    render() {
        if(window.location.hash.indexOf("code=") !== -1)
        {
            // Tokenリクエスト
            let params = util.getParameterFromFragment();
            let code = params.code;
            let code_verifier = oauth_oidc.getCodeVerifier();
            // alert("code: " + code);
            // alert("code_verifier: " + code_verifier);
            callConvertCodeToToken(code, code_verifier, this.transfer);
        }
        return <div>...</div>;
    }
    transfer() {
      window.location.href = FrontendHostRootUrl;
    }
    
}