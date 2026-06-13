import { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../../../constants/theme';
import { categories } from '../../../data/mockData';
import ScreenHeader from '../../../components/admin/ScreenHeader';

export default function ProductFormScreen({ route, navigation, products, onSaveProduct, onDeleteProduct }) {
  const productId = route.params?.productId;
  const existing = products.find((product) => product.id === productId);
  const isEdit = !!existing;

  const [name, setName] = useState(existing?.name || '');
  const [category, setCategory] = useState(existing?.category || categories[0].name);
  const [price, setPrice] = useState(existing?.price?.toString() || '');
  const [stock, setStock] = useState(existing?.stock?.toString() || '');
  const [status, setStatus] = useState(existing?.status || 'active');
  const [description, setDescription] = useState(existing?.description || '');

  const handleSave = () => {
    const parsedPrice = Number(price);
    const parsedStock = Number(stock || 0);

    if (!name.trim() || !price.trim() || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert('Validation', 'Product name and a valid price are required.');
      return;
    }

    if (Number.isNaN(parsedStock) || parsedStock < 0) {
      Alert.alert('Validation', 'Stock quantity must be zero or more.');
      return;
    }

    onSaveProduct({
      id: existing?.id || String(Date.now()),
      name: name.trim(),
      category,
      price: parsedPrice,
      stock: parsedStock,
      status,
      description: description.trim(),
    });

    Alert.alert('Success', `Product ${isEdit ? 'updated' : 'added'} successfully.`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  const handleDelete = () => {
    Alert.alert('Delete Product', 'Are you sure you want to remove this listing?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          onDeleteProduct(existing.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader
        title={isEdit ? 'Edit Product' : 'Add Product'}
        subtitle={isEdit ? 'Update product details' : 'Create a new listing'}
      />

      <Text style={styles.label}>Product Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter product name" />

      <Text style={styles.label}>Category</Text>
      <View style={styles.chipRow}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.chip, category === cat.name && styles.chipActive]}
            onPress={() => setCategory(cat.name)}
          >
            <Text style={[styles.chipText, category === cat.name && styles.chipTextActive]}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Price (Rs.)</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" placeholder="0" />

      <Text style={styles.label}>Stock Quantity</Text>
      <TextInput style={styles.input} value={stock} onChangeText={setStock} keyboardType="numeric" placeholder="0" />

      <Text style={styles.label}>Status</Text>
      <View style={styles.chipRow}>
        {['active', 'inactive'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.chip, status === option && styles.chipActive]}
            onPress={() => setStatus(option)}
          >
            <Text style={[styles.chipText, status === option && styles.chipTextActive]}>
              {option === 'active' ? 'Active' : 'Inactive'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Product description"
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>{isEdit ? 'Update Product' : 'Add Product'}</Text>
      </TouchableOpacity>

      {isEdit && (
        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Text style={styles.deleteBtnText}>Remove Listing</Text>
        </TouchableOpacity>
      )}
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
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  chipTextActive: {
    color: '#FFF',
    fontWeight: '600',
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
  deleteBtn: {
    borderRadius: RADIUS.sm,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  deleteBtnText: {
    color: COLORS.danger,
    fontSize: 15,
    fontWeight: '600',
  },
});
