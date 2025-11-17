import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

export const CartView: React.FC = () => {
  const { items, removeItem, clear } = useCart();
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <main className="container">
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <div>
          Empty cart. <Link to="/">Back to catalog</Link>
        </div>
      ) : (
        <div>
          {items.map((i) => (
            <div key={i.product.id} className="cart-row">
              <div>
                {i.product.title} × {i.quantity}
              </div>
              <div>${(i.product.price * i.quantity).toFixed(2)}</div>
              <div>
                <button className="btn" onClick={() => removeItem(i.product.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-total">
            Total: <strong>${total.toFixed(2)}</strong>
          </div>

          <div style={{ marginTop: 10 }}>
            <Link to="/checkout" className="btn primary">
              Go to Checkout
            </Link>

            <button className="btn" style={{ marginLeft: 8 }} onClick={clear}>
              Clear
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
