import 'importer.dart';

import 'package:flutter/material.dart';
import 'dart:async';

// WebAPI呼出
import 'package:http/http.dart' as http;

// AppAuth呼出
import 'package:flutter_appauth/flutter_appauth.dart';

class AppAuthPage extends StatefulWidget {
  AppAuthPage({Key? key, required this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _AppAuthPageState createState() => _AppAuthPageState();
}

class _AppAuthPageState extends State<AppAuthPage> {
  String _display = "hoge";

  // FlutterAppAuth
  final FlutterAppAuth _appAuth = FlutterAppAuth();

  String? _codeVerifier;
  String? _authorizationCode;
  String? _refreshToken;
  String? _accessToken;

  // final String _clientId = 'interactive.public';
  // final String _redirectUrl = 'io.identityserver.demo:/oauthredirect';
  // final String _issuer = 'https://demo.identityserver.io';
  // final String _discoveryUrl =
  //     'https://demo.identityserver.io/.well-known/openid-configuration';

  final String _clientId = '40319c0100f94ff3aab3004c8bdb5e52';
  final String _redirectUrl = 'com.opentouryo:/oauthredirect';
  final String _issuer = 'https://ssoauth.opentouryo.com';
  final String _discoveryUrl =
      'https://mpos-opentouryo.ddo.jp/MultiPurposeAuthSite/.well-known/openid-configuration';

  final List<String> _scopes = <String>[
    'openid',
    'email'
  ];

  // final AuthorizationServiceConfiguration _serviceConfiguration =
  //   const AuthorizationServiceConfiguration(
  //       'https://demo.identityserver.io/connect/authorize',
  //       'https://demo.identityserver.io/connect/token');

  final AuthorizationServiceConfiguration _serviceConfiguration =
  const AuthorizationServiceConfiguration(
      'https://mpos-opentouryo.ddo.jp/MultiPurposeAuthSite/authorize',
      'https://mpos-opentouryo.ddo.jp/MultiPurposeAuthSite/token');

  @override
  void initState() {
    super.initState();
  }

  Future<void> _signInWithNoCodeExchange() async {
    try {
      final AuthorizationResponse? result
      = await this._appAuth.authorize(AuthorizationRequest(
          this._clientId, this._redirectUrl,
          discoveryUrl: this._discoveryUrl, scopes: this._scopes),
      );
      if (result != null) {
        print("AuthorizationRequest was returned the response.");
        print("authorizationCode: " + result.authorizationCode!.toString());
        this._codeVerifier = result.codeVerifier;
        this._authorizationCode = result.authorizationCode!;
        await this._exchangeCode();
      }
      else {
        print("AuthorizationResponse is null");
      }
    } catch (e) {
      print(e);
    }
  }

  Future<void> _exchangeCode() async {
    try {
      final TokenResponse? result = await this._appAuth.token(TokenRequest(
          this._clientId, this._redirectUrl,
          authorizationCode: this._authorizationCode,
          discoveryUrl: this._discoveryUrl,
          codeVerifier: this._codeVerifier,
          scopes: this._scopes));
      if (result != null) {
        print("TokenRequest was returned the response.");
        print("accessToken: " + result.accessToken!.toString());
        this._accessToken = result.accessToken!;
        await this._testApi();
      }
      else {
        print("TokenResponse is null");
      }
    } catch (e) {
      print(e);
    }
  }

  Future<void> _testApi() async {
    final http.Response httpResponse = await http.get(
        Uri.parse('http://mpos-opentouryo.ddo.jp/MultiPurposeAuthSite/userinfo'),
        headers: <String, String>{'Authorization': 'Bearer ' + this._accessToken!});
    setState(() {
      this._display = httpResponse.statusCode == 200 ?
      httpResponse.body : httpResponse.statusCode.toString();
    });
  }

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                Text(
                  'You have pushed the button this many times:',
                ),
                Text(
                  '$_display',
                  style: Theme.of(context).textTheme.headline4,
                ),
              ],
            ),
            Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: <Widget>[
                  ElevatedButton(
                    child: const Text('SignIn Button'),
                    style: ElevatedButton.styleFrom(
                      primary: Colors.orange,
                      onPrimary: Colors.white,
                    ),
                    onPressed: this._signInWithNoCodeExchange,
                  ),
                ]
            ),
          ],
        ),
      ),
      // This trailing comma makes auto-formatting nicer for build methods.
      drawer: Drawer(
        child: ListView(
          children: <Widget>[
            DrawerHeader(
              child: Text('Drawer Header'),
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
            ),
            ListTile(
              title: Text("appauth"),
              trailing: Icon(Icons.arrow_forward),
              onTap: () {
                Navigator.of(context).pop();
                Navigator.of(context).pushNamed("/appauth");
              },
            ),
            ListTile(
              title: Text("fcm"),
              trailing: Icon(Icons.arrow_forward),
              onTap: () {
                Navigator.of(context).pop();
                Navigator.of(context).pushNamed("/fcm");
              },
            ),
          ],
        ),
      ),
    );
  }
}