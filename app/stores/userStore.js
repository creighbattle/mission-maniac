import { create } from "zustand";

const useUserStore = create((set, get) => ({
  user: null,
  selectedData: null,
  mission: null,
  data: [],
  cursor: null,
  signUpOutput: null,
  email: "",
  username: "",
  loading: true,
  error: null,
  setUser: (user) => {
    set({ user });
  },
  setMissions: (missions) => {
    set({ missions });
  },
  setSelectedData: (selectedData) => {
    set({ selectedData });
  },
  setSignUpOutput: (signUpOutput) => {
    set({ signUpOutput });
  },
  setEmail: (email) => {
    set({ email });
  },
  setUsername: (username) => {
    set({ username });
  },
  setLoading: (loading) => {
    set({ loading });
  },
  setData: (data) => {
    set({ data });
  },
  setCursor: (cursor) => {
    set({ cursor });
  },
}));

export default useUserStore;
