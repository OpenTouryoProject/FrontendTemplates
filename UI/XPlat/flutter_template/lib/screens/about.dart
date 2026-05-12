import '../importer.dart';

// StatelessWidget → ConsumerWidget に変更
class ScreenAbout extends ConsumerWidget {
  const ScreenAbout({super.key});

  @override
  // build に BuildContext に加えて WidgetRef ref を追加
  Widget build(BuildContext context, WidgetRef ref) {

    // watch で状態全体を購読 → どちらのフィールドが変わっても自動リビルド
    final state = ref.watch(myProvider);

    return Center( // const を削除
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.info, size: 64, color: Colors.green),
          SizedBox(height: 16),
          Text('概要画面', style: TextStyle(fontSize: 24)),
          SizedBox(height: 12),
          Text('count: ${state.count}', style: TextStyle(fontSize: 24)),
          SizedBox(height: 12),
          Text('message: ${state.message}', style: TextStyle(fontSize: 24)),
        ],
      ),
    );
  }
}