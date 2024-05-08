import { create } from "zustand";

const useInfoStore = create((set, get) => ({
  showInfo: false,
  title: "",
  infoMessage: "",
  setShowInfo: (showInfo) => {
    set({ showInfo });
  },
  setTitle: (title) => {
    set({ title });
  },
  setInfoMessage: (infoMessage) => {
    set({ infoMessage });
  },
}));

export default useInfoStore;
