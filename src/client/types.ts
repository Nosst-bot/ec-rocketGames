import type { ReactNode } from "react";

export type Game = {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
    category?: string;
    platforms?: string[];
    price: number;
    stock: number;
}

export type AdminRouteProps = {
    children: ReactNode;
}

export type AuthContextType = {
    token: string | null;
    role: string | null;
    login: (jwt: string, r: string) => void;
    logout: () => void;
    isLogged: boolean;
}

export type AuthProviderProps = {
    children: ReactNode;
}

export type CartItem = {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

export type CartContextType = {
  items: CartItem[];
  addToCart: (game: Game) => void;
  addQuantity: (itemId: number) => void;
  subtractQuantity: (itemId: number) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getTotals: () => { subTotal: number; iva: number; total: number };
}

export type User = {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt?: string;
}
