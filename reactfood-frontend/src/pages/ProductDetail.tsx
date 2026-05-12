import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SAMPLE_PRODUCTS } from '../data';
import { useCart } from '../contexts/CartContext';

export const ProductDetail = () => {
  const { id } = useParams();
  const product = SAMPLE_PRODUCTS.find(p => p.id === id);
  const { addItem } = useCart();
  if (!product) return <div className="container">Product not found. <Link to="/">Back</Link></div>;

  return (
    <main className="container">
      <div className="detail">
        <div className="detail-left">
          <div className="picture-placeholder">{product.title}</div>
        </div>
        <div className="detail-right">
          <h2>{product.title}</h2>
          <p className="muted">{product.description}</p>
          <div><strong>Ingredients:</strong> {product.ingredients?.join(', ')}</div>
          <div><strong>Calories:</strong> {product.nutrition?.calories} kcal</div>
          <div className="price-big">${product.price.toFixed(2)}</div>
          <div style={{marginTop:12}}>
            <button className="btn primary" onClick={() => addItem(product)}>Add to cart</button>
            <Link to="/" style={{marginLeft:8}}>Back</Link>
          </div>
        </div>
      </div>
    </main>
  );
};
