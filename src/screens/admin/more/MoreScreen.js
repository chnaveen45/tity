import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, SPACING, RADIUS } from '../../../constants/theme';
import ScreenHeader from '../../../components/admin/ScreenHeader';

const MENU_ITEMS = [
  { label: 'Inventory', icon: 'cube-outline', screen: 'Inventory' },
  { label: 'Categories', icon: 'grid-outline', screen: 'Categories' },
  { label: 'Transactions', icon: 'card-outline', screen: 'Transactions' },
  { label: 'Reports', icon: 'bar-chart-outline', screen: 'Reports' },
  { label: 'Campaigns', icon: 'megaphone-outline', screen: 'Campaigns' },
  { label: 'Discounts', icon: 'pricetag-outline', screen: 'Discounts' },
  { label: 'Settings', icon: 'settings-outline', screen: 'Settings' },
];

export default function MoreScreen({ navigation, onLogout }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader title="More" subtitle="Additional admin tools" />

      {MENU_ITEMS.map((item) => (
        <TouchableOpacity
          key={item.screen}
          style={styles.menuItem}
          onPress={() => navigation.navigate(item.screen)}
          activeOpacity={0.7}
        >
          <Ionicons name={item.icon} size={22} color={COLORS.primary} />
          <Text style={styles.menuLabel}>{item.label}</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.menuItem}
        onPress={onLogout}
        activeOpacity={0.7}
      >
        <Ionicons name="log-out-outline" size={22} color={COLORS.primary} />
        <Text style={styles.menuLabel}>Logout</Text>
        <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
});
