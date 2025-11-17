import React, { useState } from 'react';
import { SAMPLE_PRODUCTS } from '../data';
import { useCart } from '../contexts/CartContext';
import { ProductCard } from './ProductCard';

export const ProductList = () => {
  const { addItem } = useCart();
  const [query, setQuery] = useState('');

  const filtered = SAMPLE_PRODUCTS.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="container">
      <div className="hero">
        <h1>Catalog</h1>
        <input className="search" placeholder="Search products..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <section className="grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={(prod) => addItem(prod)} />
        ))}
      </section>
    </main>
  );
};
