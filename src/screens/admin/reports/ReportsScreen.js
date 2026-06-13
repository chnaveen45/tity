import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../../../constants/theme';
import { salesReport, dashboardStats } from '../../../data/mockData';
import ScreenHeader from '../../../components/admin/ScreenHeader';
import StatCard from '../../../components/admin/StatCard';
import ListItem from '../../../components/admin/ListItem';

function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function ReportsScreen() {
  const maxRevenue = Math.max(...salesReport.monthlyRevenue);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <ScreenHeader title="Reports" subtitle="Sales and performance analytics" />

        <View style={styles.statsGrid}>
          <StatCard label="This Month" value={formatCurrency(dashboardStats.totalRevenue)} icon="📈" />
          <StatCard label="Total Orders" value={dashboardStats.totalOrders} icon="📊" color={COLORS.info} />
        </View>

        <Text style={styles.sectionTitle}>Monthly Revenue</Text>
        <View style={styles.chartCard}>
          {salesReport.monthlyRevenue.map((value, index) => (
            <View key={salesReport.months[index]} style={styles.barRow}>
              <Text style={styles.barLabel}>{salesReport.months[index]}</Text>
              <View style={styles.barTrack}>
                <View
                  style={[styles.barFill, { width: `${(value / maxRevenue) * 100}%` }]}
                />
              </View>
              <Text style={styles.barValue}>{formatCurrency(value)}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Top Products</Text>
        {salesReport.topProducts.map((product, index) => (
          <ListItem
            key={product.name}
            title={`#${index + 1} ${product.name}`}
            subtitle={`${product.sold} units sold`}
            rightText={formatCurrency(product.revenue)}
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
  statsGrid: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  chartCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  barLabel: {
    width: 32,
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  barTrack: {
    flex: 1,
    height: 10,
    backgroundColor: COLORS.border,
    borderRadius: 5,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  barValue: {
    width: 72,
    fontSize: 11,
    color: COLORS.text,
    textAlign: 'right',
    fontWeight: '500',
  },
});
