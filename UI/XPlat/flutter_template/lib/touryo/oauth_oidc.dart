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
 
// ---------------------------------------------------------------
// 注意: ブラウザ向けの Web Crypto API の代わりに、
//       Dart の crypto / pointycastle パッケージを使用しています。
//       Flutter Web の場合は dart:html の window.crypto も利用可能です。
// ---------------------------------------------------------------

import '../importer.dart';

export 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import 'package:crypto/crypto.dart';
import 'package:http/http.dart' as http;

// ---------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------
 
/// UserInfo レスポンスの型
class UserInfo {
  final String sub;
  final Map<String, dynamic> extra;
 
  const UserInfo({required this.sub, required this.extra});
 
  factory UserInfo.fromJson(Map<String, dynamic> json) {
    final sub = json['sub'] as String? ?? '';
    final extra = Map<String, dynamic>.from(json)..remove('sub');
    return UserInfo(sub: sub, extra: extra);
  }
 
  Map<String, dynamic> toJson() => {'sub': sub, ...extra};
}
 
/// Token レスポンスの型
class TokenResponse {
  final String? accessToken;
  final Map<String, dynamic> raw;
 
  const TokenResponse({this.accessToken, required this.raw});
 
  factory TokenResponse.fromJson(Map<String, dynamic> json) {
    return TokenResponse(
      accessToken: json['access_token'] as String?,
      raw: json,
    );
  }
}

// ---------------------------------------------------------------
// URLのパラメタを抽出する。
// ---------------------------------------------------------------
 
// ---------------------------------------------------------------
// フラグメント（# ～ の部分）を取得する。
// ---------------------------------------------------------------
/// 引数    uri: 対象の Uri (Flutter Web では Uri.base を渡す)
/// 戻り値  Map&lt;String, String&gt;
Map<String, String> getParameterFromFragment(Uri uri) {
  final fragment = uri.fragment;
  if (fragment.isEmpty) return {};
  return parseQueryString(fragment);
}
 
// ---------------------------------------------------------------
// クエリストリング（? ～ の部分）を取得する。
// ---------------------------------------------------------------
/// 引数    uri: 対象の Uri (Flutter Web では Uri.base を渡す)
/// 戻り値  Map&lt;String, String&gt;
Map<String, String> getParameterFromQueryString(Uri uri) {
  final query = uri.query;
  if (query.isEmpty) return {};
  return parseQueryString(query);
}
 
// ---------------------------------------------------------------
// QueryString を Map に parse する。
// ---------------------------------------------------------------
/// 引数    queryString: クエリ文字列
/// 戻り値  Map&lt;String, String&gt;
Map<String, String> parseQueryString(String queryString) {
  final data = <String, String>{};
  if (queryString.isEmpty) return data;
 
  final pairs = queryString.split('&');
  for (final pair in pairs) {
    final separatorIndex = pair.indexOf('=');
    final String escapedKey;
    final String escapedValue;
 
    if (separatorIndex == -1) {
      escapedKey = pair;
      escapedValue = '';
    } else {
      escapedKey = pair.substring(0, separatorIndex);
      escapedValue = pair.substring(separatorIndex + 1);
    }
 
    final key = Uri.decodeComponent(escapedKey);
    final value = Uri.decodeComponent(escapedValue);
    data[key] = value;
  }
 
  return data;
}

// ---------------------------------------------------------------
// /token にリクエスト
// ---------------------------------------------------------------
/// 引数    code: 認可コード
///         codeVerifier: PKCE の code_verifier
Future<void> callConvertCodeToToken(
  String code,
  String codeVerifier,
) async {
  final uri = Uri.parse(AppConfig.tokenRequestUrl);
  
  try {
    final response = await http.post(
      uri,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:  {
        'grant_type': 'authorization_code',
        'client_id': AppConfig.clientId,
        'code': code,
        'code_verifier': codeVerifier,
      },
    );
 
    fetchStatusHandler(response); // 200 以外は例外を throw
 
    final json = jsonDecode(response.body) as Map<String, dynamic>;
    final tokenResponse = TokenResponse.fromJson(json);
 
    if (tokenResponse.accessToken != null) {
      await callUserInfo(tokenResponse.accessToken!);
    }
  } catch (e, stack) {
    // ignore: avoid_print
    print('callConvertCodeToToken error: $e\n$stack');
    rethrow;
  }
}
 
// ---------------------------------------------------------------
// /userinfo にリクエスト
// ---------------------------------------------------------------
/// 引数    accessToken: Bearer トークン
Future<void> callUserInfo(
  String accessToken,
) async {
  final uri = Uri.parse(AppConfig.userInfoRequestUrl);
 
  try {
    final response = await http.get(
      uri,
      headers: {
        'Authorization': 'Bearer $accessToken',
        'Accept': 'application/json',
      },
    );
 
    fetchStatusHandler(response);
 
    final json = jsonDecode(response.body) as Map<String, dynamic>;
    final userInfo = UserInfo.fromJson(json);
 
    if (userInfo.sub.isNotEmpty) {
      await OAuthOidc.instance.setAccessToken(accessToken);
      await OAuthOidc.instance.setUserInfo(jsonEncode(userInfo.toJson()));
    }
  } catch (e, stack) {
    // ignore: avoid_print
    print('callUserInfo error: $e\n$stack');
    rethrow;
  }
}

// ---------------------------------------------------------------
// HTTPリクエストヘッダの作成
// ---------------------------------------------------------------
/// 引数    isJsonRpc: JSON-RPC 形式なら true
/// 戻り値  Map&lt;String, String&gt;
Future<Map<String, String>> createHttpRequestHeader({bool isJsonRpc = false}) async {
  final headers = <String, String>{
    'Accept': 'application/json',
    'Content-Type': isJsonRpc
        ? 'application/json'
        : 'application/x-www-form-urlencoded',
  };
  final token = await OAuthOidc.instance.getAccessToken(); // ← await を追加
  if (token != null) {
    headers['Authorization'] = 'Bearer $token';
  }
  return headers;
}

// ---------------------------------------------------------------
// ローカルストレージのキー定数
// ---------------------------------------------------------------
class _StorageKeys {
  static const String state = 'state';
  static const String codeVerifier = 'code_verifier';
  static const String accessToken = 'access_token';
  static const String userInfo = 'user_info';
}

// ---------------------------------------------------------------
// SHA-256 ハッシュ化
// ---------------------------------------------------------------
/// 引数    input: ハッシュ化する文字列
/// 戻り値  SHA-256 ハッシュの Uint8List
Uint8List sha256Hash(String input) {
  final bytes = utf8.encode(input);
  final digest = sha256.convert(bytes);
  return Uint8List.fromList(digest.bytes);
}

// // ---------------------------------------------------------------
// OAuth/OIDC シングルトン（状態管理）
// ---------------------------------------------------------------
 
/// SharedPreferences を使った OAuth/OIDC 状態管理クラス。
/// `OAuthOidc.instance` 経由でアクセスする。
class OAuthOidc {
  OAuthOidc._();
  static final OAuthOidc instance = OAuthOidc._();
 
  // ---------------------------------------------------------------
  // 状態の初期化
  // ---------------------------------------------------------------
  Future<void> initSignUpStatus() async {
    //final prefs = await SharedPreferences.getInstance();
    const storage = FlutterSecureStorage();

    // 既存の状態をクリア
    /*await prefs.remove(_StorageKeys.state);
    await prefs.remove(_StorageKeys.codeVerifier);
    await prefs.remove(_StorageKeys.accessToken);
    await prefs.remove(_StorageKeys.userInfo);*/
    await storage.delete(key: _StorageKeys.state);
    await storage.delete(key: _StorageKeys.codeVerifier);
    await storage.delete(key: _StorageKeys.accessToken);
    await storage.delete(key: _StorageKeys.userInfo);
 
    // state
    final state = getRandomString(12);
    //await prefs.setString(_StorageKeys.state, state);
    await storage.write(key: _StorageKeys.state, value: state);

    // code_verifier
    final codeVerifier = getRandomString(64);
    //await prefs.setString(_StorageKeys.codeVerifier, codeVerifier);
    await storage.write(key: _StorageKeys.codeVerifier, value: codeVerifier);
    
    // デバッグ用に state と code_verifier を出力
    final state_ = await OAuthOidc.instance.getState();
    final codeVerifier_ = await OAuthOidc.instance.getCodeVerifier();
    debugPrint('initSignUpStatus: state=$state_, codeVerifier=$codeVerifier_');
  }
 
  // ---------------------------------------------------------------
  // state の取得
  // ---------------------------------------------------------------
  Future<String?> getState() async {
    /*final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_StorageKeys.state);*/
    const storage = FlutterSecureStorage();
    return storage.read(key: _StorageKeys.state);
  }
 
  // ---------------------------------------------------------------
  // code_verifier の取得
  // ---------------------------------------------------------------
  Future<String?> getCodeVerifier() async {
    /*final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_StorageKeys.codeVerifier);*/
    const storage = FlutterSecureStorage();
    return storage.read(key: _StorageKeys.codeVerifier);
  }
 
  // ---------------------------------------------------------------
  // code_challenge の取得
  // ---------------------------------------------------------------
  /// 引数    isS256: S256方式を使うか (false の場合は plain)
  /// 戻り値  code_challenge 文字列
  Future<String> getCodeChallenge(bool isS256) async {
    /*final prefs = await SharedPreferences.getInstance();
    final codeVerifier = prefs.getString(_StorageKeys.codeVerifier);*/
    const storage = FlutterSecureStorage();
    final codeVerifier = await storage.read(key: _StorageKeys.codeVerifier);

    if (codeVerifier == null) {
      throw StateError(
        'code_verifier が見つかりません。initSignUpStatus() を先に呼び出してください。',
      );
    }
 
    if (isS256) {
      // S256 方式
      final hashBytes = sha256Hash(codeVerifier);
      return base64URLEncode(hashBytes);
    }
    else {
      // plain 方式
      return codeVerifier;
    }
  }
 
  // ---------------------------------------------------------------
  // access_token の設定
  // ---------------------------------------------------------------
  Future<void> setAccessToken(String accessToken) async {
    /*final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_StorageKeys.accessToken, accessToken);*/
    const storage = FlutterSecureStorage();
    await storage.write(key: _StorageKeys.accessToken, value: accessToken);

  }
 
  // ---------------------------------------------------------------
  // access_token の取得
  // ---------------------------------------------------------------
  Future<String?> getAccessToken() async {
    /*final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_StorageKeys.accessToken);*/
    const storage = FlutterSecureStorage();
    return storage.read(key: _StorageKeys.accessToken);
  }
 
  // ---------------------------------------------------------------
  // user_info の設定
  // ---------------------------------------------------------------
  Future<void> setUserInfo(String userInfo) async {
    /*final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_StorageKeys.userInfo, userInfo);*/
    const storage = FlutterSecureStorage();
    await storage.write(key: _StorageKeys.userInfo, value: userInfo);
  }
 
  // ---------------------------------------------------------------
  // user_info の取得
  // ---------------------------------------------------------------
  Future<String?> getUserInfo() async {
    /*final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_StorageKeys.userInfo);*/
    const storage = FlutterSecureStorage();
    return storage.read(key: _StorageKeys.userInfo);
  }
}
 
