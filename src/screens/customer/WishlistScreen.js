import { FlatList, Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, SPACING } from '../../constants/theme';
import { formatCurrency, styles } from './customerStyles';

export default function WishlistScreen({ products, wishlistIds, onAddToCart, onToggleWishlist }) {
  const wishlistProducts = products.filter((product) => wishlistIds.includes(product.id));

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlistProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={(
          <View style={{ marginBottom: SPACING.md }}>
            <Text style={styles.title}>Wishlist</Text>
            <Text style={styles.subtitle}>Keep products ready for your next purchase.</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: COLORS.text, fontSize: 16, fontWeight: '800' }}>{item.name}</Text>
                <Text style={styles.subtitle}>{item.category}</Text>
                <Text style={{ color: COLORS.primary, fontWeight: '800', marginTop: SPACING.xs }}>
                  {formatCurrency(item.price)}
                </Text>
              </View>
              <Pressable onPress={() => onToggleWishlist(item.id)} hitSlop={10}>
                <Ionicons name="heart" size={28} color={COLORS.danger} />
              </Pressable>
            </View>
            <Pressable onPress={() => onAddToCart(item)} style={[styles.button, { marginTop: SPACING.md }]}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Your wishlist is empty.</Text>}
      />
    </View>
  );
}
