import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Cart } from "@/interfaces/cart";
import { Product } from "@/interfaces/product";
import {
  addProductToCart,
  removeProductFromCart,
  agregarUnProductoAlCarrito,
  eliminarUnProductoDelCarrito,
  listarCarrito,
  modificarLaCantidadDeUnProductoEnElCarrito,
} from "@/shopping-cart/actions/actions";
import { revalidatePath } from "next/cache";

interface State {
  cart: Cart[];
  loading: boolean;

  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };

  addProductTocart: (cartProduct: Cart) => void;
  updateProductQuantity: (cartProduct: Cart) => void;
  removeProduct: (productId: number) => void;
  listCartFromDB: () => void;
  isProductInCart: (productId: number) => boolean;

  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      loading: false,
      // Methods
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce(
          (subTotal, current) => current.quantity * current.product.price + subTotal,
          0
        );
        const tax = subTotal * 0.19;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },

      addProductTocart: async (cartProduct: Cart) => {
        set({ loading: true });
        await agregarUnProductoAlCarrito(cartProduct.product.id, cartProduct.quantity);
        set({ loading: false });
        const { cart } = get();

        const productInCart = cart.some(
          (item) => item.product.id === cartProduct.product.id);

        if (!productInCart) {
          set({ cart: [...cart, cartProduct] });
          return;
        }

        const updatedCartProducts = cart.map((item) => {
          if (item.product.id === cartProduct.product.id) {
            return { ...item, quantity: item.quantity + cartProduct.quantity };
          }

          return item;
        });

        set({ cart: updatedCartProducts });
      },

      updateProductQuantity: async (cartProduct: Cart) => {
        set({ loading: true });
        await modificarLaCantidadDeUnProductoEnElCarrito(cartProduct.product.id, cartProduct.quantity);
        set({ loading: false });
        const { cart } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.product.id === cartProduct.product.id) {
            return cartProduct;
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },

      removeProduct: async (productId: number) => {
        set({ loading: true });
        await eliminarUnProductoDelCarrito(productId);
        set({ loading: false });
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          (item) => item.product.id !== productId
        );
        set({ cart: updatedCartProducts });
      },

      listCartFromDB: async () => {
        const data = await listarCarrito();
        set({ cart: data });
      },

      // adicioname un metodo para verificar si el producto ya esta en el carrito de compras:
      isProductInCart: (productId: number) => {
        const { cart } = get();
        return cart.some((item) => item.product.id === productId);
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),

    {
      name: "shopping-cart",
    }
  )
);