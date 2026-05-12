import { CartItem } from '../types';

export type Order = {
  id: string;
  createdAt: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
  paymentMethod: string;
};

const KEY = 'reactfood_orders_v1';

export const loadOrders = (): Order[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
};

export const saveOrder = (order: Order) => {
  try {
    const all = loadOrders();
    all.unshift(order);
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch (e) {
    console.error('saveOrder error', e);
  }
};
