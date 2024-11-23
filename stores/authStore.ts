import { create } from "zustand";

interface AuthState {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: undefined,
  refreshToken: undefined,
  setAccessToken: (token: string) => set({ accessToken: token }),
  setRefreshToken: (token: string) => set({ refreshToken: token }),
  logout: () => set({ accessToken: undefined, refreshToken: undefined }),
}));
