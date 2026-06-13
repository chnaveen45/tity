import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../../constants/theme';
import { orders } from '../../../data/mockData';
import ScreenHeader from '../../../components/admin/ScreenHeader';
import SearchBar from '../../../components/admin/SearchBar';
import FilterChips from '../../../components/admin/FilterChips';
import ListItem from '../../../components/admin/ListItem';
import EmptyState from '../../../components/admin/EmptyState';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Paid', value: 'paid' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
];

function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function OrderListScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'all' || o.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader title="Orders" subtitle="Monitor all incoming orders" />
      <SearchBar value={search} onChangeText={setSearch} placeholder="Search orders..." />
      <FilterChips options={FILTERS} selected={filter} onSelect={setFilter} />

      {filtered.length === 0 ? (
        <EmptyState message="No orders found" />
      ) : (
        filtered.map((order) => (
          <ListItem
            key={order.id}
            title={order.id}
            subtitle={`${order.customer} · ${order.date}`}
            rightText={formatCurrency(order.amount)}
            status={order.status}
            onPress={() => navigation.navigate('OrderDetail', { orderId: order.id })}
          />
        ))
      )}
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
