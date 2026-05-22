const PRODUCTS_URL = 'https://api.jsoning.com/mock/public/products';

export async function fetchProducts(): Promise<any[]> {
  const res = await fetch(PRODUCTS_URL);
  const data = await res.json();
  if (Array.isArray(data)) return data;
  if (data.products) return data.products;
  return data.data || [];
}
