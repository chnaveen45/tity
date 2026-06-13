import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';
import { formatCurrency, styles } from './customerStyles';

const paymentMethods = ['UPI', 'Card', 'Cash on Delivery'];

export default function CartScreen({ navigation, cartItems, onUpdateQuantity, onPlaceOrder }) {
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.qty, 0),
    [cartItems]
  );
  const deliveryFee = subtotal >= 999 || subtotal === 0 ? 0 : 49;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    const orderId = onPlaceOrder(paymentMethod);

    if (orderId) {
      navigation.navigate('OrdersTab', {
        screen: 'OrderTracking',
        params: { orderId },
      });
    }
  };

  if (cartItems.length === 0) {
    return (
      <View style={[styles.container, styles.content, { justifyContent: 'center' }]}>
        <Text style={styles.title}>Your cart is empty</Text>
        <Text style={[styles.subtitle, { marginTop: SPACING.sm }]}>
          Add products from the shop to place an order.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Shopping cart</Text>
      <Text style={[styles.subtitle, { marginBottom: SPACING.md }]}>
        Review your items and select a payment method.
      </Text>

      {cartItems.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: COLORS.text, fontSize: 16, fontWeight: '800' }}>{item.name}</Text>
              <Text style={styles.subtitle}>{formatCurrency(item.price)} each</Text>
            </View>
            <Text style={{ color: COLORS.primary, fontWeight: '800' }}>
              {formatCurrency(item.price * item.qty)}
            </Text>
          </View>
          <View style={[styles.row, { marginTop: SPACING.md }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: SPACING.sm }}>
              <Pressable
                onPress={() => onUpdateQuantity(item.id, item.qty - 1)}
                style={styles.secondaryButton}
              >
                <Text style={styles.secondaryButtonText}>-</Text>
              </Pressable>
              <Text style={{ color: COLORS.text, fontWeight: '800', minWidth: 24, textAlign: 'center' }}>
                {item.qty}
              </Text>
              <Pressable
                onPress={() => onUpdateQuantity(item.id, item.qty + 1)}
                style={styles.secondaryButton}
              >
                <Text style={styles.secondaryButtonText}>+</Text>
              </Pressable>
            </View>
            <Pressable onPress={() => onUpdateQuantity(item.id, 0)}>
              <Text style={{ color: COLORS.danger, fontWeight: '700' }}>Remove</Text>
            </Pressable>
          </View>
        </View>
      ))}

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Payment</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm }}>
          {paymentMethods.map((method) => {
            const selected = method === paymentMethod;
            return (
              <Pressable
                key={method}
                onPress={() => setPaymentMethod(method)}
                style={[styles.secondaryButton, selected && { borderColor: COLORS.primary }]}
              >
                <Text style={[styles.secondaryButtonText, selected && { color: COLORS.primary }]}>
                  {method}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.muted}>Subtotal</Text>
          <Text style={{ color: COLORS.text, fontWeight: '700' }}>{formatCurrency(subtotal)}</Text>
        </View>
        <View style={[styles.row, { marginTop: SPACING.sm }]}>
          <Text style={styles.muted}>Delivery</Text>
          <Text style={{ color: COLORS.text, fontWeight: '700' }}>
            {deliveryFee === 0 ? 'Free' : formatCurrency(deliveryFee)}
          </Text>
        </View>
        <View style={[styles.row, { marginTop: SPACING.md, paddingTop: SPACING.md, borderTopWidth: 1, borderTopColor: COLORS.border }]}>
          <Text style={{ color: COLORS.text, fontSize: 17, fontWeight: '800' }}>Total</Text>
          <Text style={{ color: COLORS.primary, fontSize: 17, fontWeight: '800' }}>
            {formatCurrency(total)}
          </Text>
        </View>
      </View>

      <Pressable onPress={handlePlaceOrder} style={styles.button}>
        <Text style={styles.buttonText}>Place Order</Text>
      </Pressable>
    </ScrollView>
  );
}
