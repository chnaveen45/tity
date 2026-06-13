import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';
import { customerProfile } from '../../data/customerData';
import { formatCurrency, styles } from './customerStyles';

function DetailRow({ label, value }) {
  return (
    <View style={[styles.row, { marginBottom: SPACING.sm }]}>
      <Text style={styles.muted}>{label}</Text>
      <Text style={{ color: COLORS.text, fontWeight: '700', flex: 1, textAlign: 'right' }}>{value}</Text>
    </View>
  );
}

export default function ProfileScreen({ orders, onLogout, customer }) {
  const totalSpent = orders.reduce((total, order) => total + order.amount, 0);
  const profile = {
    ...customerProfile,
    ...customer,
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>{profile.name}</Text>
        <Text style={styles.subtitle}>{profile.email}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal details</Text>
        <DetailRow label="Customer ID" value={profile.id} />
        <DetailRow label="Age" value={profile.age || 'Not added'} />
        <DetailRow label="Phone" value={profile.phone} />
        <DetailRow label="Address" value={profile.address} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Order summary</Text>
        <DetailRow label="Total orders" value={`${orders.length}`} />
        <DetailRow label="Total spent" value={formatCurrency(totalSpent)} />
        <DetailRow label="Latest order" value={orders[0]?.id || 'No orders yet'} />
      </View>

      <TouchableOpacity style={styles.secondaryButton} onPress={onLogout} activeOpacity={0.7}>
        <Text style={styles.secondaryButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
