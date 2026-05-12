import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export const Header = () => {
  const { totalCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="site-header">
      <div className="container">
        <div className="brand">
          <Link to="/">ReactFood</Link>
          <div className="tag">Delicious food, delivered</div>
        </div>

        <nav className="nav">
          <Link to="/">Catalog</Link>
          <Link to="/cart">Cart ({totalCount()})</Link>
          {user ? (
            <>
              <span className="user">Hi, <strong>{user.name ?? user.email}</strong></span>
              <button className="btn small" onClick={logout}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn small">Sign in</Link>
              <Link to="/register" className="btn small primary">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
