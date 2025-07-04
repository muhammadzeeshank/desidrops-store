import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./sanity.types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  deleteCartProduct: (productId: string) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => CartItem[];

  buyNowItem: CartItem | null; 
  setBuyNowItem: (product: Product) => void;
  clearBuyNowItem: () => void;
  getBuyNowTotalPrice: () => number;
  getBuyNowSubTotalPrice: () => number;
  getBuyNowItem: () => CartItem | null;

}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );
          if (existingItem) {
            existingItem.quantity++;
            return { items: state.items };
          } else {
            return { items: [...state.items, { product, quantity: 1 }] };
          }
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as CartItem[]),
        })),
      deleteCartProduct: (productId) =>
        set((state) => ({
          items: state.items.filter(
            ({ product }) => product?._id !== productId
          ),
        })),
      resetCart: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        );
      },
      getSubTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discount = ((item.product.discount ?? 0) * price) / 100;
          const discountedPrice = price + discount;
          return total + discountedPrice * item.quantity;
        }, 0);
      },
      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },
      getGroupedItems: () => get().items,
      buyNowItem: null,
      setBuyNowItem: (product: Product) =>
        set(() => ({ buyNowItem: { product, quantity: 1 } })),
      clearBuyNowItem: () => set(() => ({ buyNowItem: null })),
      getBuyNowTotalPrice: () => {
        const item = get().buyNowItem;
        if (!item) return 0;
        const price = item.product.price ?? 0;
        return price * item.quantity;
      },
      getBuyNowSubTotalPrice: () => {
        const item = get().buyNowItem;
        if (!item) return 0;
        const price = item.product.price ?? 0;
        const discount = ((item.product.discount ?? 0) * price) / 100;
        const discountedPrice = price + discount;
        return discountedPrice * item.quantity;
      },
      getBuyNowItem: () => get().buyNowItem
    }),
    {
      name: "cart-store",
      partialize: (state) => ({
        items: state.items,
        // don't persist buyNowItem or its functions
      }),
    }
  )
);
export default useCartStore;
