import 'package:flutter/material.dart';
import '../widgets/app_header.dart';
import '../widgets/side_navigation.dart';
import '../screens/home.dart';
import '../screens/about.dart';
import '../screens/settings.dart';
import '../screens/counter.dart';

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
    ScreenHome(),
    ScreenAbout(),
    ScreenSettings(),
    ScreenCounter(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const AppHeader(),
      body: Row(
        children: [
          SideNavigation(
            selectedIndex: _selectedIndex,
            onDestinationSelected: (int index) {
              setState(() {
                _selectedIndex = index;
              });
            },
            menuItems: _menuItems,
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