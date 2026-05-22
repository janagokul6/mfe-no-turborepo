import '@org/ui/dist/style.css';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { setItems } from './cartSlice';
import { getCart, clearCart, placeOrder } from '@org/api-client';
import { getToken, EVENTS } from '@org/contracts';
import { PageTitle, Button } from '@org/ui';
import { useEffect, useState } from 'react';

const store = configureStore({ reducer: { cart: cartReducer } });

export type ShellProps = {
  user?: any;
  isAuthenticated?: boolean;
  navigate?: (path: string) => void;
};

export default function CartPage(props: ShellProps) {
  const [items, setItemsState] = useState<any[]>([]);
  const [checkoutMsg, setCheckoutMsg] = useState('');

  useEffect(() => {
    const sync = () => setItemsState(store.getState().cart.items);
    sync();
    return store.subscribe(sync);
  }, []);

  useEffect(() => {
    const token = getToken() || '';
    const userId = token.replace('user-', '') || 'guest';
    const cartItems = getCart(userId);
    store.dispatch(setItems(cartItems));
  }, []);

  const userId = () => (getToken() || '').replace('user-', '') || 'guest';

  let total = 0;
  items.forEach((i: any) => {
    total += (i.price || 0) * (i.qty || 1);
  });

  const handleClear = () => {
    clearCart(userId());
    store.dispatch(setItems([]));
    window.dispatchEvent(new CustomEvent(EVENTS.CART_UPDATED));
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      setCheckoutMsg('cart is empty');
      return;
    }
    setCheckoutMsg('placing order...');
    await placeOrder(userId(), items);
    store.dispatch(setItems([]));
    window.dispatchEvent(new CustomEvent(EVENTS.CART_UPDATED));
    window.dispatchEvent(new CustomEvent(EVENTS.ORDER_PLACED));
    setCheckoutMsg('');
    props.navigate?.('/orders');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageTitle>Cart</PageTitle>
      {checkoutMsg && <p className="text-blue-600 mb-2">{checkoutMsg}</p>}
      <div className="divide-y border rounded-lg bg-white">
        {items.length === 0 && <p className="p-4 text-gray-500">empty cart lol</p>}
        {items.map((item: any, i: number) => (
          <div key={i} className="p-4 flex justify-between gap-2">
            <div className="flex gap-3 items-center">
              {item.image && (
                <img src={item.image} alt="" className="w-12 h-12 object-cover rounded" />
              )}
              <span>{item.title || item.productId}</span>
            </div>
            <span>x{item.qty || 1}</span>
            <span>${item.price || 0}</span>
          </div>
        ))}
      </div>
      <p className="text-right font-bold mt-4 text-xl">Total: ${total.toFixed(2)}</p>
      <div className="flex gap-3 mt-4 justify-end">
        <Button variant="ghost" onClick={handleClear}>
          clear
        </Button>
        <Button onClick={handleCheckout}>Checkout</Button>
      </div>
    </div>
  );
}
