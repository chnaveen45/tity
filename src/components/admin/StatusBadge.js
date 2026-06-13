import { View, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS, STATUS_COLORS } from '../../constants/theme';

export default function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || COLORS.textSecondary;
  const label = status.replace(/_/g, ' ');

  return (
    <View style={[styles.badge, { backgroundColor: color + '18' }]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
