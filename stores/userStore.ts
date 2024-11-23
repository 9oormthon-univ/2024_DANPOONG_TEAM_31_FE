import { create } from "zustand";

interface UserState {
  familyId: number | null;
  updateUser: (data: Partial<UserState>) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  familyId: null,
  updateUser: (data) => set({ ...data }),
}));
