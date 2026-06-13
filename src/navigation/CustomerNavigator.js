import { useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../constants/theme';
import { buildCustomerProducts, customerOrders } from '../data/customerData';

import ProductCatalogScreen from '../screens/customer/ProductCatalogScreen';
import ProductDetailScreen from '../screens/customer/ProductDetailScreen';
import CartScreen from '../screens/customer/CartScreen';
import WishlistScreen from '../screens/customer/WishlistScreen';
import OrderHistoryScreen from '../screens/customer/OrderHistoryScreen';
import OrderTrackingScreen from '../screens/customer/OrderTrackingScreen';
import ProfileScreen from '../screens/customer/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: COLORS.surface },
  headerTintColor: COLORS.text,
  headerTitleStyle: { fontWeight: '600' },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: COLORS.background },
};

function ShopStack({ products, cartItems, wishlistIds, onAddToCart, onToggleWishlist }) {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="ProductCatalog" options={{ title: 'Shop' }}>
        {(props) => (
          <ProductCatalogScreen
            {...props}
            products={products}
            cartItems={cartItems}
            wishlistIds={wishlistIds}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ProductDetail" options={{ title: 'Product Details' }}>
        {(props) => (
          <ProductDetailScreen
            {...props}
            products={products}
            cartItems={cartItems}
            wishlistIds={wishlistIds}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function OrdersStack({ orders }) {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="OrderHistory" options={{ title: 'My Orders' }}>
        {(props) => <OrderHistoryScreen {...props} orders={orders} />}
      </Stack.Screen>
      <Stack.Screen name="OrderTracking" options={{ title: 'Track Order' }}>
        {(props) => <OrderTrackingScreen {...props} orders={orders} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function CustomerNavigator({ onLogout, products }) {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistIds, setWishlistIds] = useState(['4']);
  const [orders, setOrders] = useState(customerOrders);

  const customerProducts = useMemo(() => buildCustomerProducts(products), [products]);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.qty, 0),
    [cartItems]
  );

  const handleAddToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) => (
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        ));
      }

      return [{ ...product, qty: 1 }, ...current];
    });
  };

  const handleUpdateQuantity = (productId, nextQty) => {
    setCartItems((current) => (
      nextQty <= 0
        ? current.filter((item) => item.id !== productId)
        : current.map((item) => (item.id === productId ? { ...item, qty: nextQty } : item))
    ));
  };

  const handleToggleWishlist = (productId) => {
    setWishlistIds((current) => (
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [productId, ...current]
    ));
  };

  const handlePlaceOrder = (paymentMethod) => {
    if (cartItems.length === 0) {
      return null;
    }

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.qty, 0);
    const order = {
      id: `ORD-${Math.floor(2000 + Math.random() * 7000)}`,
      date: '2026-06-13',
      status: 'pending',
      payment: paymentMethod === 'Cash on Delivery' ? 'pending' : 'paid',
      deliveryStep: 1,
      deliveryEta: 'Processing today',
      items: cartItems.map(({ name, qty, price }) => ({ name, qty, price })),
      amount: subtotal,
    };

    setOrders((current) => [order, ...current]);
    setCartItems([]);
    return order.id;
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textSecondary,
          tabBarStyle: {
            backgroundColor: COLORS.surface,
            borderTopColor: COLORS.border,
            paddingBottom: 4,
            height: 58,
          },
          tabBarIcon: ({ color, size }) => {
            const icons = {
              ShopTab: 'storefront-outline',
              WishlistTab: 'heart-outline',
              CartTab: 'cart-outline',
              OrdersTab: 'receipt-outline',
              ProfileTab: 'person-outline',
            };
            return <Ionicons name={icons[route.name]} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="ShopTab" options={{ title: 'Shop' }}>
          {() => (
            <ShopStack
              products={customerProducts}
              cartItems={cartItems}
              wishlistIds={wishlistIds}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="WishlistTab" options={{ title: 'Wishlist' }}>
          {(props) => (
            <WishlistScreen
              {...props}
              products={customerProducts}
              wishlistIds={wishlistIds}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="CartTab"
          options={{ title: 'Cart', tabBarBadge: cartCount || undefined }}
        >
          {(props) => (
            <CartScreen
              {...props}
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onPlaceOrder={handlePlaceOrder}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="OrdersTab" options={{ title: 'Orders' }}>
          {() => <OrdersStack orders={orders} />}
        </Tab.Screen>
        <Tab.Screen
          name="ProfileTab"
          options={{
            title: 'Profile',
            headerShown: true,
            headerTitle: 'Profile',
            headerStyle: screenOptions.headerStyle,
            headerTintColor: COLORS.text,
          }}
        >
          {(props) => <ProfileScreen {...props} orders={orders} onLogout={onLogout} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
