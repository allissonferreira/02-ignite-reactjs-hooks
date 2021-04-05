import { ProductFormatted } from '../types';

export const { format: formatPrice } = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
});

export const getProductIndexById = function(id: number, products: ProductFormatted[]) {
  return products.findIndex((product, index) => product.id === id );
}
