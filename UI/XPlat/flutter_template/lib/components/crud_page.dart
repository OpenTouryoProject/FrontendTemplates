import 'importer.dart';

// WebAPI呼出
import 'package:http/http.dart' as http;

class CrudPage extends StatefulWidget {
  CrudPage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  _CrudPageState createState() => _CrudPageState();
}

class _CrudPageState extends State<CrudPage> {
  // Field値
  String _userId = "";
  String _password = "";

  // フォーカス制御
  final _userIdFocusNode = FocusNode();
  final _passwordFocusNode = FocusNode();

  // 値取得
  final _formKey = GlobalKey<FormState>();

  // 値設定
  final _userIdKey = GlobalKey<FormFieldState>();
  final _passwordKey = GlobalKey<FormFieldState>();

  // JSON値
  String _display = "";
  List<dynamic> _jsonItems  = jsonDecode(
      '[{"kind":"kind","id":"id","etag":"etag"}]'
  );

  @override
  void initState() {
    super.initState();
  }

  Future<void> _getBooks() async {
    var url =
    Uri.https('www.googleapis.com', '/books/v1/volumes', {'q': '{http}'});

    // Await the http get response, then decode the json-formatted response.
    var response = await http.get(url);
    if (response.statusCode == 200) {
      Map<String, dynamic> jsonResponse = jsonDecode(response.body) as Map<String, dynamic>;
      setState(() {
        this._display = jsonResponse['totalItems'].toString();
        this._jsonItems = jsonResponse['items'];
      });
    } else {
      print('Request failed with status: ${response.statusCode}.');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: SingleChildScrollView(
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                key: _userIdKey,
                decoration: InputDecoration(labelText: 'userId'),
                textInputAction: TextInputAction.next,
                onFieldSubmitted: (_) {
                  FocusScope.of(context).requestFocus(this._passwordFocusNode);
                },
                onSaved: (value) {
                  this._userId = value ?? "";
                  print("onSaved: " + this._userId);
                },
              ),
              TextFormField(
                key: _passwordKey,
                decoration: InputDecoration(labelText: 'password'),
                obscureText: true, // password
                focusNode: this._passwordFocusNode,
                onSaved: (value) {
                  this._password = value ?? "";
                  print("onSaved: " + this._password);
                },
              ),
              ElevatedButton(
                child: const Text('Save Button'),
                style: ElevatedButton.styleFrom(
                  primary: Colors.orange,
                  onPrimary: Colors.white,
                ),
                onPressed: () {
                  // 値のsave
                  this._formKey.currentState?.save();
                  //print("onPressed: " + this._userId);
                  //print("onPressed: " + this._password);

                  // WebAPI呼出

                  // 値のload
                  this._userIdKey.currentState?.didChange(this._userId);
                  this._passwordKey.currentState?.didChange(this._userId);
                },
              ),
              /*
              ElevatedButton(
                child: const Text('Load Button'),
                style: ElevatedButton.styleFrom(
                  primary: Colors.orange,
                  onPrimary: Colors.white,
                ),
                onPressed: () {
                  this._userIdKey.currentState?.didChange("hoge");
                  this._passwordKey.currentState?.didChange("hoge");
                },
              ),
              */
              ElevatedButton(
                child: const Text('GetData Button'),
                style: ElevatedButton.styleFrom(
                  primary: Colors.orange,
                  onPrimary: Colors.white,
                ),
                onPressed: _getBooks,
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  Text(
                    '件数:',
                  ),
                  Text(
                    '$_display',
                    style: Theme.of(context).textTheme.headline4,
                  ),
                ],
              ),
              DataTable(
                columns: [
                  DataColumn(label: Text('kind')),
                  DataColumn(label: Text('id')),
                  DataColumn(label: Text('etag')),
                ],
                rows: (this._jsonItems)
                    .map((element) => DataRow(
                        cells: <DataCell>[
                          DataCell(Text(element["kind"] ?? "")),
                          DataCell(Text(element["id"] ?? "")),
                          DataCell(Text(element["etag"] ?? "")),
                    ])).toList(),
              ),
            ],
          ),
        ),
      ),
      drawer: MyDrawer(),
    );
  }
}