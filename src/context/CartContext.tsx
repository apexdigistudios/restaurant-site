import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type PizzaSize = 'small' | 'medium' | 'large' | 'family';

export interface CartExtra {
  name: string;
  price: number;
}

export interface CartItem {
  id: string; // unique instance id
  menuId: string;
  name: string;
  image: string;
  description: string;
  basePrice: number;
  size?: PizzaSize;
  sizeLabel?: string;
  extras: CartExtra[];
  quantity: number;
  unitPrice: number; // basePrice + extras total
}

export const PIZZA_EXTRAS = [
  { name: 'Extra Cheese', price: 5, icon: '🧀' },
  { name: 'Extra Chicken', price: 10, icon: '🍗' },
  { name: 'Extra Beef', price: 10, icon: '🥩' },
  { name: 'Extra Sausage', price: 8, icon: '🌭' },
  { name: 'Extra Vegetables', price: 5, icon: '🥦' },
];

export const DELIVERY_FEE = 15;
export const FREE_DELIVERY_THRESHOLD = 150;

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id' | 'unitPrice'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'daddys-pizza-cart';

function generateItemId(menuId: string, size?: PizzaSize, extras: CartExtra[] = []): string {
  const extrasKey = extras.map(e => e.name).sort().join(',');
  return `${menuId}-${size || 'default'}-${extrasKey}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist cart to localStorage
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  const addItem = (item: Omit<CartItem, 'id' | 'unitPrice'>) => {
    const id = generateItemId(item.menuId, item.size, item.extras);
    const unitPrice = item.basePrice + item.extras.reduce((sum, e) => sum + e.price, 0);

    setItems(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) {
        return prev.map(i =>
          i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, { ...item, id, unitPrice }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const clearCart = () => setItems([]);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      itemCount, subtotal, deliveryFee, total,
      isCartOpen, openCart, closeCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
