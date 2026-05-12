import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Order } from '../utils/orders';

export const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const order = (location.state as { order?: Order } )?.order;

  if (!order) {
    return (
      <main className="container">
        <h2>Order</h2>
        <div>Order not found. <Link to="/">Back to catalog</Link></div>
      </main>
    );
  }

  return (
    <main className="container">
      <h2>Order Confirmation</h2>
      <div className="card">
        <div><strong>Order ID:</strong> {order.id}</div>
        <div><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</div>
        <div><strong>Name:</strong> {order.customer.name}</div>
        <div><strong>Email:</strong> {order.customer.email}</div>

        <hr />

        <h4>Items</h4>
        {order.items.map(it => (
          <div key={it.product.id} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0' }}>
            <div>{it.product.title} × {it.quantity}</div>
            <div>${(it.product.price * it.quantity).toFixed(2)}</div>
          </div>
        ))}

        <div style={{ marginTop: 8, fontWeight: 700 }}>Total: ${order.total.toFixed(2)}</div>

        <div style={{ marginTop: 12 }}>
          <Link to="/">Back to catalog</Link>
        </div>
      </div>
    </main>
  );
};
