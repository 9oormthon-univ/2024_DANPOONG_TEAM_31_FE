import { create } from "zustand";

interface AppState {
  showSettingsOnLogin: boolean;
  setShowSettingsOnLogin: (state: AppState["showSettingsOnLogin"]) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  showSettingsOnLogin: false,
  setShowSettingsOnLogin: (state) => set({ showSettingsOnLogin: state }),
}));
