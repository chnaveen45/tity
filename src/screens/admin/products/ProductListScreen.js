import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SPACING } from '../../../constants/theme';
import ScreenHeader from '../../../components/admin/ScreenHeader';
import SearchBar from '../../../components/admin/SearchBar';
import FilterChips from '../../../components/admin/FilterChips';
import ListItem from '../../../components/admin/ListItem';
import EmptyState from '../../../components/admin/EmptyState';
import { getProducts } from './productApi';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Low Stock', value: 'low' },
];

function formatCurrency(amount) {
  return `Rs. ${amount.toLocaleString('en-IN')}`;
}

export default function ProductListScreen({ navigation, products = [] }) {
  const [productItems, setProductItems] = useState(products);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadProducts = useCallback(async ({ refreshing = false } = {}) => {
    if (refreshing) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const nextProducts = await getProducts();
      setProductItems(nextProducts);
      setError('');
    } catch (loadError) {
      setError(loadError.message || 'Unable to load products.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [loadProducts])
  );

  const filtered = useMemo(() => {
    return productItems.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        filter === 'all' ||
        (filter === 'low' && p.stock < 10) ||
        p.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [productItems, search, filter]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => loadProducts({ refreshing: true })}
            tintColor={COLORS.primary}
          />
        }
      >
        <ScreenHeader title="Products" subtitle="Manage product listings" />
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search products..." />
        <FilterChips options={FILTERS} selected={filter} onSelect={setFilter} />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator color={COLORS.primary} />
            <Text style={styles.loadingText}>Loading products...</Text>
          </View>
        ) : filtered.length === 0 ? (
          <EmptyState message="No products found" />
        ) : (
          filtered.map((product) => (
            <ListItem
              key={product.id}
              title={product.name}
              subtitle={`${product.category} - Stock: ${product.stock}`}
              rightText={formatCurrency(product.price)}
              status={product.stock < 10 ? 'low' : product.status}
              onPress={() => navigation.navigate('ProductForm', { productId: product.id, product })}
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
  errorText: {
    color: COLORS.danger,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  loading: {
    alignItems: 'center',
    gap: SPACING.sm,
    padding: SPACING.xl,
  },
  loadingText: {
    color: COLORS.textSecondary,
    fontSize: 14,
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
