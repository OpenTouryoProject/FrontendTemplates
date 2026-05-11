/*
fromEnvironmentを使用して、ビルド時に環境変数から値を取得する方法。
これにより、開発環境と本番環境で異なる設定を簡単に切り替えられる。

# 開発
flutter run --dart-define-from-file=config.json
# 本番ビルド
flutter build apk --dart-define-from-file=config.prod.json
*/

class AppConfig {
  // 基本URL
  static const String authServerRootUrl = String.fromEnvironment(
    'AUTH_SERVER_ROOT_URL',
    defaultValue: 'https://localhost:44300/MultiPurposeAuthSite',
  );
  static const String resourcesServerRootUrl = String.fromEnvironment(
    'RESOURCES_SERVER_ROOT_URL',
    defaultValue: 'https://localhost:44335',
  );

  // クライアント設定
  static const String baseUrl = '~/';
  static const String clientId = String.fromEnvironment(
    'CLIENT_ID',
    defaultValue: '40319c0100f94ff3aab3004c8bdb5e52',
  );
  static const String redirectUrl = String.fromEnvironment(
    'REDIRECT_URL',
    defaultValue: 'myapp:/oauthredirect',
  );

  // 派生URL（文字列補間はconstにできないためstaticゲッターで定義）
  static String get authRequestUrl => '$authServerRootUrl/authorize';
  static String get tokenRequestUrl => '$authServerRootUrl/token';
  static String get userInfoRequestUrl => '$authServerRootUrl/userinfo';
  static String get fetchDataRootUrl => '$resourcesServerRootUrl/api/sampledata/weatherforecasts?';
  static String get crudSampleRootUrl => '$resourcesServerRootUrl/api/json/';
}