import '../importer.dart';

class ScreenCrudSample extends StatefulWidget {
  const ScreenCrudSample({super.key, required this.title});

  final String title;

  @override
  State<ScreenCrudSample> createState() => _CrudSampleState();
}

class _CrudSampleState extends State<ScreenCrudSample> {
  // ddl値
  String _ddlDap = "SQL";
  String _ddlMode1 = "individual";
  String _ddlMode2 = "static";
  String _ddlIso = "RC";
  String _ddlExRollback = "-";
  String _orderColumn = "c1";
  String _orderSequence = "";

  // 値取得
  final _formKey = GlobalKey<FormState>();
  // 値設定
  final _shipperIDKey = GlobalKey<FormFieldState>();
  final _companyNameKey = GlobalKey<FormFieldState>();
  final _phoneKey = GlobalKey<FormFieldState>();
  // Field値
  String _shipperID = "";
  String _companyName = "";
  String _phone = "";
  // フォーカス制御
  //final _shipperIDFocusNode = FocusNode();
  final _companyNameFocusNode = FocusNode();
  final _phoneFocusNode = FocusNode();

  // JSON値
  String _display = "";
  List<dynamic> _jsonItems  = jsonDecode(
      '[{"shipperID":"shipperID","companyName":"companyName","phone":"phone"}]'
  );

  @override
  void initState() {
    super.initState();
  }

  Future<void> _selectCount() async {
    final url = Uri.parse('${AppConfig.crudSampleRootUrl}SelectCount').toString();
    final headers = await createHttpRequestHeader();

    final body = {
      "ddlDap": _ddlDap,
      "ddlMode1": _ddlMode1,
      "ddlMode2": _ddlMode2,
      "ddlExRollback": _ddlExRollback,
    };

    await postFetch(
      url,
      headers,
      body,
      (data) {
        setState(() {
          _display = (data as Map<String, dynamic>)['message'];
        });
      },
      (msg) {
        setState(() {
          _display = msg;
        });
      },
    );
  }

  Future<void> _selectAll(String urlPrefix) async {
    final url = Uri.parse('${AppConfig.crudSampleRootUrl}SelectAll_$urlPrefix').toString();
    final headers = await createHttpRequestHeader();

    await postFetch(
      url,
      headers,
      {
        "ddlDap": _ddlDap,
        "ddlMode1": _ddlMode1,
        "ddlMode2": _ddlMode2,
        "ddlExRollback": _ddlExRollback,
        "orderColumn": _orderColumn,
        "orderSequence": _orderSequence,
      },
      (data) {
        setState(() {
          _display = data['message'];
          _jsonItems = data['result'];
        });
      },
      (msg) {
        setState(() {
          _display = msg;
        });
      },
    );
  }

  Future<void> _crud(String urlPrefix) async {
    _formKey.currentState?.save();
    final url = Uri.parse('${AppConfig.crudSampleRootUrl}$urlPrefix').toString();

    final headers = await createHttpRequestHeader(isJsonRpc: true);

    final body = jsonEncode({
      "ddlDap": _ddlDap,
      "ddlMode1": _ddlMode1,
      "ddlMode2": _ddlMode2,
      "ddlExRollback": _ddlExRollback,
      "shipper": {
        "shipperID": _shipperID,
        "companyName": _companyName,
        "phone": _phone,
      },
    });

    await postFetch(
      url,
      headers,
      body,
      (data) {
        setState(() {
          _display = data['message'];
          if (urlPrefix == "Select") {
            final shipper = data['result'];
            _shipperIDKey.currentState?.didChange(shipper['shipperID']);
            _companyNameKey.currentState?.didChange(shipper['companyName']);
            _phoneKey.currentState?.didChange(shipper['phone']);
          }
        });
      },
      (msg) {
        setState(() {
          _display = msg;
        });
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            Row(
              children: <Widget>[
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    MyDropdownButton(
                      "ddlDap",
                      (value) {
                        setState(() {
                          _ddlDap = value.toString();
                        });
                      },
                      _ddlDap,
                      {
                        "SQL Server / SQL Client" : "SQL",
                        "Multi-DB / OLEDB.NET" : "OLE",
                        "Multi-DB / ODBC.NET" : "ODB",
                        "Oracle / ODP.NET" : "ODP",
                        "DB2 / DB2.NET" : "DB2",
                        "HiRDB / HiRDB-DP" : "HIR",
                        "MySQL Cnn/NET" : "MCN",
                        "PostgreSQL / Npgsql" : "NPS"
                      }
                    ),
                    MyDropdownButton(
                      "ddlMode1",
                      (value) {
                        setState(() {
                          _ddlMode1 = value.toString();
                        });
                      },
                      _ddlMode1,
                      {
                        "個別Ｄａｏ" : "individual",
                        "共通Ｄａｏ" : "common",
                        "自動生成Ｄａｏ（更新のみ）" : "generate",
                      }
                    ),
                    MyDropdownButton(
                      "ddlMode2",
                        (value) {
                          setState(() {
                            _ddlMode2 = value.toString();
                        });
                      },
                      _ddlMode2,
                      {
                        "静的クエリ" : "static",
                        "動的クエリ" : "dynamic",
                      }
                    ),
                    MyDropdownButton(
                      "ddlIso",
                      (value) {
                        setState(() {
                          _ddlIso = value.toString();
                        });
                      },
                      _ddlIso,
                      {
                        "ノットコネクト" : "NC",
                        "ノートランザクション" : "NT",
                        "ダーティリード" : "RU",
                        "リードコミット" : "RC",
                        "リピータブルリード" : "RR",
                        "シリアライザブル" : "SZ",
                        "スナップショット" : "SS",
                        "デフォルト" : "DF",
                      }
                    ),
                    MyDropdownButton(
                      "ddlExRollback",
                      (value) {
                        setState(() {
                          _ddlExRollback = value.toString();
                        });
                      },
                      _ddlExRollback,
                      {
                        "正常時" : "-",
                        "業務例外" : "Business",
                        "システム例外" : "System",
                        "その他、一般的な例外" : "Other",
                        "業務例外への振替" : "Other-Business",
                        "システム例外への振替" : "Other-System",
                      }
                    ),
                    MyDropdownButton(
                      "ddlOrder",
                      (value) {
                        setState(() {
                          _orderColumn = value.toString();
                        });
                      },
                      _orderColumn,
                      {
                        "c1" : "c1",
                        "c2" : "c2",
                        "c3" : "c3",
                      }
                    ),
                    MyDropdownButton(
                      "ddlOrderSequence",
                      (value) {
                        setState(() {
                          _orderSequence = value.toString();
                        });
                      },
                      _orderSequence,
                      {
                        "ASC" : "",
                        "DESC" : "D",
                      }
                    )
                  ],
                ),
                Expanded(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: <Widget>[
                      DataTable(
                        columns: [
                          DataColumn(label: Text('shipperID')),
                          DataColumn(label: Text('companyName')),
                          DataColumn(label: Text('phone')),
                        ],
                        rows: (_jsonItems).map((element) => DataRow(
                          cells: <DataCell>[
                            DataCell(Text(element["shipperID"] ?? "")),
                            DataCell(Text(element["companyName"] ?? "")),
                            DataCell(Text(element["phone"] ?? "")),
                          ]
                        )).toList(),
                      ),
                    ]
                  ),
                ),
              ],                            
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Text('件数:'),
                Text(_display),
              ],
            ),
            Form(
              key: _formKey,
              child: Column(
                children: [
                  TextFormField(
                    key: _shipperIDKey,
                    decoration: InputDecoration(labelText: 'shipperID'),
                    textInputAction: TextInputAction.next,
                    onFieldSubmitted: (_) {
                      FocusScope.of(context).requestFocus(_companyNameFocusNode);
                    },
                    onSaved: (value) {
                      _shipperID = value ?? "";
                    },
                  ),
                  TextFormField(
                    key: _companyNameKey,
                    decoration: InputDecoration(labelText: 'companyName'),
                    textInputAction: TextInputAction.next,
                    focusNode: _companyNameFocusNode,
                    onFieldSubmitted: (_) {
                      FocusScope.of(context).requestFocus(_companyNameFocusNode);
                    },
                    onSaved: (value) {
                      _companyName = value ?? "";
                    },
                  ),
                  TextFormField(
                    key: _phoneKey,
                    decoration: InputDecoration(labelText: 'phone'),
                    focusNode: _phoneFocusNode,
                    onSaved: (value) {
                      _phone = value ?? "";
                    },
                  ),
                ],
              ),
            ),
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: <Widget>[
                  MyElevatedButton('Select', (){ _crud("Select"); }),
                  MyElevatedButton('Insert', (){ _crud("Insert"); }),
                  MyElevatedButton('Update', (){ _crud("Update"); }),
                  MyElevatedButton('Delete', (){ _crud("Delete"); }),
                  MyElevatedButton('SelectCount', _selectCount),
                  MyElevatedButton('SelectAll_DT', (){ _selectAll("DT"); }),
                  MyElevatedButton('SelectAll_DSQL', (){ _selectAll("DSQL"); }),
                ]
            ),          
          ],
        )
      ),
    );
  }
}