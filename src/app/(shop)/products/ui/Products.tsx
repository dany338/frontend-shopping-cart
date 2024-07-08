"use client";

import { useCallback, useEffect, useState } from "react";
import { Product } from "@/interfaces/product";
import { listarProductos } from "@/products/actions/actions";
import { ProductCard } from "@/products";

export const Products = () => {
  const [products, setProducts] = useState<Product[] | []>([]);

  const fetchProducts = useCallback(async () => {
    try {
      const data = await listarProductos();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {products.map((product: any) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
};