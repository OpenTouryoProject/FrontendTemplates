import 'package:flutter/material.dart';

class ScreenAbout extends StatelessWidget {
  const ScreenAbout({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.info, size: 64, color: Colors.green),
          SizedBox(height: 16),
          Text('概要画面', style: TextStyle(fontSize: 24)),
        ],
      ),
    );
  }
}