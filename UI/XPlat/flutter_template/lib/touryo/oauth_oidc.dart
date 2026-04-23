import '../importer.dart';

Future<Map<String, String>> createHttpRequestHeader({bool isJsonRpc = false}) async {
  final headers = <String, String>{
    'Accept': 'application/json',
    'Content-Type': isJsonRpc
        ? 'application/json'
        : 'application/x-www-form-urlencoded',
  };
  final token = await getAccessToken(); // ← await を追加
  if (token != null) {
    headers['Authorization'] = 'Bearer $token';
  }
  return headers;
}

Future<String?> getAccessToken() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getString('access_token');
}

Future<void> setAccessToken(String token) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString('access_token', token);
}