export const revalidate = 0;

import { Metadata } from "next";
import { Products } from "./ui/Products";

export const metadata: Metadata = {
  title: "Products",
  description: "Products page",
};

export default function ProductsPage() {
  return (
    <>
      <Products />
    </>
  );
}
