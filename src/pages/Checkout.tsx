import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { saveOrder } from '../utils/orders';
import { v4 as uuidv4 } from 'uuid';

export const Checkout: React.FC = () => {
  const { items, clear } = useCart();
  const navigate = useNavigate();

  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!items || items.length === 0) {
    return (
      <main className="container">
        <h2>Checkout</h2>
        <div>Your cart is empty. <Link to="/">Back to catalog</Link></div>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !address) {
      setError('Please fill name, email and address.');
      return;
    }

    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 12) {
      setError('Please enter a valid card number (mock).');
      return;
    }

    setLoading(true);

    await new Promise((r) => setTimeout(r, 900));

    const order = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      items,
      total,
      customer: { name, email, phone, address },
      paymentMethod: 'card'
    };

    try {
      saveOrder(order);
      clear();
      navigate(`/order/${order.id}`, { state: { order } });
    } catch (e) {
      console.error(e);
      setError('Failed to place order. Try again.');
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <h2>Checkout</h2>

      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        <form onSubmit={handleSubmit} style={{ flex: 1, maxWidth: 520 }}>
          <fieldset style={{ border: 'none', padding: 0 }}>
            <label>Full name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />

            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Phone (optional)</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />

            <label>Shipping address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} />

            <hr />

            <h4>Card (mock)</h4>
            <label>Card number</label>
            <input placeholder="4242 4242 4242 4242" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <label>Expiry</label>
                <input placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} />
              </div>
              <div style={{ width: 120 }}>
                <label>CVC</label>
                <input placeholder="123" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} />
              </div>
            </div>

            {error && <div style={{ color: 'crimson', marginTop: 8 }}>{error}</div>}

            <div style={{ marginTop: 12 }}>
              <button className="btn primary" type="submit" disabled={loading}>
                {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
              </button>
            </div>
          </fieldset>
        </form>

        <aside style={{ width: 360 }}>
          <div className="card">
            <h4>Order summary</h4>
            <div>
              {items.map((it) => (
                <div key={it.product.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                  <div>{it.product.title} × {it.quantity}</div>
                  <div>${(it.product.price * it.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
              <div>Total</div>
              <div>${total.toFixed(2)}</div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};
