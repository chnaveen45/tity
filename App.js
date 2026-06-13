import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
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

const emptyCustomerForm = {
  name: '',
  age: '',
  email: '',
  password: '',
};

function CustomerAuthScreen({
  mode,
  form,
  onChangeField,
  onRegister,
  onLogin,
  onShowLogin,
  onShowRegister,
  error,
}) {
  const isRegistering = mode === 'register';

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          padding: SPACING.xl,
          paddingBottom: SPACING.xl * 2,
          gap: SPACING.lg,
        }}
      >
        <View style={{ gap: SPACING.sm }}>
          <Text style={{ color: COLORS.text, fontSize: 30, fontWeight: '800' }}>
            {isRegistering ? 'Customer Registration' : 'Customer Login'}
          </Text>
          <Text style={{ color: COLORS.textSecondary, fontSize: 16, lineHeight: 24 }}>
            {isRegistering
              ? 'Create your customer account before opening the dashboard.'
              : 'Login with your registered customer email and password.'}
          </Text>
        </View>

        <View style={{ gap: SPACING.md }}>
          {isRegistering && (
            <>
              <TextInput
                value={form.name}
                onChangeText={(value) => onChangeField('name', value)}
                placeholder="Name"
                placeholderTextColor={COLORS.textSecondary}
                style={authStyles.input}
              />
              <TextInput
                value={form.age}
                onChangeText={(value) => onChangeField('age', value)}
                placeholder="Age"
                placeholderTextColor={COLORS.textSecondary}
                keyboardType="number-pad"
                style={authStyles.input}
              />
            </>
          )}

          <TextInput
            value={form.email}
            onChangeText={(value) => onChangeField('email', value)}
            placeholder="Email"
            placeholderTextColor={COLORS.textSecondary}
            autoCapitalize="none"
            keyboardType="email-address"
            style={authStyles.input}
          />
          <TextInput
            value={form.password}
            onChangeText={(value) => onChangeField('password', value)}
            placeholder="Password"
            placeholderTextColor={COLORS.textSecondary}
            secureTextEntry
            style={authStyles.input}
          />

          {error ? <Text style={{ color: COLORS.danger, fontWeight: '700' }}>{error}</Text> : null}

          <RoleButton
            label={isRegistering ? 'Register' : 'Login'}
            onPress={isRegistering ? onRegister : onLogin}
          />

          {isRegistering && (
            <Pressable
              onPress={onShowLogin}
              style={({ pressed }) => ({
                alignItems: 'center',
                paddingVertical: SPACING.sm,
                opacity: pressed ? 0.72 : 1,
              })}
            >
              <Text style={{ color: COLORS.primary, fontSize: 15, fontWeight: '700' }}>
                Already have an account? Login
              </Text>
            </Pressable>
          )}

          {!isRegistering && (
            <Pressable
              onPress={onShowRegister}
              style={({ pressed }) => ({
                alignItems: 'center',
                paddingVertical: SPACING.sm,
                opacity: pressed ? 0.72 : 1,
              })}
            >
              <Text style={{ color: COLORS.primary, fontSize: 15, fontWeight: '700' }}>
                New customer? Register
              </Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const authStyles = {
  input: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: RADIUS.sm,
    color: COLORS.text,
    fontSize: 16,
    paddingHorizontal: SPACING.md,
    paddingVertical: 14,
  },
};

export default function App() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [products, setProducts] = useState(initialProducts);
  const [customerAuthMode, setCustomerAuthMode] = useState('register');
  const [customerForm, setCustomerForm] = useState(emptyCustomerForm);
  const [registeredCustomer, setRegisteredCustomer] = useState(null);
  const [authError, setAuthError] = useState('');

  const handleLogout = () => {
    setSelectedRole(null);
    setAuthError('');
  };

  const handleCustomerFieldChange = (field, value) => {
    setCustomerForm((current) => ({ ...current, [field]: value }));
    setAuthError('');
  };

  const handleSelectCustomer = () => {
    setSelectedRole('customerAuth');
    setCustomerAuthMode('register');
    setCustomerForm(emptyCustomerForm);
    setAuthError('');
  };

  const handleRegisterCustomer = () => {
    const nextCustomer = {
      name: customerForm.name.trim(),
      age: customerForm.age.trim(),
      email: customerForm.email.trim().toLowerCase(),
      password: customerForm.password,
    };

    if (!nextCustomer.name || !nextCustomer.age || !nextCustomer.email || !nextCustomer.password) {
      setAuthError('Please fill name, age, email, and password.');
      return;
    }

    setRegisteredCustomer(nextCustomer);
    setCustomerForm({ ...emptyCustomerForm, email: nextCustomer.email });
    setCustomerAuthMode('login');
    setAuthError('');
  };

  const handleShowCustomerLogin = () => {
    setCustomerAuthMode('login');
    setAuthError('');
  };

  const handleShowCustomerRegister = () => {
    setCustomerAuthMode('register');
    setAuthError('');
  };

  const handleCustomerLogin = () => {
    const email = customerForm.email.trim().toLowerCase();

    if (
      registeredCustomer
      && email === registeredCustomer.email
      && customerForm.password === registeredCustomer.password
    ) {
      setSelectedRole('customer');
      setAuthError('');
      return;
    }

    setAuthError('Invalid customer email or password.');
  };

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
      ? <CustomerNavigator onLogout={handleLogout} products={products} customer={registeredCustomer} />
      : selectedRole === 'customerAuth'
        ? (
          <CustomerAuthScreen
            mode={customerAuthMode}
            form={customerForm}
            onChangeField={handleCustomerFieldChange}
            onRegister={handleRegisterCustomer}
            onLogin={handleCustomerLogin}
            onShowLogin={handleShowCustomerLogin}
            onShowRegister={handleShowCustomerRegister}
            error={authError}
          />
        )
      : (
        <RoleSelectionScreen
          onSelectAdmin={() => setSelectedRole('admin')}
          onSelectCustomer={handleSelectCustomer}
        />
      );

  return (
    <SafeAreaProvider>
      {content}
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
