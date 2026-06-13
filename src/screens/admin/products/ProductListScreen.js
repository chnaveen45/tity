import { useState, useMemo } from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../../constants/theme';
import ScreenHeader from '../../../components/admin/ScreenHeader';
import SearchBar from '../../../components/admin/SearchBar';
import FilterChips from '../../../components/admin/FilterChips';
import ListItem from '../../../components/admin/ListItem';
import EmptyState from '../../../components/admin/EmptyState';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Low Stock', value: 'low' },
];

function formatCurrency(amount) {
  return `Rs. ${amount.toLocaleString('en-IN')}`;
}

export default function ProductListScreen({ navigation, products }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        filter === 'all' ||
        (filter === 'low' && p.stock < 10) ||
        p.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [products, search, filter]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Products" subtitle="Manage product listings" />
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search products..." />
        <FilterChips options={FILTERS} selected={filter} onSelect={setFilter} />

        {filtered.length === 0 ? (
          <EmptyState message="No products found" />
        ) : (
          filtered.map((product) => (
            <ListItem
              key={product.id}
              title={product.name}
              subtitle={`${product.category} - Stock: ${product.stock}`}
              rightText={formatCurrency(product.price)}
              status={product.stock < 10 ? 'low' : product.status}
              onPress={() => navigation.navigate('ProductForm', { productId: product.id })}
            />
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('ProductForm')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    right: SPACING.md,
    bottom: SPACING.md,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 28,
    color: '#FFF',
    lineHeight: 30,
  },
});
