const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.18:5000';
const PRODUCTS_PATH = '/api/products';

function normalizeProduct(product) {
  if (!product) {
    return product;
  }

  return {
    ...product,
    id: String(product.id || product._id),
    name: product.name || '',
    category: product.category || '',
    price: Number(product.price || 0),
    stockQuantity: Number(product.stockQuantity ?? product.stock ?? 0),
    status: product.status || 'Active',
    description: product.description || '',
  };
}

function readProductsPayload(data) {
  if (Array.isArray(data)) {
    return data;
  }

  return data?.products || data?.data || [];
}

function readProductPayload(data) {
  return data?.product || data?.data || data;
}

function parseJson(text) {
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  const text = await response.text();
  const data = parseJson(text);

  if (!response.ok) {
    throw new Error(data?.message || data?.error || `Request failed with status ${response.status}.`);
  }

  return data;
}

export async function getProducts() {
  const data = await request(PRODUCTS_PATH);
  return readProductsPayload(data).map(normalizeProduct);
}

export async function getProduct(productId) {
  const data = await request(`${PRODUCTS_PATH}/${encodeURIComponent(productId)}`);
  return normalizeProduct(readProductPayload(data));
}

export async function createProduct(product) {
  const data = await request(PRODUCTS_PATH, {
    method: 'POST',
    body: JSON.stringify(product),
  });

  return normalizeProduct(readProductPayload(data) || product);
}

export async function updateProduct(productId, product) {
  const data = await request(`${PRODUCTS_PATH}/${encodeURIComponent(productId)}`, {
    method: 'PUT',
    body: JSON.stringify(product),
  });

  return normalizeProduct(readProductPayload(data) || { ...product, id: productId });
}

export async function deleteProduct(productId) {
  await request(`${PRODUCTS_PATH}/${encodeURIComponent(productId)}`, {
    method: 'DELETE',
  });
}
