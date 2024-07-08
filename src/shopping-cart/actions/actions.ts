// 'use client'
/*
cookie: cart
{
  'uui-123-1': 4,
  'uui-123-2': 1,
  'uui-123-3': 2,
}
*/
import { getCookie, hasCookie, setCookie } from "cookies-next";
import axios from 'axios';
import { revalidatePath } from "next/cache";

export const getCookieCart = (): { [id: string]: number } => {
  if (hasCookie("cart")) {
    const cookieCart = JSON.parse((getCookie("cart") as string) ?? "{}");
    return cookieCart;
  }

  return {};
};

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (cookieCart[id]) {
    cookieCart[id] = cookieCart[id] + 1;
  } else {
    cookieCart[id] = 1;
  }

  setCookie("cart", JSON.stringify(cookieCart));
};

export const removeProductFromCart = (id: string) => {
  const cookieCart = getCookieCart();
  delete cookieCart[id];
  setCookie("cart", JSON.stringify(cookieCart));
};

export const removeSingleItemFromCart = (id: string) => {
  const cookieCart = getCookieCart();
  if (!cookieCart[id]) return;

  const itemsInCart = cookieCart[id] - 1;

  if (itemsInCart <= 0) {
    delete cookieCart[id];
  } else {
    cookieCart[id] = itemsInCart;
  }

  setCookie("cart", JSON.stringify(cookieCart));
};

export const listarCarrito = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/carts', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = response.data;

    return result;
  } catch (error) {
    console.error('Error obteniendo todos los carritos:', error);
    throw new Error('Error obteniendo todos los carritos. Por favor intente de nuevo.');
  }
};

export const agregarUnProductoAlCarrito = async (productId: number, quantity: number) => {
  try {
    const response = await axios.post('http://localhost:3001/api/cart', {
      productId,
      quantity
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = response.data;

    return result;
  } catch (error) {
    console.error('Error agregando un producto al carrito:', error);
    throw new Error('Error agregando un producto al carrito. Por favor intente de nuevo.');
  }
};

export const modificarLaCantidadDeUnProductoEnElCarrito = async (productId: number, quantity: number) => {
  try {
    const response = await axios.put(`http://localhost:3001/api/cart/${productId}`, {
      quantity
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = response.data;

    return result;
  } catch (error) {
    console.error('Error modificando la cantidad de un producto al carrito:', error);
    throw new Error('Error modificando la cantidad de un producto al carrito. Por favor intente de nuevo.');
  }
};

export const eliminarUnProductoDelCarrito = async (productId: number) => {
  try {
    const response = await axios.delete(`http://localhost:3001/api/cart/${productId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = response.data;

    return result;
  } catch (error) {
    console.error('Error eliminando un producto del carrito:', error);
    throw new Error('Error eliminando un producto del carrito. Por favor intente de nuevo.');
  }
};