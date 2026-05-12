import React from 'react';
import { Product } from '../types';
import { Link } from 'react-router-dom';

export const ProductCard: React.FC<{ product: Product; onAdd: (p: Product) => void }> = ({ product, onAdd }) => (
  <article className="card">
    <Link to={`/product/${product.id}`} className="card-title">{product.title}</Link>
    <p className="muted">{product.description}</p>
    <div className="card-foot">
      <div className="price">${product.price.toFixed(2)}</div>
      <div>
        <button className="btn" onClick={() => onAdd(product)}>Add</button>
        <Link to={`/product/${product.id}`} className="link">Details</Link>
      </div>
    </div>
  </article>
);
