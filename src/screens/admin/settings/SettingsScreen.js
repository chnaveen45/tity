import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../../../constants/theme';
import { systemSettings as initialSettings } from '../../../data/mockData';
import ScreenHeader from '../../../components/admin/ScreenHeader';

export default function SettingsScreen() {
  const [settings, setSettings] = useState(initialSettings);

  const update = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    Alert.alert('Saved', 'System settings updated successfully.');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader title="Settings" subtitle="System-wide configuration" />

      <Text style={styles.label}>App Name</Text>
      <TextInput
        style={styles.input}
        value={settings.appName}
        onChangeText={(v) => update('appName', v)}
      />

      <Text style={styles.label}>Tax Rate (%)</Text>
      <TextInput
        style={styles.input}
        value={String(settings.taxRate)}
        onChangeText={(v) => update('taxRate', Number(v) || 0)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Delivery Fee (₹)</Text>
      <TextInput
        style={styles.input}
        value={String(settings.deliveryFee)}
        onChangeText={(v) => update('deliveryFee', Number(v) || 0)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Free Delivery Above (₹)</Text>
      <TextInput
        style={styles.input}
        value={String(settings.freeDeliveryAbove)}
        onChangeText={(v) => update('freeDeliveryAbove', Number(v) || 0)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Currency</Text>
      <TextInput
        style={styles.input}
        value={settings.currency}
        onChangeText={(v) => update('currency', v)}
      />

      <Text style={styles.label}>Support Email</Text>
      <TextInput
        style={styles.input}
        value={settings.supportEmail}
        onChangeText={(v) => update('supportEmail', v)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    fontSize: 15,
    color: COLORS.text,
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
