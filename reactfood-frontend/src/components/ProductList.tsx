import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

export const ProductList = () => {
  const { addItem } = useCart();
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => console.error('Помилка завантаження:', err));
  }, []);

  const filtered = products.filter((p) => 
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  if (isLoading) return <div className="container">Завантаження меню...</div>;

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