import { create } from "zustand";

const useCursorStore = create((set) => ({
  cursorFunds: null,
  cursorSortId: null,
  cursorId: null,
  setCursorFunds: (cursorFunds) => {
    set({ cursorFunds });
  },
  setCursorSortId: (cursorSortId) => {
    set({ cursorSortId });
  },
  setCursorId: (cursorId) => {
    set({ cursorId });
  },
}));

export default useCursorStore;
