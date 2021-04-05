import { CartProduct } from '../types';

export const { format: formatPrice } = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
});

export const getCartProductIndexById = function(id: number, products: CartProduct[]) {
  return products.findIndex((product, index) => product.id === id );
}
