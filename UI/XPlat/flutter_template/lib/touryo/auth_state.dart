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

// アプリ全体で共有する認証状態の通知オブジェクト
class AuthState {
  AuthState._();
  static final AuthState instance = AuthState._();

  // 認証完了を通知するNotifier（値はトークン取得完了回数 or タイムスタンプ等、何でも良い）
  final authCompletedNotifier = ValueNotifier<int>(0);

  void notifyAuthCompleted() {
    authCompletedNotifier.value++;
  }
}