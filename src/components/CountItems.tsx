"use client";

import { useCallback, useEffect, useState } from "react";
import { useCartStore } from "@/store/cart/cart-store";
import Link from "next/link";
import { CiShoppingBasket } from "react-icons/ci";

export const CountItems = () => {
  const [loaded, setLoaded] = useState(false);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const listCartFromDB = useCartStore( state => state.listCartFromDB );

  const fetchProductsInCart = useCallback(async () => {
    try {
      await listCartFromDB();
    } catch (error) {
      console.error('Error fetching products in cart:', error);
    }
  }, []);

  useEffect(() => {
    fetchProductsInCart();
  }, []);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Link
      href={
        ( (totalItemsInCart === 0 ) && loaded )
          ? '/empty'
          : "/cart"
      }
      className="p-2 flex items-center justify-center h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
    >
      {totalItemsInCart > 0 && (
        <span className="text-sm mr-2 text-blue-800 font-bold">
          {totalItemsInCart}
        </span>
      )}

      <CiShoppingBasket size={25} />
    </Link>
  );
};