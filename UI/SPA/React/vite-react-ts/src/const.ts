// ---------------------------------------------------------------
// 定数定義
// ---------------------------------------------------------------

const FrontendHostRootUrl = 'http://localhost:5173';
const AuthServerRootUrl = 'https://localhost:44300/MultiPurposeAuthSite';
const ResourcesServerRootUrl = 'https://localhost:44335';

// Object.freeze で外部からの変更を防止（元の実装と同様）
const constants = Object.freeze({
  BaseUrl: '~/',
  ClientId: 'f374a155909d486a9234693c34e94479',
  AuthRequestUrl: `${AuthServerRootUrl}/authorize`,
  TokenRequestUrl: `${AuthServerRootUrl}/token`,
  UserInfoRequestUrl: `${AuthServerRootUrl}/userinfo`,
  FetchDataRootUrl: `${FrontendHostRootUrl}/api/sampledata/weatherforecasts?`,
  CrudSampleRootUrl: `${ResourcesServerRootUrl}/api/json/`,
} as const); // as const で型レベルでも読み取り専用に

// 型のエクスポート（必要に応じて使用可能）
export type Constants = typeof constants;

// 個別エクスポート（既存の auth.ts での named import に対応）
export const BaseUrl = constants.BaseUrl;
export const ClientId = constants.ClientId;
export const AuthRequestUrl = constants.AuthRequestUrl;
export const TokenRequestUrl = constants.TokenRequestUrl;
export const UserInfoRequestUrl = constants.UserInfoRequestUrl;
export const FetchDataRootUrl = constants.FetchDataRootUrl;
export const CrudSampleRootUrl = constants.CrudSampleRootUrl;

// デフォルトエクスポート（constants オブジェクトごと使いたい場合）
export default constants;