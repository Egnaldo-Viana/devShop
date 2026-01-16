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
  removeItemCart: (product: CartProps) => void;
  total: string;
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
  const [total, setTotal] = React.useState('');

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
      totalResultCart(cartList);
      return;
    }

    // adicionar o item na nossa lista
    let data = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    };
    setCart((products) => [...products, data]);
    totalResultCart([...cart, data]);
  }

  function removeItemCart(product: CartProps) {
    const indexItem = cart.findIndex((item) => item.id === product.id);

    if (cart[indexItem]?.amount > 1) {
      // diminuir apenas 1 amount do que tem no carrinho
      let cartList = cart;

      cartList[indexItem].amount = cartList[indexItem].amount - 1;
      cartList[indexItem].total =
        cartList[indexItem].total - cartList[indexItem].price;

      setCart(cartList);
      totalResultCart(cartList);
      return;
    }

    const removeItem = cart.filter((item) => item.id !== product.id);
    setCart(removeItem);
    totalResultCart(removeItem);
  }

  function totalResultCart(items: CartProps[]) {
    let myCart = items;
    let result = myCart.reduce((acc, obj) => {
      return acc + obj.total;
    }, 0);
    const resultFormated = result.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    setTotal(resultFormated);
  }

  return (
    /**
     * Provider disponibiliza os valores do contexto
     * cart → estado atual do carrinho
     * cartAmount → quantidade de itens no carrinho
     */
    <CartContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        addItemCart,
        removeItemCart,
        total,
      }}
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
