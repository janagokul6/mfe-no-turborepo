import '@org/ui/dist/style.css';
import { useEffect, useState } from 'react';
import { fetchOrders } from '@org/api-client';
import { getToken } from '@org/contracts';
import { orderStore } from './orderStore';
import { PageTitle, Spinner } from '@org/ui';

export type ShellProps = { user?: any };

export default function OrderPage(props: ShellProps) {
  const [orders, setOrdersLocal] = useState<any[]>([]);
  const [loading, setLoadingLocal] = useState(false);

  useEffect(() => {
    const sync = () => {
      const s = orderStore.getState();
      setOrdersLocal(s.orders);
      setLoadingLocal(s.loading);
    };
    sync();
    return orderStore.subscribe(sync);
  }, []);

  useEffect(() => {
    const token = getToken() || '';
    const userId = token.replace('user-', '') || 'guest';
    const { setOrders, setLoading } = orderStore.getState();
    setLoading(true);
    fetchOrders(userId)
      .then((list) => setOrders(list))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6"><Spinner /></div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <PageTitle>Orders</PageTitle>
      {orders.length === 0 && (
        <p className="text-gray-500 p-4">no orders yet — checkout from cart</p>
      )}
      {orders.map((o: any) => (
        <div key={o.id} className="border rounded mb-4 bg-white overflow-hidden">
          <div className="grid grid-cols-4 bg-gray-100 font-bold p-2 border-b text-sm">
            <div>#{o.id}</div>
            <div>{new Date(o.createdAt).toLocaleDateString()}</div>
            <div>${Number(o.total).toFixed(2)}</div>
            <div className="text-green-600">{o.status}</div>
          </div>
          <div className="p-3">
            <p className="text-xs text-gray-500 mb-2">items in this order:</p>
            {(o.items || []).map((item: any, idx: number) => (
              <div
                key={idx}
                className="flex justify-between py-2 border-b border-gray-100 text-sm"
              >
                <span>{item.title || item.productId}</span>
                <span>
                  x{item.qty || 1} — ${item.price || 0}
                </span>
              </div>
            ))}
            {(!o.items || o.items.length === 0) && (
              <p className="text-gray-400 text-sm">no line items</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
