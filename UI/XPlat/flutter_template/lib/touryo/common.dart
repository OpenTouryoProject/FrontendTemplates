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

import '../importer.dart';
import 'package:http/http.dart' as http;

// ---------------------------------------------------------------
// HTTP レスポンスのステータスコードをチェック
// ---------------------------------------------------------------
http.Response fetchStatusHandler(http.Response response) {
  if (response.statusCode == 200) {
    return response;
  } else {
    throw Exception(response.reasonPhrase ?? 'HTTP ${response.statusCode}');
  }
}

// ---------------------------------------------------------------
// ランダム文字列を取得する。
// ---------------------------------------------------------------
// 引数    l（生成する文字列の長さ）
// 戻り値  ランダム文字列
// ---------------------------------------------------------------
String getRandomString(int l) {
  const c = 'abcdefghijklmnopqrstuvwxyz0123456789';
  final cl = c.length;
  final random = Random();
  final buffer = StringBuffer();
  for (int i = 0; i < l; i++) {
    buffer.write(c[random.nextInt(cl)]);
  }
  return buffer.toString();
}

// ---------------------------------------------------------------
// 文字列を ASCII（Uint8List）に変換する。
// ---------------------------------------------------------------
// 引数    str
// 戻り値  Uint8List
// ---------------------------------------------------------------
Uint8List stringToAscii(String str) {
  return Uint8List.fromList(str.codeUnits);
}

// ---------------------------------------------------------------
// Base64URL エンコーディングする。
// ---------------------------------------------------------------
// 引数    bytes（Uint8List）
// 戻り値  Base64URL エンコーディングした値
// ---------------------------------------------------------------
String base64URLEncode(Uint8List bytes) {
  return base64Url
      .encode(bytes)
      .replaceAll('=', '');
}

// ---------------------------------------------------------------
// .NET ライクな String.format() を Extension で実装する。
// ---------------------------------------------------------------
// 使用例: '{0}はいつも{1}'.format(['Dart', '最高'])
// ---------------------------------------------------------------
extension StringFormat on String {
  String format(List<Object?> args) {
    return replaceAllMapped(RegExp(r'\{(\d+)\}'), (match) {
      final index = int.parse(match.group(1)!);
      if (index < args.length && args[index] != null) {
        return args[index].toString();
      }
      return match.group(0)!;
    });
  }
}
