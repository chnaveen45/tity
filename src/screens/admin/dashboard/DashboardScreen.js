import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, RefreshControl } from 'react-native';
import { COLORS, SPACING } from '../../../constants/theme';
import { dashboardStats, recentOrders } from '../../../data/mockData';
import ScreenHeader from '../../../components/admin/ScreenHeader';
import StatCard from '../../../components/admin/StatCard';
import ListItem from '../../../components/admin/ListItem';

function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function DashboardScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <ScreenHeader title="Admin Dashboard" subtitle="Overview of your store" />

      <View style={styles.statsGrid}>
        <StatCard label="Revenue" value={formatCurrency(dashboardStats.totalRevenue)} icon="💰" color={COLORS.success} />
        <StatCard label="Orders" value={dashboardStats.totalOrders} icon="📦" />
        <StatCard label="Products" value={dashboardStats.totalProducts} icon="🏷️" color={COLORS.info} />
        <StatCard label="Low Stock" value={dashboardStats.lowStockCount} icon="⚠️" color={COLORS.warning} />
        <StatCard label="Pending Orders" value={dashboardStats.pendingOrders} icon="⏳" color={COLORS.warning} />
        <StatCard label="Customers" value={dashboardStats.activeCustomers} icon="👥" color={COLORS.success} />
      </View>

      <Text style={styles.sectionTitle}>Recent Orders</Text>
      {recentOrders.map((order) => (
        <ListItem
          key={order.id}
          title={order.id}
          subtitle={`${order.customer} · ${order.date}`}
          rightText={formatCurrency(order.amount)}
          status={order.status}
          onPress={() => navigation.navigate('OrdersTab', { screen: 'OrderDetail', params: { orderId: order.id } })}
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
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
});
