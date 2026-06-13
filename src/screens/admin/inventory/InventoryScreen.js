import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../../constants/theme';
import { products } from '../../../data/mockData';
import ScreenHeader from '../../../components/admin/ScreenHeader';
import SearchBar from '../../../components/admin/SearchBar';
import FilterChips from '../../../components/admin/FilterChips';
import ListItem from '../../../components/admin/ListItem';
import EmptyState from '../../../components/admin/EmptyState';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'In Stock', value: 'in_stock' },
  { label: 'Low Stock', value: 'low' },
  { label: 'Out of Stock', value: 'out' },
];

export default function InventoryScreen() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        filter === 'all' ||
        (filter === 'in_stock' && p.stock >= 10) ||
        (filter === 'low' && p.stock > 0 && p.stock < 10) ||
        (filter === 'out' && p.stock === 0);
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const getStockStatus = (stock) => {
    if (stock === 0) return 'cancelled';
    if (stock < 10) return 'low';
    return 'in_stock';
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader title="Inventory" subtitle="Monitor stock levels" />
      <SearchBar value={search} onChangeText={setSearch} placeholder="Search inventory..." />
      <FilterChips options={FILTERS} selected={filter} onSelect={setFilter} />

      {filtered.length === 0 ? (
        <EmptyState message="No inventory items found" />
      ) : (
        filtered.map((product) => (
          <ListItem
            key={product.id}
            title={product.name}
            subtitle={product.category}
            rightText={`${product.stock} units`}
            status={getStockStatus(product.stock)}
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
