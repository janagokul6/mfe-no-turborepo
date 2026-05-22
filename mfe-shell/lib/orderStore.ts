import { promises as fs } from 'fs';
import path from 'path';

export type StoredOrder = {
  id: string;
  userId: string;
  createdAt: string;
  items: any[];
  total: number;
  status: string;
};

const dataPath = path.join(process.cwd(), 'data', 'orders.json');

let memoryOrders: StoredOrder[] = [];
let loaded = false;

async function loadFromFile() {
  if (loaded) return;
  try {
    const raw = await fs.readFile(dataPath, 'utf-8');
    memoryOrders = JSON.parse(raw);
    if (!Array.isArray(memoryOrders)) memoryOrders = [];
  } catch {
    memoryOrders = [];
    await fs.mkdir(path.dirname(dataPath), { recursive: true });
    await fs.writeFile(dataPath, '[]');
  }
  loaded = true;
}

async function saveToFile() {
  await fs.writeFile(dataPath, JSON.stringify(memoryOrders, null, 2));
}

export async function getOrdersForUser(userId: string) {
  await loadFromFile();
  return memoryOrders.filter((o) => o.userId === userId);
}

export async function createOrder(payload: {
  userId: string;
  items: any[];
  total: number;
}) {
  await loadFromFile();
  const order: StoredOrder = {
    id: 'ord-' + Date.now(),
    userId: payload.userId,
    createdAt: new Date().toISOString(),
    items: payload.items,
    total: payload.total,
    status: 'placed',
  };
  memoryOrders.unshift(order);
  await saveToFile();
  return order;
}
