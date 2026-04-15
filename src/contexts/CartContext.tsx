import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '@/types';
import { cartService } from '@/services/cart.service';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface CartItem {
  product: Product;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  total: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQty: () => {},
  clearCart: () => {},
  cartCount: 0,
  total: 0,
  isLoading: true,
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from Supabase on mount or login
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated && user?.id) {
        setIsLoading(true);
        try {
          const data = await cartService.getCartItems(user.id);
          const formattedItems = data.map(item => ({
            product: item.product!,
            qty: item.quantity
          }));
          setItems(formattedItems);
        } catch (error) {
          console.error('Error loading cart:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setItems([]);
        setIsLoading(false);
      }
    };
    loadCart();
  }, [user, isAuthenticated]);

  const addToCart = async (product: Product) => {
    if (!isAuthenticated || !user?.id) {
      toast.error('Please login to add items to cart');
      return;
    }

    const existing = items.find((i) => i.product.id === product.id);
    const newQty = existing ? existing.qty + 1 : 1;

    // Optimistic update
    setItems((prev) => {
      if (existing) {
        return prev.map((i) => (i.product.id === product.id ? { ...i, qty: newQty } : i));
      }
      return [...prev, { product, qty: 1 }];
    });

    try {
      await cartService.addToCart(user.id, product.id, newQty);
      toast.success(`${product.title} added to cart`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to update cart');
      // Rollback could go here
    }
  };

  const removeFromCart = async (id: string) => {
    if (!user?.id) return;

    setItems((prev) => prev.filter((i) => i.product.id !== id));
    try {
      await cartService.removeFromCart(user.id, id);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQty = async (id: string, delta: number) => {
    if (!user?.id) return;

    const item = items.find(i => i.product.id === id);
    if (!item) return;

    const newQty = Math.max(1, item.qty + delta);
    setItems((prev) => prev.map((i) => (i.product.id === id ? { ...i, qty: newQty } : i)));

    try {
      await cartService.updateQuantity(user.id, id, newQty);
    } catch (error) {
      console.error('Error updating qty:', error);
    }
  };

  const clearCart = async () => {
    if (!user?.id) return;
    setItems([]);
    try {
      await cartService.clearCart(user.id);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + (i.product.price * i.qty), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, cartCount, total, isLoading }}>
      {children}
    </CartContext.Provider>
  );
};
