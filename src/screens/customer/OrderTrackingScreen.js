import { ScrollView, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS, SPACING, STATUS_COLORS } from '../../constants/theme';
import { formatCurrency, styles } from './customerStyles';

const steps = ['Order placed', 'Packed', 'Shipped', 'Delivered'];

export default function OrderTrackingScreen({ route, orders }) {
  const order = orders.find((item) => item.id === route.params?.orderId);

  if (!order) {
    return (
      <View style={[styles.container, styles.content]}>
        <Text style={styles.emptyText}>Order not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>{order.id}</Text>
        <Text style={styles.subtitle}>Placed on {order.date}</Text>
        <Text style={{ color: STATUS_COLORS[order.status] || COLORS.textSecondary, fontWeight: '800', marginTop: SPACING.sm, textTransform: 'capitalize' }}>
          {order.status}
        </Text>
        <Text style={[styles.subtitle, { marginTop: SPACING.xs }]}>{order.deliveryEta}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Delivery progress</Text>
        {steps.map((step, index) => {
          const done = index + 1 <= order.deliveryStep;
          return (
            <View key={step} style={{ flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.md }}>
              <Ionicons
                name={done ? 'checkmark-circle' : 'ellipse-outline'}
                size={22}
                color={done ? COLORS.success : COLORS.textSecondary}
              />
              <Text style={{ color: done ? COLORS.text : COLORS.textSecondary, fontWeight: done ? '800' : '500' }}>
                {step}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Items</Text>
        {order.items.map((item) => (
          <View key={item.name} style={[styles.row, { marginBottom: SPACING.sm }]}>
            <Text style={{ color: COLORS.text, flex: 1 }}>{item.name} x {item.qty}</Text>
            <Text style={{ color: COLORS.text, fontWeight: '700' }}>
              {formatCurrency(item.price * item.qty)}
            </Text>
          </View>
        ))}
        <View style={[styles.row, { marginTop: SPACING.md, paddingTop: SPACING.md, borderTopWidth: 1, borderTopColor: COLORS.border }]}>
          <Text style={{ color: COLORS.text, fontWeight: '800' }}>Total</Text>
          <Text style={{ color: COLORS.primary, fontWeight: '800' }}>{formatCurrency(order.amount)}</Text>
        </View>
        <Text style={[styles.subtitle, { marginTop: SPACING.sm, textTransform: 'capitalize' }]}>
          Payment: {order.payment}
        </Text>
      </View>
    </ScrollView>
  );
}
