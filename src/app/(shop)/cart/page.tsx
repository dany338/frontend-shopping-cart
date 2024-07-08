export const revalidate = 0;

import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "Cart page",
};

export default function CartPage() {
  return (
    <div>
      <h1 className="text-5xl">Productos en el carrito</h1>
      <hr className="mb-2" />

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <ProductsInCart />
        <OrderSummary />
      </div>
    </div>
  );
}
