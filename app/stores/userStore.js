import { create } from "zustand";

const useUserStore = create((set, get) => ({
  user: null,
  selectedData: null,
  mission: null,
  data: [],
  currentCursor: 0,
  signUpOutput: null,
  email: "",
  password: "",
  username: "",
  loading: true,
  amount: 0,
  signInOpen: false,
  error: null,
  setUser: (user) => {
    set({ user });
  },
  setSignInOpen: (signInOpen) => {
    set({ signInOpen });
  },
  setAmount: (amount) => {
    set({ amount });
  },
  setMission: (mission) => {
    set({ mission });
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
  setPassword: (password) => {
    set({ password });
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
  setCurrentCursor: (currentCursor) => {
    set({ currentCursor });
  },
}));

export default useUserStore;
