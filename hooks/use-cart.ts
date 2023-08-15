import { toast } from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Product } from "@/types";

interface CartStore {
    items: Product[];
    addItem: (data: Product) => void;
    removeItem: (id: string) => void;
    removeAll: () => void;
};

const useCart = create(
    persist<CartStore>((set,get) => ({
        items: [],
        addItem: (data: Product) => {
            const currentItem = get().items;
            const exitstingItem = currentItem.find((item: Product) => item.id === data.id);

            if(exitstingItem) {
                return toast("Item already in cart.");
            };

            set({items: [...get().items,data]});
            toast.success("Item added to cart.");
        },
        removeItem: (id: string) => {
            set({items: [...get().items.filter((item: Product) => item.id !== id)]});
            toast.success("Item removed from cart.");
        },
        removeAll: () => {
            set({items: []});
            toast.success("Items removed from cart");
        }
    }), {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage)
    })
);

export default useCart;