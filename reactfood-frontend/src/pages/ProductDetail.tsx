import React, { useState, useEffect } from 'react'; // 1. Додали useState та useEffect
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types'; // Переконайся, що імпорт типу правильний

export const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const BASE_URL = window.location.hostname === 'localhost'
      ? 'http://localhost:3000'
      : 'https://reactfood-api.onrender.com';
      
    fetch(`${BASE_URL}/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <div className="container">Loading product details...</div>;
  
  if (!product) return (
    <div className="container">
      Product not found. <Link to="/">Back to catalog</Link>
    </div>
  );

  return (
    <main className="container">
      <div className="detail">
        <div className="detail-left">
          <div className="picture-placeholder">{product.title}</div>
        </div>
        <div className="detail-right">
          <h2>{product.title}</h2>
          <p className="muted">{product.description}</p>
          {product.ingredients && (
            <div><strong>Ingredients:</strong> {product.ingredients.join(', ')}</div>
          )}
          {product.nutrition && (
            <div><strong>Calories:</strong> {product.nutrition.calories} kcal</div>
          )}
          <div className="price-big">${product.price.toFixed(2)}</div>
          <div style={{ marginTop: 12 }}>
            <button className="btn primary" onClick={() => addItem(product)}>
              Add to cart
            </button>
            <Link to="/" style={{ marginLeft: 8 }}>Back</Link>
          </div>
        </div>
      </div>
    </main>
  );
};