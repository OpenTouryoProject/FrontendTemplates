export const FrontendHostRootUrl = 'http://localhost:5173';
export const AuthServerRootUrl = 'https://localhost:44300/MultiPurposeAuthSite';
export const ResourcesServerRootUrl = 'https://localhost:44335';

const constants = Object.freeze({
    BaseUrl: '~/',
    ClientId: 'f374a155909d486a9234693c34e94479',
    FrontendHostRootUrl,
    AuthServerRootUrl,
    ResourcesServerRootUrl,
    AuthRequestUrl: `${AuthServerRootUrl}/authorize`,
    TokenRequestUrl: `${AuthServerRootUrl}/token`,
    UserInfoRequestUrl: `${AuthServerRootUrl}/userinfo`,
    FetchDataRootUrl: `${ResourcesServerRootUrl}/api/sampledata/weatherforecasts?`,
    CrudSampleRootUrl: `${ResourcesServerRootUrl}/api/json/`
} as const);

export default constants;