import { Pressable, ScrollView, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, SPACING } from '../../constants/theme';
import { customerProducts } from '../../data/customerData';
import { formatCurrency, styles } from './customerStyles';

export default function ProductDetailScreen({ route, wishlistIds, onAddToCart, onToggleWishlist }) {
  const product = customerProducts.find((item) => item.id === route.params?.productId);

  if (!product) {
    return (
      <View style={[styles.container, styles.content]}>
        <Text style={styles.emptyText}>Product not found.</Text>
      </View>
    );
  }

  const isWishlisted = wishlistIds.includes(product.id);
  const disabled = product.stock <= 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={{ flex: 1, gap: SPACING.xs }}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.subtitle}>{product.category} · {product.rating} stars</Text>
          </View>
          <Pressable onPress={() => onToggleWishlist(product.id)} hitSlop={10}>
            <Ionicons
              name={isWishlisted ? 'heart' : 'heart-outline'}
              size={30}
              color={isWishlisted ? COLORS.danger : COLORS.textSecondary}
            />
          </Pressable>
        </View>

        <Text style={{ color: COLORS.primary, fontSize: 24, fontWeight: '800', marginTop: SPACING.md }}>
          {formatCurrency(product.price)}
        </Text>
        <Text style={[styles.subtitle, { marginTop: SPACING.md }]}>{product.description}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Product information</Text>
        {product.highlights.map((highlight) => (
          <View key={highlight} style={{ flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.sm }}>
            <Ionicons name="checkmark-circle-outline" size={18} color={COLORS.success} />
            <Text style={{ color: COLORS.text, flex: 1 }}>{highlight}</Text>
          </View>
        ))}
        <Text style={{ color: disabled ? COLORS.danger : COLORS.success, fontWeight: '700', marginTop: SPACING.sm }}>
          {disabled ? 'Currently out of stock' : `${product.stock} available`}
        </Text>
      </View>

      <Pressable
        disabled={disabled}
        onPress={() => onAddToCart(product)}
        style={[styles.button, disabled && { backgroundColor: COLORS.textSecondary }]}
      >
        <Text style={styles.buttonText}>{disabled ? 'Out of Stock' : 'Add to Cart'}</Text>
      </Pressable>
    </ScrollView>
  );
}
