import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { CartProduct, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: CartProduct[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
  getCartProductIndexById: (productId: number) => number;
  increaseProductAmount: (productId: number) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<CartProduct[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    localStorage.setItem('@RocketShoes:cart', '[]');

    return [];
  });

  const getCartProductIndexById = function(id: number) {
    return cart.findIndex((product, index) => product.id === id );
  }

  const addProduct = async (productId: number) => {
    try {
      const index = getCartProductIndexById(productId);
      const response = await api.get('/products/' + productId);

      if (index >= 0) {
        increaseProductAmount(index);
        return;
      }

      const product = response.data;
      product.amount = 1;

      const updated_cart = [
        ...cart,
        product,
      ];

      setCart(updated_cart);

      localStorage.setItem('@RocketShoes:cart', JSON.stringify(updated_cart));
    } catch {
      // TODO
    }
  };

  const removeProduct = (productId: number) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  const increaseProductAmount = function(id: number) {
    const index = getCartProductIndexById(id);

    if (index === -1) {
      return;
    }

    const updated_cart = cart;
    updated_cart[index].amount = updated_cart[index].amount + 1;

    setCart([...updated_cart]);

    localStorage.setItem('@RocketShoes:cart', JSON.stringify(cart));
  }

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount, getCartProductIndexById, increaseProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
