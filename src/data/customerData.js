import { categories, products } from './mockData';

export const customerProfile = {
  id: 'CUST-1001',
  name: 'Priya Sharma',
  email: 'priya@email.com',
  phone: '+91 98765 41024',
  address: '42 Green Park, New Delhi, Delhi 110016',
};

const productDetails = {
  '1': {
    rating: 4.7,
    description: 'Compact wireless earbuds with clear calls, punchy bass, and a pocket-friendly charging case.',
    highlights: ['24-hour battery life', 'Fast pairing', 'Sweat resistant'],
  },
  '2': {
    rating: 4.4,
    description: 'Soft everyday cotton t-shirt with a relaxed fit for daily comfort.',
    highlights: ['100% cotton', 'Machine washable', 'Regular fit'],
  },
  '3': {
    rating: 4.6,
    description: 'Lightweight running shoes built for comfortable walks, jogs, and gym sessions.',
    highlights: ['Cushioned sole', 'Breathable upper', 'Strong grip'],
  },
  '4': {
    rating: 4.5,
    description: 'Smart watch with fitness tracking, notifications, and long battery life.',
    highlights: ['Heart-rate tracking', 'Sleep monitor', 'Water resistant'],
  },
  '5': {
    rating: 4.2,
    description: 'Slim leather wallet with clean stitching and practical card storage.',
    highlights: ['Genuine leather', 'Six card slots', 'Compact profile'],
  },
  '6': {
    rating: 4.3,
    description: 'Portable Bluetooth speaker with room-filling sound for home and travel.',
    highlights: ['Deep bass', 'Wireless playback', 'Rechargeable battery'],
  },
};

export const buildCustomerProducts = (sourceProducts) => sourceProducts.map((product) => {
  const details = {
    ...productDetails[product.id],
    ...(product.description ? { description: product.description } : {}),
  };

  return {
    ...product,
    ...(details.rating ? details : {
      rating: 4,
      description: product.description || 'Quality product selected for everyday customer needs.',
      highlights: ['Reliable quality', 'Easy to use', 'Good value'],
    }),
  };
});

export const customerProducts = buildCustomerProducts(products);

export const customerCategories = [{ id: 'all', name: 'All', productCount: customerProducts.length }, ...categories];

export const customerOrders = [
  {
    id: 'ORD-1024',
    date: '2026-06-13',
    status: 'pending',
    payment: 'pending',
    deliveryStep: 1,
    deliveryEta: 'Processing today',
    items: [{ name: 'Wireless Earbuds', qty: 1, price: 2499 }],
    amount: 2499,
  },
  {
    id: 'ORD-1019',
    date: '2026-06-10',
    status: 'shipped',
    payment: 'paid',
    deliveryStep: 3,
    deliveryEta: 'Arriving tomorrow',
    items: [{ name: 'Bluetooth Speaker', qty: 1, price: 1999 }],
    amount: 1999,
  },
  {
    id: 'ORD-1014',
    date: '2026-06-02',
    status: 'delivered',
    payment: 'paid',
    deliveryStep: 4,
    deliveryEta: 'Delivered on 2026-06-05',
    items: [{ name: 'Cotton T-Shirt', qty: 2, price: 599 }],
    amount: 1198,
  },
];
