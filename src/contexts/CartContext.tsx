import React from 'react';
import type { ProductProps } from '../pages/home';

/**
 * Tipagem dos dados que o contexto vai expor
 * cart → lista de produtos no carrinho
 * cartAmount → quantidade total de itens
 */
interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
  addItemCart: (newItem: ProductProps) => void;
}

/**
 * Tipagem de cada produto do carrinho
 * Define o formato obrigatório de um item
 */
interface CartProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
  amount: number;
  total: number;
}

/**
 * Tipagem das props do Provider
 * children representa tudo que será envolvido pelo CartProvider
 */
interface CartProviderProps {
  children: React.ReactNode;
}

/**
 * Criação do contexto
 * O "as CartContextData" força a tipagem inicial
 */
export const CartContext = React.createContext({} as CartContextData);

/**
 * Componente Provider do carrinho
 * Ele controla o estado e fornece os dados para a aplicação
 */
function CartProvider({ children }: CartProviderProps) {
  /**
   * Estado do carrinho
   * Inicialmente é um array vazio
   */
  const [cart, setCart] = React.useState<CartProps[]>([]);

  function addItemCart(newItem: ProductProps) {
    // adiciona no carrinho

    // e vejo se ja nao existe no carrinho
    const indexItem = cart.findIndex((item) => item.id === newItem.id);

    if (indexItem !== -1) {
      // se chegou aqui, somamos +1 na quantidade e calculamos o total desse carrinho
      let cartList = cart;

      cartList[indexItem].amount = cartList[indexItem].amount + 1;
      cartList[indexItem].total =
        cartList[indexItem].amount * cartList[indexItem].price;

      setCart(cartList);
      return;
    }

    // adicionar o item na nossa lista
    let data = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    };
    setCart((products) => [...products, data]);
  }

  return (
    /**
     * Provider disponibiliza os valores do contexto
     * cart → estado atual do carrinho
     * cartAmount → quantidade de itens no carrinho
     */
    <CartContext.Provider
      value={{ cart, cartAmount: cart.length, addItemCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * Exportação do Provider
 * Permite envolver a aplicação com o contexto
 */
export default CartProvider;
