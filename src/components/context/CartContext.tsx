import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartContextType, CartItem, Game } from '../../client/types';

export const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'cart';

function readStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch (e) {
    console.error('Failed to read cart from storage', e);
    return [];
  }
}

function writeStorage(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to write cart to storage', e);
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStorage());

  useEffect(() => {
    writeStorage(items);
  }, [items]);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) {
        setItems(readStorage());
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const addToCart = useCallback((game: Game) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === Number(game.id));
      if (existing) {
        return prev.map(i => i.id === existing.id ? { ...i, cantidad: i.cantidad + 1 } : i);
      }
      const newItem: CartItem = {
        id: Number(game.id),
        nombre: String(game.title),
        precio: Number((game as any).price ?? (game as any).precio ?? 0),
        imagen: String((game as any).imageUrl ?? (game as any).imagen ?? ''),
        cantidad: 1,
      };
      return [...prev, newItem];
    });
  }, []);

  const addQuantity = useCallback((itemId: number) => {
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, cantidad: i.cantidad + 1 } : i));
  }, []);

  const subtractQuantity = useCallback((itemId: number) => {
    setItems(prev => prev.map(i => i.id === itemId && i.cantidad > 1 ? { ...i, cantidad: i.cantidad - 1 } : i));
  }, []);

  const removeFromCart = useCallback((itemId: number) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const getCartCount = useCallback(() => items.reduce((t, it) => t + it.cantidad, 0), [items]);

  const getTotals = useCallback(() => {
    const subTotal = items.reduce((s, it) => s + it.precio * it.cantidad, 0);
    const iva = Math.round(subTotal * 0.19);
    const total = subTotal + iva;
    return { subTotal, iva, total };
  }, [items]);

  const value = useMemo(() => ({ items, addToCart, addQuantity, subtractQuantity, removeFromCart, clearCart, getCartCount, getTotals }), [items, addToCart, addQuantity, subtractQuantity, removeFromCart, clearCart, getCartCount, getTotals]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
