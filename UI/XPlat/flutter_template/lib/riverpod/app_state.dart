class MyState {
  final int count;
  final String message;

  const MyState({this.count = 0, this.message = ''});

  MyState copyWith({int? count, String? message}) {
    return MyState(
      count: count ?? this.count,
      message: message ?? this.message,
    );
  }
}

