import { ScrollView, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../../constants/theme';
import { discounts } from '../../../data/mockData';
import ScreenHeader from '../../../components/admin/ScreenHeader';
import ListItem from '../../../components/admin/ListItem';

export default function DiscountsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader title="Discounts" subtitle="Manage promo codes and offers" />

      {discounts.map((discount) => (
        <ListItem
          key={discount.id}
          title={discount.code}
          subtitle={`${discount.type === 'percentage' ? `${discount.value}% off` : `₹${discount.value} off`} · Used ${discount.usage} times`}
          status={discount.status}
        />
      ))}
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
});
