import 'package:flutter/material.dart';
import '../pages/page_home.dart';
import '../pages/page_about.dart';
import '../pages/page_settings.dart';
import '../pages/page_counter.dart';

class MainLayout extends StatefulWidget {
  const MainLayout({super.key});

  @override
  State<MainLayout> createState() => _MainLayoutState();
}

class _MainLayoutState extends State<MainLayout> {
  int _selectedIndex = 0;

  final List<Map<String, dynamic>> _menuItems = [
    {'icon': Icons.home, 'label': 'ホーム'},
    {'icon': Icons.info, 'label': '概要'},
    {'icon': Icons.settings, 'label': '設定'},
    {'icon': Icons.touch_app,    'label': 'カウンター'},
  ];

  final List<Widget> _pages = const [
    PageHome(),
    PageAbout(),
    PageSettings(),
    PageCounter(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.primary,
        title: const Text(
          'My Application',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications, color: Colors.white),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.account_circle, color: Colors.white),
            onPressed: () {},
          ),
        ],
      ),
      body: Row(
        children: [
          NavigationRail(
            selectedIndex: _selectedIndex,
            onDestinationSelected: (int index) {
              setState(() {
                _selectedIndex = index;
              });
            },
            labelType: NavigationRailLabelType.all,
            destinations: _menuItems.map((item) {
              return NavigationRailDestination(
                icon: Icon(item['icon'] as IconData),
                label: Text(item['label'] as String),
              );
            }).toList(),
          ),
          const VerticalDivider(thickness: 1, width: 1),
          Expanded(
            child: _pages[_selectedIndex],
          ),
        ],
      ),
    );
  }
}