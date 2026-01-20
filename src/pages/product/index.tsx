import React from 'react';
import { useParams, useNavigate } from 'react-router';
import type { ProductProps } from '../home';
import { api } from '../../services/api';
import { CartContext } from '../../contexts/CartContext';

import toast from 'react-hot-toast';

import { BsCartPlus } from 'react-icons/bs';

export function Product() {
  const { addItemCart } = React.useContext(CartContext);
  const navigate = useNavigate();

  const [product, setProduct] = React.useState<ProductProps>();
  const { id } = useParams();
  React.useEffect(() => {
    async function filterProduct() {
      const response = await api(`/products/${Number(id)}`);
      setProduct(response.data);
    }

    filterProduct();
  }, [id]);

  function addProductCart() {
    toast.success('Produto adicionado no carrinho', {
      style: {
        borderRadius: 10,
        backgroundColor: '#121212',
        color: '#fff',
      },
    });
    if (product !== undefined) {
      addItemCart(product);
      navigate('/cart');
    }
  }

  return (
    <main className="w-full max-w-7xl px-4 mx-auto flex justify-center items-center mt-7 ">
      <img
        className="w-full rounded-lg max-h-70 mb-2"
        src={product?.cover}
        alt={product?.title}
      />
      <section>
        <h1 className="px-4 font-bold mb-5">{product?.title}</h1>
        <p className="px-4 mb-5">{product?.description}</p>
        <div>
          <strong className="px-4 text-zinc-700/90 mt-5">
            {product?.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </strong>

          <button className="bg-zinc-900 p-1 rounded " onClick={addProductCart}>
            {' '}
            <BsCartPlus size={20} color="#fff" />
          </button>
        </div>
      </section>
    </main>
  );
}
