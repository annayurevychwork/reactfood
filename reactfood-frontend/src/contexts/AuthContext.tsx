import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

type AuthCtx = {
  user: User | null;
  login: (email: string, password?: string) => Promise<void>;
  register: (name: string, email: string, password?: string) => Promise<void>;
  logout: () => void;
};

const KEY = 'reactfood_auth_v1';
const AuthContext = createContext<AuthCtx | undefined>(undefined);

const fakeApi = (payload: any) =>
  new Promise<User>((res) => {
    setTimeout(() => res({ id: 'u1', email: payload.email, name: payload.name ?? payload.email.split('@')[0], token: 'fake-token' }), 300);
  });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem(KEY, JSON.stringify(user));
      else localStorage.removeItem(KEY);
    } catch {}
  }, [user]);

  const login = async (email: string, password?: string) => {
    try {
      const storedRaw = localStorage.getItem(KEY);
      if (storedRaw) {
        const stored = JSON.parse(storedRaw) as User;
        if (stored.email === email && stored.name) {
          setUser(stored);
          return;
        }
      }
    } catch {}
    const u = await fakeApi({ email });
    setUser(u);
  };

  const register = async (name: string, email: string, password?: string) => {
    const u = await fakeApi({ name, email });
    setUser(u);
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
