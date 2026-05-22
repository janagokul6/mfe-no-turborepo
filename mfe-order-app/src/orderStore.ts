import { createStore } from 'zustand/vanilla';

export const orderStore = createStore((set: any) => ({
  orders: [] as any[],
  loading: false,
  setOrders: (orders: any[]) => set({ orders }),
  setLoading: (loading: boolean) => set({ loading }),
}));
