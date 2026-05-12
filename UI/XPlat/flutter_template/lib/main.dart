import 'importer.dart';
import 'layout/main_layout.dart';
import 'touryo/auth_state.dart';

import 'package:app_links/app_links.dart';
import 'package:flutter_single_instance/flutter_single_instance.dart';
import 'package:windows_single_instance/windows_single_instance.dart';

void main(List<String> args) async {
  WidgetsFlutterBinding.ensureInitialized(); // ← 必須

  // iOS / Android / Web はOSがシングルインスタンスを保証

  if (Platform.isWindows) { // Windows は WindowsSingleInstance を使用
    await WindowsSingleInstance.ensureSingleInstance(
      args,
      'my_app_instance_key',
      onSecondWindow: (args) {
        // 2ndプロセスから渡されたURIを処理
        // args[0] にカスタムURLスキームのURIが入る想定
        if (args.isNotEmpty) {
          final uri = Uri.tryParse(args[0]);
          if (uri != null) {
            MyApp.handleUri(uri); // ← グローバルなハンドラを呼ぶ
          }
        }
      },
    );
  } else if (Platform.isMacOS || Platform.isLinux) { // Mac / Linux は FlutterSingleInstance を使用
    await windowManager.ensureInitialized();
    if (!await FlutterSingleInstance().isFirstInstance()) {
      await FlutterSingleInstance().focus();
      exit(0);
    }
  }

  runApp(
    // ProviderScope を追加して Riverpod を有効化
    const ProviderScope(
      child: MyApp(),
    ),
  );
}

// 起動パターン対応箇所
// - コールドスタート（URLスキームでアプリ起動）対応不要
// - ウォームスタート（起動中にURLスキームで呼ばれる）：以下対応

// StatefulWidget に変更：ウォームスタート時のカスタムURLスキーム対応のため
class MyApp extends StatefulWidget {
  const MyApp({super.key});
  
  // グローバルからURIを受け取るための静的ハンドラ
  static void handleUri(Uri uri) async {
    await _MyAppState._instance?._handleUri(uri);
  }

  @override
  State<MyApp> createState() => _MyAppState();
}

// アプリが起動中（ウォームスタート）にカスタムURLスキームで呼ばれた時、特定の画面へ遷移する処理。
class _MyAppState extends State<MyApp> {
  // onSecondWindow から呼ぶため保持
  static _MyAppState? _instance;

  @override
  void initState() {
    super.initState();
    _instance = this;
    _initAppLinks();
  }

  @override
  void dispose() {
    _instance = null;
    super.dispose();
  }

  void _initAppLinks() {    
     // ウォームスタート（Mac / Linux / iOS / Android）
    AppLinks().uriLinkStream.listen((uri) async {
      await _handleUri(uri);      
    });
  }

  Future<void> _handleUri(Uri uri) async {
    
    if (uri.scheme != 'myapp') return;

    final params = getParameterFromFragment(uri);
    final code = params['code'];    
    if (code == null || code.isEmpty) return;

    final codeVerifier = await OAuthOidc.instance.getCodeVerifier();
    if (codeVerifier == null) return;

    await callConvertCodeToToken(code, codeVerifier);

    // ↓ 追加：トークン取得完了をSignInウィジェットへ通知
    AuthState.instance.notifyAuthCompleted();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My App',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // TRY THIS: Try running your application with "flutter run". You'll see
        // the application has a purple toolbar. Then, without quitting the app,
        // try changing the seedColor in the colorScheme below to Colors.green
        // and then invoke "hot reload" (save your changes or press the "hot
        // reload" button in a Flutter-supported IDE, or press "r" if you used
        // the command line to start the app).
        //
        // Notice that the counter didn't reset back to zero; the application
        // state is not lost during the reload. To reset the state, use hot
        // restart instead.
        //
        // This works for code too, not just values: Most code changes can be
        // tested with just a hot reload.
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const MainLayout(),
    );
  }
}
