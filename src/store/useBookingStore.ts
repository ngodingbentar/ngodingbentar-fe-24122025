import { create } from 'zustand';
import { addDays } from "@/app/utils";

interface BookingState {
  pickupDate: string;
  returnDate: string;
  pickupLoc: string;
  returnLoc: string;

  setPickupDate: (date: string) => void;
  setReturnDate: (date: string) => void;
  setPickupLoc: (loc: string) => void;
  setReturnLoc: (loc: string) => void;
  setDuration: (duration: number) => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  pickupDate: "2025-12-21T09:00",
  returnDate: "2025-12-28T09:00",
  pickupLoc: "Jakarta",
  returnLoc: "Jakarta",

  setPickupDate: (date: string) => set({ pickupDate: date }),
  setReturnDate: (date: string) => set({ returnDate: date }),
  setPickupLoc: (loc: string) => set({ pickupLoc: loc }),
  setReturnLoc: (loc: string) => set({ returnLoc: loc }),
  setDuration: (duration: number) => {
    const { pickupDate } = get();
    if (duration < 0) return;
    const newReturnDate = addDays(pickupDate, duration);
    console.log(newReturnDate);
    set({ returnDate: newReturnDate });
  },
}));
