import 'package:flutter/material.dart';

class PageSettings extends StatelessWidget {
  const PageSettings({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.settings, size: 64, color: Colors.orange),
          SizedBox(height: 16),
          Text('設定画面', style: TextStyle(fontSize: 24)),
        ],
      ),
    );
  }
}