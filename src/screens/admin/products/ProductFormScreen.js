import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../../../constants/theme';
import { categories } from '../../../data/mockData';
import ScreenHeader from '../../../components/admin/ScreenHeader';
import { createProduct, deleteProduct, getProduct, updateProduct } from './productApi';

export default function ProductFormScreen({ route, navigation, products = [], onSaveProduct, onDeleteProduct }) {
  const productId = route.params?.productId;
  const routeProduct = route.params?.product;
  const [existing, setExisting] = useState(routeProduct || products.find((product) => product.id === productId));
  const isEdit = !!productId;

  const [name, setName] = useState(existing?.name || '');
  const [category, setCategory] = useState(existing?.category || categories[0].name);
  const [price, setPrice] = useState(existing?.price?.toString() || '');
  const [stock, setStock] = useState(existing?.stockQuantity?.toString() || existing?.stock?.toString() || '');
  const [status, setStatus] = useState(existing?.status || 'Active');
  const [description, setDescription] = useState(existing?.description || '');
  const [isLoading, setIsLoading] = useState(!!productId && !existing);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!productId) {
      return;
    }

    let isMounted = true;

    async function loadProduct() {
      setIsLoading(true);

      try {
        const product = await getProduct(productId);

        if (!isMounted) {
          return;
        }

        setExisting(product);
        setName(product.name || '');
        setCategory(product.category || categories[0].name);
        setPrice(product.price?.toString() || '');
        setStock(product.stockQuantity?.toString() || product.stock?.toString() || '');
        setStatus(product.status || 'Active');
        setDescription(product.description || '');
        setError('');
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'Unable to load product details.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  const handleSave = async () => {
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

    const productPayload = {
      name: name.trim(),
      category,
      price: parsedPrice,
      stockQuantity: parsedStock,
      status,
      description: description.trim(),
    };

    setIsSaving(true);
    setError('');

    try {
      const savedProduct = isEdit
        ? await updateProduct(productId, productPayload)
        : await createProduct(productPayload);

      onSaveProduct?.(savedProduct);

      Alert.alert('Success', `Product ${isEdit ? 'updated' : 'added'} successfully.`, [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (saveError) {
      setError(saveError.message || `Unable to ${isEdit ? 'update' : 'add'} product.`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.alert('Delete Product', 'Are you sure you want to remove this listing?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          setIsDeleting(true);
          setError('');

          try {
            await deleteProduct(productId);
            onDeleteProduct?.(productId);
            navigation.goBack();
          } catch (deleteError) {
            setError(deleteError.message || 'Unable to delete product.');
          } finally {
            setIsDeleting(false);
          }
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

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading product...</Text>
        </View>
      ) : (
        <>
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
            {['Active', 'Inactive'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.chip, status === option && styles.chipActive]}
                onPress={() => setStatus(option)}
              >
                <Text style={[styles.chipText, status === option && styles.chipTextActive]}>
                  {option}
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

          <TouchableOpacity style={[styles.saveBtn, isSaving && styles.disabledBtn]} onPress={handleSave} disabled={isSaving || isDeleting}>
            <Text style={styles.saveBtnText}>
              {isSaving ? 'Saving...' : isEdit ? 'Update Product' : 'Add Product'}
            </Text>
          </TouchableOpacity>

          {isEdit && (
            <TouchableOpacity style={[styles.deleteBtn, isDeleting && styles.disabledBtn]} onPress={handleDelete} disabled={isSaving || isDeleting}>
              <Text style={styles.deleteBtnText}>{isDeleting ? 'Removing...' : 'Remove Listing'}</Text>
            </TouchableOpacity>
          )}
        </>
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
  errorText: {
    color: COLORS.danger,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  loading: {
    alignItems: 'center',
    gap: SPACING.sm,
    padding: SPACING.xl,
  },
  loadingText: {
    color: COLORS.textSecondary,
    fontSize: 14,
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
  disabledBtn: {
    opacity: 0.65,
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
