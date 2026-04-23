import 'package:flutter/material.dart';

class MyDropdownButton extends StatelessWidget {

  final String _caption;
  final void Function(Object?)? _onChanged;
  final String? _selectedKey;
  final List<DropdownMenuItem<String>> _items;

  MyDropdownButton(
      this._caption,
      this._onChanged,
      this._selectedKey,
      Map<String, String> items,
      {super.key})
      : _items = items.entries
            .map((e) => DropdownMenuItem(
                  value: e.value,
                  child: Text(e.key),
                ))
            .toList();

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.start,
      children: <Widget>[
        Container(
          margin: const EdgeInsets.only(right: 10),
          child: Text(_caption),
        ),
        DropdownButton<Object>(
          items: _items,
          value: _selectedKey,
          onChanged: _onChanged,
        ),
      ],
    );
  }
}