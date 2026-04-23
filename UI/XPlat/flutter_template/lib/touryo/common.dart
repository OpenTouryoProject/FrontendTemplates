//import '../importer.dart';
import 'package:http/http.dart' as http;

http.Response fetchStatusHandler(http.Response response) {
  if (response.statusCode == 200) {
    return response;
  } else {
    throw Exception(response.reasonPhrase ?? 'HTTP ${response.statusCode}');
  }
}