import { create } from "zustand";

interface MemoState {
  type: "unselected" | "mood" | "message" | "sending" | "done" | undefined;
  setType: (state: MemoState["type"]) => void;
}

export const useMemoStore = create<MemoState>()((set) => ({
  type: undefined,
  setType: (state) => set((prev) => ({ type: state })),
}));
