import { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';
import { customerCategories, customerProducts } from '../../data/customerData';
import { formatCurrency, styles } from './customerStyles';

function CategoryChip({ category, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: selected ? COLORS.primary : COLORS.surface,
        borderColor: selected ? COLORS.primary : COLORS.border,
        borderWidth: 1,
        borderRadius: RADIUS.sm,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        marginRight: SPACING.sm,
      }}
    >
      <Text style={{ color: selected ? COLORS.surface : COLORS.text, fontWeight: '700' }}>
        {category.name}
      </Text>
    </Pressable>
  );
}

function ProductCard({ product, isWishlisted, onOpen, onAddToCart, onToggleWishlist }) {
  const disabled = product.stock <= 0;

  return (
    <Pressable onPress={onOpen} style={styles.card}>
      <View style={styles.row}>
        <View style={{ flex: 1, gap: SPACING.xs }}>
          <Text style={{ color: COLORS.text, fontSize: 17, fontWeight: '800' }}>{product.name}</Text>
          <Text style={styles.subtitle}>{product.category} · {product.rating} stars</Text>
          <Text style={{ color: COLORS.primary, fontSize: 16, fontWeight: '800' }}>
            {formatCurrency(product.price)}
          </Text>
        </View>
        <Pressable onPress={() => onToggleWishlist(product.id)} hitSlop={10}>
          <Ionicons
            name={isWishlisted ? 'heart' : 'heart-outline'}
            size={26}
            color={isWishlisted ? COLORS.danger : COLORS.textSecondary}
          />
        </Pressable>
      </View>

      <Text style={[styles.subtitle, { marginTop: SPACING.sm }]} numberOfLines={2}>
        {product.description}
      </Text>

      <View style={[styles.row, { marginTop: SPACING.md }]}>
        <Text style={{ color: disabled ? COLORS.danger : COLORS.success, fontWeight: '700' }}>
          {disabled ? 'Out of stock' : `${product.stock} in stock`}
        </Text>
        <Pressable
          disabled={disabled}
          onPress={() => onAddToCart(product)}
          style={[styles.button, disabled && { backgroundColor: COLORS.textSecondary }]}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

export default function ProductCatalogScreen({ navigation, wishlistIds, onAddToCart, onToggleWishlist }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return customerProducts.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesQuery = !normalizedQuery
        || product.name.toLowerCase().includes(normalizedQuery)
        || product.category.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={(
          <View style={{ gap: SPACING.md, marginBottom: SPACING.md }}>
            <View>
              <Text style={styles.title}>Explore products</Text>
              <Text style={styles.subtitle}>Search, filter by category, and choose what you need.</Text>
            </View>
            <TextInput
              style={styles.input}
              value={query}
              onChangeText={setQuery}
              placeholder="Search products"
              placeholderTextColor={COLORS.textSecondary}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {customerCategories.map((category) => (
                <CategoryChip
                  key={category.id}
                  category={category}
                  selected={category.id === selectedCategory || category.name === selectedCategory}
                  onPress={() => setSelectedCategory(category.id === 'all' ? 'all' : category.name)}
                />
              ))}
            </ScrollView>
          </View>
        )}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            isWishlisted={wishlistIds.includes(item.id)}
            onOpen={() => navigation.navigate('ProductDetail', { productId: item.id })}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No products match your search.</Text>}
      />
    </View>
  );
}
