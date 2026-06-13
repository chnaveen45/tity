export const dashboardStats = {
  totalRevenue: 48250,
  totalOrders: 1284,
  totalProducts: 86,
  lowStockCount: 5,
  pendingOrders: 23,
  activeCustomers: 412,
};

export const recentOrders = [
  { id: 'ORD-1024', customer: 'Priya Sharma', amount: 2499, status: 'pending', date: '2026-06-13' },
  { id: 'ORD-1023', customer: 'Rahul Verma', amount: 899, status: 'paid', date: '2026-06-13' },
  { id: 'ORD-1022', customer: 'Anita Desai', amount: 4599, status: 'shipped', date: '2026-06-12' },
  { id: 'ORD-1021', customer: 'Vikram Singh', amount: 1299, status: 'delivered', date: '2026-06-12' },
  { id: 'ORD-1020', customer: 'Meera Patel', amount: 3299, status: 'cancelled', date: '2026-06-11' },
];

export const products = [
  { id: '1', name: 'Wireless Earbuds', category: 'Electronics', price: 2499, stock: 45, status: 'active' },
  { id: '2', name: 'Cotton T-Shirt', category: 'Clothing', price: 599, stock: 120, status: 'active' },
  { id: '3', name: 'Running Shoes', category: 'Footwear', price: 3499, stock: 8, status: 'active' },
  { id: '4', name: 'Smart Watch', category: 'Electronics', price: 5999, stock: 3, status: 'active' },
  { id: '5', name: 'Leather Wallet', category: 'Accessories', price: 899, stock: 0, status: 'inactive' },
  { id: '6', name: 'Bluetooth Speaker', category: 'Electronics', price: 1999, stock: 22, status: 'active' },
];

export const categories = [
  { id: '1', name: 'Electronics', productCount: 24 },
  { id: '2', name: 'Clothing', productCount: 18 },
  { id: '3', name: 'Footwear', productCount: 12 },
  { id: '4', name: 'Accessories', productCount: 15 },
  { id: '5', name: 'Home & Kitchen', productCount: 17 },
];

export const customers = [
  { id: '1', name: 'Priya Sharma', email: 'priya@email.com', orders: 12, status: 'active' },
  { id: '2', name: 'Rahul Verma', email: 'rahul@email.com', orders: 8, status: 'active' },
  { id: '3', name: 'Anita Desai', email: 'anita@email.com', orders: 5, status: 'active' },
  { id: '4', name: 'Vikram Singh', email: 'vikram@email.com', orders: 3, status: 'inactive' },
  { id: '5', name: 'Meera Patel', email: 'meera@email.com', orders: 15, status: 'active' },
];

export const deliveryAgents = [
  { id: '1', name: 'Arjun Mehta', phone: '+91 98765 43210', zone: 'North Delhi', status: 'active', deliveries: 156 },
  { id: '2', name: 'Suresh Kumar', phone: '+91 98765 43211', zone: 'South Mumbai', status: 'active', deliveries: 203 },
  { id: '3', name: 'Deepak Rao', phone: '+91 98765 43212', zone: 'East Bangalore', status: 'inactive', deliveries: 89 },
  { id: '4', name: 'Kiran Nair', phone: '+91 98765 43213', zone: 'West Chennai', status: 'active', deliveries: 134 },
];

export const orders = [
  {
    id: 'ORD-1024',
    customer: 'Priya Sharma',
    email: 'priya@email.com',
    items: [{ name: 'Wireless Earbuds', qty: 1, price: 2499 }],
    amount: 2499,
    status: 'pending',
    payment: 'pending',
    date: '2026-06-13',
    agent: null,
  },
  {
    id: 'ORD-1023',
    customer: 'Rahul Verma',
    email: 'rahul@email.com',
    items: [{ name: 'Cotton T-Shirt', qty: 2, price: 599 }],
    amount: 1198,
    status: 'paid',
    payment: 'paid',
    date: '2026-06-13',
    agent: 'Arjun Mehta',
  },
  {
    id: 'ORD-1022',
    customer: 'Anita Desai',
    email: 'anita@email.com',
    items: [{ name: 'Smart Watch', qty: 1, price: 5999 }],
    amount: 5999,
    status: 'shipped',
    payment: 'paid',
    date: '2026-06-12',
    agent: 'Suresh Kumar',
  },
  {
    id: 'ORD-1021',
    customer: 'Vikram Singh',
    email: 'vikram@email.com',
    items: [{ name: 'Running Shoes', qty: 1, price: 3499 }],
    amount: 3499,
    status: 'delivered',
    payment: 'paid',
    date: '2026-06-12',
    agent: 'Kiran Nair',
  },
  {
    id: 'ORD-1020',
    customer: 'Meera Patel',
    email: 'meera@email.com',
    items: [{ name: 'Bluetooth Speaker', qty: 1, price: 1999 }],
    amount: 1999,
    status: 'cancelled',
    payment: 'refunded',
    date: '2026-06-11',
    agent: null,
  },
];

export const transactions = [
  { id: 'TXN-501', orderId: 'ORD-1023', customer: 'Rahul Verma', amount: 1198, status: 'paid', date: '2026-06-13' },
  { id: 'TXN-500', orderId: 'ORD-1022', customer: 'Anita Desai', amount: 5999, status: 'paid', date: '2026-06-12' },
  { id: 'TXN-499', orderId: 'ORD-1021', customer: 'Vikram Singh', amount: 3499, status: 'paid', date: '2026-06-12' },
  { id: 'TXN-498', orderId: 'ORD-1020', customer: 'Meera Patel', amount: 1999, status: 'refunded', date: '2026-06-11' },
  { id: 'TXN-497', orderId: 'ORD-1019', customer: 'Priya Sharma', amount: 2499, status: 'paid', date: '2026-06-10' },
];

export const salesReport = {
  monthlyRevenue: [32000, 38500, 41200, 45800, 48250],
  months: ['Feb', 'Mar', 'Apr', 'May', 'Jun'],
  topProducts: [
    { name: 'Wireless Earbuds', sold: 142, revenue: 354858 },
    { name: 'Smart Watch', sold: 89, revenue: 533911 },
    { name: 'Running Shoes', sold: 76, revenue: 265924 },
  ],
};

export const campaigns = [
  { id: '1', name: 'Summer Sale', discount: '20%', startDate: '2026-06-01', endDate: '2026-06-30', status: 'active' },
  { id: '2', name: 'New User Offer', discount: '₹500 off', startDate: '2026-06-01', endDate: '2026-12-31', status: 'active' },
  { id: '3', name: 'Festive Bonanza', discount: '30%', startDate: '2026-10-01', endDate: '2026-10-15', status: 'scheduled' },
];

export const discounts = [
  { id: '1', code: 'SUMMER20', type: 'percentage', value: 20, usage: 145, status: 'active' },
  { id: '2', code: 'NEW500', type: 'flat', value: 500, usage: 89, status: 'active' },
  { id: '3', code: 'WELCOME10', type: 'percentage', value: 10, usage: 312, status: 'active' },
];

export const systemSettings = {
  appName: 'ShopEase',
  taxRate: 18,
  deliveryFee: 49,
  freeDeliveryAbove: 999,
  currency: 'INR',
  supportEmail: 'support@shopease.com',
};
