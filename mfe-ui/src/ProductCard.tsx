import React from 'react';
import { Button } from './Button';

export function ProductCard({ product, onAdd }: { product: any; onAdd?: () => void }) {
  const img = product.image || product.thumbnail || product.images?.[0];
  const title = product.title || product.name || 'item';
  const price = product.price ?? product.price?.current ?? '???';

  return (
    <div className="border rounded shadow p-3 bg-white flex flex-col">
      {img && (
        <img src={img} alt={title} className="w-full h-48 object-cover rounded mb-2" />
      )}
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-lg font-bold text-green-700 mb-3">${price}</p>
      <Button onClick={onAdd}>Add to cart</Button>
    </div>
  );
}
