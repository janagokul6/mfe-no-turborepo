import { STORAGE_KEYS } from '@org/contracts';

function readAll(): Record<string, any[]> {
  const raw = localStorage.getItem(STORAGE_KEYS.CART_DATA);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writeAll(all: Record<string, any[]>) {
  localStorage.setItem(STORAGE_KEYS.CART_DATA, JSON.stringify(all));
}

export function getCart(userId: string): any[] {
  const all = readAll();
  return all[userId] || [];
}

export function addToCart(userId: string, product: any) {
  const all = readAll();
  if (!all[userId]) all[userId] = [];
  const id = product.id ?? product._id;
  const existing = all[userId].find((i: any) => i.productId === id);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    all[userId].push({
      productId: id,
      qty: 1,
      title: product.title || product.name,
      price: product.price,
      image: product.image || product.thumbnail,
    });
  }
  writeAll(all);
  return all[userId];
}

export function clearCart(userId: string) {
  const all = readAll();
  all[userId] = [];
  writeAll(all);
  return [];
}

// alias
export const addToCartMock = addToCart;
export const getCartFromStorage = getCart;
