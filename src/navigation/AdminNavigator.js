import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../constants/theme';

import DashboardScreen from '../screens/admin/dashboard/DashboardScreen';
import ProductListScreen from '../screens/admin/products/ProductListScreen';
import ProductFormScreen from '../screens/admin/products/ProductFormScreen';
import CategoryListScreen from '../screens/admin/products/CategoryListScreen';
import OrderListScreen from '../screens/admin/orders/OrderListScreen';
import OrderDetailScreen from '../screens/admin/orders/OrderDetailScreen';
import UsersScreen from '../screens/admin/users/UsersScreen';
import MoreScreen from '../screens/admin/more/MoreScreen';
import InventoryScreen from '../screens/admin/inventory/InventoryScreen';
import TransactionsScreen from '../screens/admin/finance/TransactionsScreen';
import ReportsScreen from '../screens/admin/reports/ReportsScreen';
import CampaignsScreen from '../screens/admin/marketing/CampaignsScreen';
import DiscountsScreen from '../screens/admin/marketing/DiscountsScreen';
import SettingsScreen from '../screens/admin/settings/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: COLORS.surface },
  headerTintColor: COLORS.text,
  headerTitleStyle: { fontWeight: '600' },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: COLORS.background },
};

function ProductsStack({ products, onSaveProduct, onDeleteProduct }) {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="ProductList" options={{ title: 'Products' }}>
        {(props) => <ProductListScreen {...props} products={products} />}
      </Stack.Screen>
      <Stack.Screen name="ProductForm" options={{ title: 'Product' }}>
        {(props) => (
          <ProductFormScreen
            {...props}
            products={products}
            onSaveProduct={onSaveProduct}
            onDeleteProduct={onDeleteProduct}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Categories" component={CategoryListScreen} options={{ title: 'Categories' }} />
    </Stack.Navigator>
  );
}

function OrdersStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="OrderList" component={OrderListScreen} options={{ title: 'Orders' }} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ title: 'Order Details' }} />
    </Stack.Navigator>
  );
}

function MoreStack({ onLogout }) {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="MoreMenu" options={{ title: 'More' }}>
        {(props) => <MoreScreen {...props} onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen name="Inventory" component={InventoryScreen} options={{ title: 'Inventory' }} />
      <Stack.Screen name="Categories" component={CategoryListScreen} options={{ title: 'Categories' }} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} options={{ title: 'Transactions' }} />
      <Stack.Screen name="Reports" component={ReportsScreen} options={{ title: 'Reports' }} />
      <Stack.Screen name="Campaigns" component={CampaignsScreen} options={{ title: 'Campaigns' }} />
      <Stack.Screen name="Discounts" component={DiscountsScreen} options={{ title: 'Discounts' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
    </Stack.Navigator>
  );
}

function AdminTabs({ onLogout, products, onSaveProduct, onDeleteProduct }) {
  return (
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
            Dashboard: 'home-outline',
            ProductsTab: 'pricetags-outline',
            OrdersTab: 'receipt-outline',
            UsersTab: 'people-outline',
            MoreTab: 'menu-outline',
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Dashboard', headerShown: true, headerStyle: screenOptions.headerStyle, headerTintColor: COLORS.text }}
      />
      <Tab.Screen name="ProductsTab" options={{ title: 'Products' }}>
        {() => (
          <ProductsStack
            products={products}
            onSaveProduct={onSaveProduct}
            onDeleteProduct={onDeleteProduct}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="OrdersTab" component={OrdersStack} options={{ title: 'Orders' }} />
      <Tab.Screen
        name="UsersTab"
        component={UsersScreen}
        options={{ title: 'Users', headerShown: true, headerTitle: 'Users', headerStyle: screenOptions.headerStyle, headerTintColor: COLORS.text }}
      />
      <Tab.Screen name="MoreTab" options={{ title: 'More' }}>
        {() => <MoreStack onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function AdminNavigator({ onLogout, products, onSaveProduct, onDeleteProduct }) {
  return (
    <NavigationContainer>
      <AdminTabs
        onLogout={onLogout}
        products={products}
        onSaveProduct={onSaveProduct}
        onDeleteProduct={onDeleteProduct}
      />
    </NavigationContainer>
  );
}
