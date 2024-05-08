import { create } from "zustand";

const useNotificationStore = create((set, get) => ({
  showNotification: false,
  nTitle: "",
  nMessage: "",
  nError: false,
  setShowNotification: (showNotification) => {
    set({ showNotification });
  },
  setNTitle: (nTitle) => {
    set({ nTitle });
  },
  setNMessage: (nMessage) => {
    set({ nMessage });
  },
  setNError: (nError) => {
    set({ nError });
  },
}));

export default useNotificationStore;
