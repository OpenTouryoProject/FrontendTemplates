import '../importer.dart';
import '../touryo/auth_state.dart';

import 'package:url_launcher/url_launcher.dart';

// サインイン状態を管理するウィジェット
class SignIn extends StatefulWidget {
  const SignIn({super.key});

  @override
  State<SignIn> createState() => _SignInState();
}

class _SignInState extends State<SignIn> {
  bool _isSignedIn = false;
  Map<String, dynamic>? _userInfo;

  @override
  void initState() {
    super.initState();
    _checkExistingSession();

    // ↓ 追加：通知ハンドラ登録
    AuthState.instance.authCompletedNotifier.addListener(_onAuthCompleted);
  }

  @override
  void dispose() {
    // ↓ 追加：通知ハンドラ解除（メモリリーク防止）
    AuthState.instance.authCompletedNotifier.removeListener(_onAuthCompleted);
    super.dispose();
  }

  /// リスナ登録する通知ハンドラ
  void _onAuthCompleted() {
    _checkExistingSession();
  }

  /// 既存のアクセストークンを確認してサインイン状態を復元する
  Future<void> _checkExistingSession() async {
    final accessToken = await OAuthOidc.instance.getAccessToken();
    if (accessToken != null) {
      await callUserInfo(accessToken);
      final userInfoStr = await OAuthOidc.instance.getUserInfo();
      if (userInfoStr != null) {
        if (!mounted) return; // ← 非同期後のsetState前に必須チェック
        setState(() {
          _userInfo = jsonDecode(userInfoStr) as Map<String, dynamic>;
          _isSignedIn = true;
        });
      }
    }
  }

  /// 認可リクエストを送信してサインイン画面へ遷移
  Future<void> _authRequest() async {
    await OAuthOidc.instance.initSignUpStatus();
    final state = await OAuthOidc.instance.getState();
    final codeChallenge = await OAuthOidc.instance.getCodeChallenge(true);

    const paramTemplate =
        '?client_id={0}&response_type=code&scope=profile%20email%20phone%20address%20userid%20roles'
        '&state={1}&code_challenge={2}&code_challenge_method=S256&response_mode=fragment';

    final params = paramTemplate
        .replaceAll('{0}', AppConfig.clientId)
        .replaceAll('{1}', state ?? '')
        .replaceAll('{2}', codeChallenge);

    final uri = Uri.parse(AppConfig.authRequestUrl + params);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  /// サインアウト処理
  void _signOut() {
    OAuthOidc.instance.initSignUpStatus();
    setState(() {
      _isSignedIn = false;
      _userInfo = null;
    });
    // 必要に応じてトップページへ遷移
    // Navigator.of(context).pushNamedAndRemoveUntil('/', (_) => false);
  }

  @override
  Widget build(BuildContext context) {
    if (_isSignedIn && _userInfo != null) {
      // サインイン済み: ユーザー名とサインアウトボタンを表示
      // TypeScript: isSignedIn=true の render() に相当
      final sub = _userInfo!['sub'] as String? ?? '';
      return TextButton.icon(
        onPressed: _signOut,
        icon: const Icon(Icons.account_circle, color: Colors.white),
        label: Text(
          'Sign Out ($sub)',
          style: const TextStyle(color: Colors.white),
        ),
      );
    } else {
      // 未サインイン: サインインボタンを表示
      // TypeScript: isSignedIn=false の render() に相当
      return TextButton.icon(
        onPressed: _authRequest,
        icon: const Icon(Icons.login, color: Colors.white),
        label: const Text(
          'Sign In',
          style: TextStyle(color: Colors.white),
        ),
      );
    }
  }
}