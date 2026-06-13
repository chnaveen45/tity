import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../../constants/theme';
import { transactions } from '../../../data/mockData';
import ScreenHeader from '../../../components/admin/ScreenHeader';
import SearchBar from '../../../components/admin/SearchBar';
import FilterChips from '../../../components/admin/FilterChips';
import ListItem from '../../../components/admin/ListItem';
import EmptyState from '../../../components/admin/EmptyState';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Paid', value: 'paid' },
  { label: 'Refunded', value: 'refunded' },
];

function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export default function TransactionsScreen() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch =
        t.id.toLowerCase().includes(search.toLowerCase()) ||
        t.customer.toLowerCase().includes(search.toLowerCase()) ||
        t.orderId.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'all' || t.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader title="Transactions" subtitle="Payment and financial records" />
      <SearchBar value={search} onChangeText={setSearch} placeholder="Search transactions..." />
      <FilterChips options={FILTERS} selected={filter} onSelect={setFilter} />

      {filtered.length === 0 ? (
        <EmptyState message="No transactions found" />
      ) : (
        filtered.map((txn) => (
          <ListItem
            key={txn.id}
            title={txn.id}
            subtitle={`${txn.customer} · ${txn.orderId} · ${txn.date}`}
            rightText={formatCurrency(txn.amount)}
            status={txn.status}
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
