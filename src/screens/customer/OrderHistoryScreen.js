import { FlatList, Pressable, Text, View } from 'react-native';
import { COLORS, SPACING, STATUS_COLORS } from '../../constants/theme';
import { formatCurrency, styles } from './customerStyles';

function StatusText({ status }) {
  return (
    <Text style={{ color: STATUS_COLORS[status] || COLORS.textSecondary, fontWeight: '800', textTransform: 'capitalize' }}>
      {status}
    </Text>
  );
}

export default function OrderHistoryScreen({ navigation, orders }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={(
          <View style={{ marginBottom: SPACING.md }}>
            <Text style={styles.title}>Order history</Text>
            <Text style={styles.subtitle}>Review past orders and track active deliveries.</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('OrderTracking', { orderId: item.id })}
            style={styles.card}
          >
            <View style={styles.row}>
              <View>
                <Text style={{ color: COLORS.text, fontSize: 16, fontWeight: '800' }}>{item.id}</Text>
                <Text style={styles.subtitle}>Placed on {item.date}</Text>
              </View>
              <StatusText status={item.status} />
            </View>
            <Text style={[styles.subtitle, { marginTop: SPACING.sm }]}>
              {item.items.map((orderItem) => `${orderItem.name} x ${orderItem.qty}`).join(', ')}
            </Text>
            <Text style={{ color: COLORS.primary, fontWeight: '800', marginTop: SPACING.sm }}>
              {formatCurrency(item.amount)}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No orders placed yet.</Text>}
      />
    </View>
  );
}
