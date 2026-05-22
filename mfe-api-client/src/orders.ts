import { STORAGE_KEYS, Order, OrderItem } from '@org/contracts';
import { clearCart } from './carts';

const API_BASE = 'http://localhost:3000/api/orders';

function readOrdersAll(): Record<string, Order[]> {
  const raw = localStorage.getItem(STORAGE_KEYS.ORDERS_DATA);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writeOrdersAll(all: Record<string, Order[]>) {
  localStorage.setItem(STORAGE_KEYS.ORDERS_DATA, JSON.stringify(all));
}

export function getOrdersLocal(userId: string): Order[] {
  const all = readOrdersAll();
  return all[userId] || [];
}

export function saveOrdersLocal(userId: string, orders: Order[]) {
  const all = readOrdersAll();
  all[userId] = orders;
  writeOrdersAll(all);
}

function calcTotal(items: OrderItem[]) {
  let t = 0;
  items.forEach((i) => {
    t += (i.price || 0) * (i.qty || 1);
  });
  return t;
}

export async function placeOrder(userId: string, items: OrderItem[]): Promise<Order> {
  const total = calcTotal(items);
  const order: Order = {
    id: 'ord-' + Date.now(),
    userId,
    createdAt: new Date().toISOString(),
    items: [...items],
    total,
    status: 'placed',
  };

  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, items, total }),
    });
    if (res.ok) {
      const saved = await res.json();
      order.id = saved.id || order.id;
      order.createdAt = saved.createdAt || order.createdAt;
    }
  } catch (e) {
    console.log('api order fail, saving local only', e);
  }

  const local = getOrdersLocal(userId);
  local.unshift(order);
  saveOrdersLocal(userId, local);
  clearCart(userId);

  return order;
}

export async function fetchOrders(userId: string): Promise<Order[]> {
  try {
    const res = await fetch(`${API_BASE}?userId=${encodeURIComponent(userId)}`);
    if (res.ok) {
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.orders || [];
      if (list.length) {
        saveOrdersLocal(userId, list);
        return list;
      }
    }
  } catch (e) {
    console.log('fetch orders api failed', e);
  }
  return getOrdersLocal(userId);
}
