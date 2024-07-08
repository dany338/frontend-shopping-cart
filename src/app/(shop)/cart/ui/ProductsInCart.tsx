"use client";

import { useCallback, useEffect } from "react";
import { ItemCard } from "@/shopping-cart";
import { useCartStore } from "@/store/cart/cart-store";

export const ProductsInCart = () => {
  const productsInCart = useCartStore( state => state.cart );

  return (
    <div className="flex flex-col gap-2 w-full sm:w-8/12">
      {productsInCart.map(({ product, quantity }: any) => (
        <ItemCard key={product.id} product={product} quantity={quantity} />
      ))}
    </div>
)
};