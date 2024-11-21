import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (text: any) => set(() => ({ user: text })),
      removeUser: () => set({ user: null }),
    }),
    { name: "user-storage" }
  )
);

export default useStore;
