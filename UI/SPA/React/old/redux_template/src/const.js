// const.js
let FrontendHostRootUrl = 'http://localhost:3000';
let AuthServerRootUrl = 'https://localhost:44300/MultiPurposeAuthSite';
let ResourcesServerRootUrl = 'https://localhost:44335';

let constants = {
    BaseUrl: '~/',
    ClientId: 'f374a155909d486a9234693c34e94479',
    AuthRequestUrl: AuthServerRootUrl + '/authorize',
    TokenRequestUrl: AuthServerRootUrl + '/token',
    UserInfoRequestUrl: AuthServerRootUrl + '/userinfo',
    FetchDataRootUrl: FrontendHostRootUrl + '/api/sampledata/weatherforecasts?',
    CrudSampleRootUrl: ResourcesServerRootUrl + '/api/json/'
};

module.exports = Object.freeze(constants); // freeze prevents changes by users