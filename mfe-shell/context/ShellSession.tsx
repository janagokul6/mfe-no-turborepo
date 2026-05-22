'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getToken,
  clearToken,
  isAuthenticated,
  getStoredUser,
  setStoredUser,
  EVENTS,
} from '@org/contracts';
import { useRouter } from 'next/navigation';

type Ctx = {
  user: any;
  isAuthenticated: boolean;
  login: (user: any) => void;
  logout: () => void;
  navigate: (path: string) => void;
};

const ShellSessionContext = createContext<Ctx | null>(null);

export function ShellSessionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [auth, setAuth] = useState(false);

  const refresh = () => {
    const loggedIn = isAuthenticated();
    setAuth(loggedIn);
    if (loggedIn) {
      setUser(getStoredUser());
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener(EVENTS.AUTH_CHANGED, handler);
    return () => window.removeEventListener(EVENTS.AUTH_CHANGED, handler);
  }, []);

  const login = (u: any) => {
    setStoredUser(u);
    setUser(u);
    setAuth(true);
  };

  const logout = () => {
    clearToken();
    setUser(null);
    setAuth(false);
    router.push('/products');
  };

  const navigate = (path: string) => router.push(path);

  return (
    <ShellSessionContext.Provider value={{ user, isAuthenticated: auth, login, logout, navigate }}>
      {children}
    </ShellSessionContext.Provider>
  );
}

export function useShell() {
  const ctx = useContext(ShellSessionContext);
  if (!ctx) throw new Error('no shell ctx');
  return ctx;
}
