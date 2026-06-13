import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AdminNavigator from './src/navigation/AdminNavigator';
import CustomerNavigator from './src/navigation/CustomerNavigator';
import { COLORS, RADIUS, SPACING } from './src/constants/theme';
import { products as initialProducts } from './src/data/mockData';

function RoleButton({ label, onPress, variant = 'primary' }) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: isPrimary ? COLORS.primary : COLORS.surface,
        borderColor: isPrimary ? COLORS.primary : COLORS.border,
        borderWidth: 1,
        borderRadius: RADIUS.sm,
        paddingVertical: 16,
        paddingHorizontal: SPACING.lg,
        alignItems: 'center',
        opacity: pressed ? 0.82 : 1,
      })}
    >
      <Text
        style={{
          color: isPrimary ? COLORS.surface : COLORS.text,
          fontSize: 17,
          fontWeight: '700',
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function RoleSelectionScreen({ onSelectAdmin, onSelectCustomer }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        padding: SPACING.xl,
        gap: SPACING.lg,
      }}
    >
      <View style={{ gap: SPACING.sm }}>
        <Text style={{ color: COLORS.text, fontSize: 30, fontWeight: '800' }}>Choose your access</Text>
        <Text style={{ color: COLORS.textSecondary, fontSize: 16, lineHeight: 24 }}>
          Continue as an admin to manage the store, or open the customer welcome screen.
        </Text>
      </View>

      <View style={{ gap: SPACING.md }}>
        <RoleButton label="Admin" onPress={onSelectAdmin} />
        <RoleButton label="Customer" onPress={onSelectCustomer} variant="secondary" />
      </View>
    </View>
  );
}

export default function App() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [products, setProducts] = useState(initialProducts);
  const handleLogout = () => setSelectedRole(null);

  const handleSaveProduct = (product) => {
    setProducts((current) => {
      const exists = current.some((item) => item.id === product.id);

      if (exists) {
        return current.map((item) => (item.id === product.id ? product : item));
      }

      return [product, ...current];
    });
  };

  const handleDeleteProduct = (productId) => {
    setProducts((current) => current.filter((item) => item.id !== productId));
  };

  const content = selectedRole === 'admin'
    ? (
      <AdminNavigator
        onLogout={handleLogout}
        products={products}
        onSaveProduct={handleSaveProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    )
    : selectedRole === 'customer'
      ? <CustomerNavigator onLogout={handleLogout} products={products} />
      : (
        <RoleSelectionScreen
          onSelectAdmin={() => setSelectedRole('admin')}
          onSelectCustomer={() => setSelectedRole('customer')}
        />
      );

  return (
    <SafeAreaProvider>
      {content}
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
