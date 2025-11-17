import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { CartView } from './components/CartView';
import { ProductDetail } from './pages/ProductDetail';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';

const App = () => (
  <AuthProvider>
    <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<ProtectedRoute><CartView /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/order/:id" element={<OrderConfirmation />} />
      </Routes>
    </CartProvider>
  </AuthProvider>
);

export default App;
