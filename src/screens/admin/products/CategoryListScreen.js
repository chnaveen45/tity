import { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../../../constants/theme';
import { categories as initialCategories } from '../../../data/mockData';
import ScreenHeader from '../../../components/admin/ScreenHeader';
import ListItem from '../../../components/admin/ListItem';

export default function CategoryListScreen() {
  const [categories, setCategories] = useState(initialCategories);
  const [newName, setNewName] = useState('');

  const handleAdd = () => {
    if (!newName.trim()) return;
    setCategories([...categories, { id: String(Date.now()), name: newName.trim(), productCount: 0 }]);
    setNewName('');
    Alert.alert('Success', 'Category added.');
  };

  const handleDelete = (id) => {
    Alert.alert('Delete Category', 'Remove this category?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setCategories(categories.filter((c) => c.id !== id)),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader title="Categories" subtitle="Manage product categories" />

      <View style={styles.addRow}>
        <TextInput
          style={styles.input}
          value={newName}
          onChangeText={setNewName}
          placeholder="New category name"
          placeholderTextColor={COLORS.textSecondary}
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      {categories.map((cat) => (
        <ListItem
          key={cat.id}
          title={cat.name}
          subtitle={`${cat.productCount} products`}
          onPress={() => handleDelete(cat.id)}
        />
      ))}
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
  addRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    fontSize: 15,
    color: COLORS.text,
  },
  addBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#FFF',
    fontWeight: '600',
  },
});
