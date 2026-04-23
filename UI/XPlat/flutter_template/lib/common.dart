import 'importer.dart';
import 'package:http/http.dart' as http;

Future<void> getFetch(
  String url,
  Map<String, String> headers,
  void Function(dynamic data) onSuccess,
  void Function(String msg) setMessage,
) async {
  try {
    final response = fetchStatusHandler(
      await http.get(Uri.parse(url), headers: headers),
    );
    final decoded = jsonDecode(response.body);
    
    // Map の場合のみエラーキーをチェック
    if (decoded is Map<String, dynamic>) {
      if (decoded['errorMSG'] != null) {
        setMessage(jsonEncode(decoded['errorMSG']));
      } else if (decoded['exceptionMSG'] != null) {
        setMessage(jsonEncode(decoded['exceptionMSG']));
      } else {
        onSuccess(decoded);
      }
    } else {
      // List など Map 以外はそのまま onSuccess へ
      onSuccess(decoded);
    }
  } catch (e) {
    setMessage(e.toString());
  }
}

Future<void> postFetch(
  String url,
  Map<String, String> headers,
  Object body,
  void Function(dynamic data) onSuccess,
  void Function(String msg) setMessage,
) async {
  try {
    final response = fetchStatusHandler(
      await http.post(Uri.parse(url), headers: headers, body: body),
    );
    final decoded = jsonDecode(response.body);
    // Map の場合のみエラーキーをチェック
    if (decoded is Map<String, dynamic>) {
      if (decoded['errorMSG'] != null) {
        setMessage(jsonEncode(decoded['errorMSG']));
      } else if (decoded['exceptionMSG'] != null) {
        setMessage(jsonEncode(decoded['exceptionMSG']));
      } else {
        onSuccess(decoded);
      }
    } else {
      // List など Map 以外はそのまま onSuccess へ
      onSuccess(decoded);
    }
  } catch (e) {
    setMessage(e.toString());
  }
}