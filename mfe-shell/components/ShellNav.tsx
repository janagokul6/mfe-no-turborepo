'use client';

import Link from 'next/link';
import { useShell } from '@/context/ShellSession';
import { ROUTES, EVENTS } from '@org/contracts';
import { useEffect, useState } from 'react';

export function ShellNav() {
  const { isAuthenticated, logout, user } = useShell();
  const [cartBump, setCartBump] = useState(0);

  useEffect(() => {
    const fn = () => setCartBump((n) => n + 1);
    window.addEventListener(EVENTS.CART_UPDATED, fn);
    return () => window.removeEventListener(EVENTS.CART_UPDATED, fn);
  }, []);

  return (
    <header className="border-b bg-white px-4 py-3 flex items-center gap-4" style={{ marginBottom: 0 }}>
      <Link href={ROUTES.PRODUCTS} className="font-bold text-blue-600 text-lg">
        MFE Shop
      </Link>
      <nav className="flex gap-3 flex-1">
        <Link href={ROUTES.PRODUCTS} className="hover:underline px-2 py-1">Products</Link>
        <Link href={ROUTES.CART} className="hover:underline px-2">
          Cart{cartBump > 0 ? ` (${cartBump})` : ''}
        </Link>
        <Link href={ROUTES.ORDERS} className="hover:underline">Orders</Link>
      </nav>
      <div className="flex gap-2 items-center">
        {isAuthenticated && user ? (
          <>
            <span className="text-sm text-gray-600">
              {user.email || user.username || `${user.firstname || ''} ${user.lastname || ''}`.trim()}
            </span>
            <button onClick={logout} className="text-sm bg-gray-200 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : isAuthenticated ? (
          <button onClick={logout} className="text-sm bg-gray-200 px-3 py-1 rounded">
            Logout
          </button>
        ) : (
          <Link href={ROUTES.LOGIN} className="bg-blue-500 text-white px-3 py-2 rounded text-sm">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
