"use client";

import Image from "next/image";
import type { Product } from "@/products/data/products";

import { IoAddCircleOutline, IoRemove, IoTrashOutline } from "react-icons/io5";
import { addProductToCart, removeSingleItemFromCart, modificarLaCantidadDeUnProductoEnElCarrito, eliminarUnProductoDelCarrito } from "../actions/actions";

import { useRouter } from "next/navigation";
import { Cart } from "@/interfaces/cart";
import { useCartStore } from "@/store/cart/cart-store";

export const ItemCard = ({ product, quantity }: Cart) => {
  const updateProductQuantity = useCartStore( state => state.updateProductQuantity );
  const removeProduct = useCartStore( state => state.removeProduct );
  const router = useRouter();

  function onAddQuantityToCart() {
    const cartProduct = {
      quantity: quantity + 1,
      product,
    };
    updateProductQuantity(cartProduct);
    router.refresh();
  }

  function onDeleteQuantityToCart() {
    if ((quantity - 1 ) === 0) {
      onRemoveItemToCart();
    } else {
      const cartProduct = {
        quantity: quantity > 0 ? quantity - 1 : 0,
        product,
      };
      updateProductQuantity(cartProduct);
    }
    router.refresh();
  }

  function onRemoveItemToCart() {
    removeProduct(product.id);
    router.refresh();
  }

  return (
    <div className="flex items-center shadow rounded-lg w-full bg-gray-800 border-gray-100">
      {/* Product Image */}
      <div className="p-2">
        <Image
          width={200}
          height={200}
          className="rounded"
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* Title */}
      <div className="px-5 pb-5 w-full flex flex-col mt-2">
        <a href="#">
          <h3 className="font-semibold text-xl tracking-tight text-white">
            {product.name} -{" "}
            <small className="text-sm">${product.price.toFixed(2)}</small>
          </h3>
        </a>

        {/* Price and Add to Cart */}
        <div className="flex flex-col items-start justify-between">
          <span className="text-white dark:text-white">
            Cantidad: {quantity}
          </span>
          <span className="font-bold text-white">
            Total: ${(product.price * quantity).toFixed(2)}
          </span>
          <button
            onClick={onRemoveItemToCart}
            className="flex justify-center items-center gap-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Borrar del carrito <IoTrashOutline size={25} />
          </button>
        </div>
      </div>

      <div className="flex p-5 items-center justify-center">
        <button
          onClick={onAddQuantityToCart}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <IoAddCircleOutline size={25} />
        </button>
        <span className="text-2xl text-white mx-10">{quantity}</span>
        <button
          onClick={onDeleteQuantityToCart}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          <IoRemove size={25} />
        </button>
      </div>
    </div>
  );
};
