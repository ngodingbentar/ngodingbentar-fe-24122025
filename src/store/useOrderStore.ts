import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Order {
  id: string;
  product: {
    slug: string;
    name: string;
    image: string;
    price: number;
  };
  bookingDetails: {
    pickupDate: string;
    returnDate: string;
    pickupLoc: string;
    returnLoc: string;
    duration: number;
  };
  paymentDetails: {
    total: number;
    subtotal: number;
    discountAmount: number;
    discountPercent: number;
    freeDays: number;
  };
  createdAt: string;
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),
      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: 'order-storage',
    }
  )
);
