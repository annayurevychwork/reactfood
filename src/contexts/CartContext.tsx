import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '../types';
import { useAuth } from './AuthContext';

type CartCtx = {
  items: CartItem[];
  addItem: (product: Product, qty?: number) => void;
  removeItem: (id: string) => void;
  totalCount: () => number;
  clear: () => void;
};

const KEY = 'reactfood_cart_v1';
const CartContext = createContext<CartCtx | undefined>(undefined);

const safeParse = (raw: string | null): CartItem[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray((parsed as any).items)) return (parsed as any).items;
    return [];
  } catch {
    return [];
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>(() => safeParse(localStorage.getItem(KEY)));

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  useEffect(() => {
    if (!user) setItems([]);
  }, [user]);

  const addItem = (product: Product, qty = 1) => {
    setItems((prev) => {
      const current = Array.isArray(prev) ? prev : [];
      const found = current.find((i) => i.product.id === product.id);
      if (found) return current.map((i) => (i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i));
      return [...current, { product, quantity: qty }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => (Array.isArray(prev) ? prev.filter((i) => i.product.id !== id) : []));
  };

  const clear = () => setItems([]);

  const totalCount = () => (Array.isArray(items) ? items.reduce((s, i) => s + (i?.quantity ?? 0), 0) : 0);

  return <CartContext.Provider value={{ items: Array.isArray(items) ? items : [], addItem, removeItem, totalCount, clear }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
