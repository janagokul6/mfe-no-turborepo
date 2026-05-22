import '@org/ui/dist/style.css';
import { useQuery } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchProducts, addToCart } from '@org/api-client';
import { ProductCard, PageTitle, Spinner } from '@org/ui';
import { EVENTS, getToken } from '@org/contracts';
import { useState } from 'react';

const queryClient = new QueryClient();

export type ShellProps = {
  isAuthenticated?: boolean;
  user?: any;
  onLoginRequired?: () => void;
  navigate?: (path: string) => void;
};

function ProductPageInner(props: ShellProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  const [msg, setMsg] = useState('');

  const handleAdd = (product: any) => {
    if (!props.isAuthenticated && !getToken()) {
      props.onLoginRequired?.();
      return;
    }
    const token = getToken() || '';
    const userId = token.replace('user-', '') || 'guest';
    addToCart(userId, product);
    window.dispatchEvent(new CustomEvent(EVENTS.CART_UPDATED));
    setMsg('added!!');
    setTimeout(() => setMsg(''), 2000);
  };

  if (isLoading) return <div className="p-6"><Spinner /><p>loading products...</p></div>;

  const items = data || [];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <PageTitle>Products</PageTitle>
      {msg && <p className="text-green-600 mb-2">{msg}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((p: any, idx: number) => (
          <ProductCard key={p.id || idx} product={p} onAdd={() => handleAdd(p)} />
        ))}
      </div>
    </div>
  );
}

export default function ProductPage(props: ShellProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductPageInner {...props} />
    </QueryClientProvider>
  );
}
