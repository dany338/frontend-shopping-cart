"use client";
import { WidgetItem } from "@/components";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils/currencyFormat";

export const OrderSummary = () => {
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  return (
    <div className="flex flex-col w-full sm:w-4/12">
      <WidgetItem title="Total a pagar">
        <div className="mt-2 flex justify-center gap-4">
          <h3 className="text-3xl font-bold text-gray-700">
            {currencyFormat(total)}
          </h3>
        </div>
        <span className="font-bold text-center text-gray-500">
          Impuestos 19%: {currencyFormat(tax)}
        </span>
      </WidgetItem>
    </div>
  );
};
