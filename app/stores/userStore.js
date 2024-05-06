import { create } from "zustand";

const useUserStore = create((set, get) => ({
  user: null,
  signUpOutput: null,
  email: "",
  username: "",
  loading: true,
  error: null,
  setUser: (user) => {
    set({ user });
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
}));

export default useUserStore;
