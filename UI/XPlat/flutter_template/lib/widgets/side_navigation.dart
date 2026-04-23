import '../importer.dart';

class SideNavigation extends StatelessWidget {
  final int selectedIndex;
  final ValueChanged<int> onDestinationSelected;
  final List<Map<String, dynamic>> menuItems;

  const SideNavigation({
    super.key,
    required this.selectedIndex,
    required this.onDestinationSelected,
    required this.menuItems,
  });

  @override
  Widget build(BuildContext context) {
    return NavigationRail(
      selectedIndex: selectedIndex,
      onDestinationSelected: onDestinationSelected,
      labelType: NavigationRailLabelType.all,
      destinations: menuItems.map((item) {
        return NavigationRailDestination(
          icon: Icon(item['icon'] as IconData),
          label: Text(item['label'] as String),
        );
      }).toList(),
    );
  }
}
