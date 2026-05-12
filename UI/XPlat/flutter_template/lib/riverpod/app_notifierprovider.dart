import '../importer.dart';

final myProvider = NotifierProvider<MyNotifier, MyState>(MyNotifier.new);

class MyNotifier extends Notifier<MyState> {
  @override
  MyState build() => const MyState();

  void updateCount(int value) {
    state = state.copyWith(count: value);
  }

  void updateMessage(String value) {
    state = state.copyWith(message: value);
  }
}