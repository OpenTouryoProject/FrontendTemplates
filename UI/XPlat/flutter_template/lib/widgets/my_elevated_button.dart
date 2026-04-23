import 'package:flutter/material.dart';

class MyElevatedButton extends StatelessWidget {

  final String _caption;
  final VoidCallback _onPressed;

  const MyElevatedButton(
      this._caption, this._onPressed,
      {super.key});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: Colors.orange,
        foregroundColor: Colors.white,
      ),
      onPressed: _onPressed,
      child: Text(_caption),
    );
  }
}