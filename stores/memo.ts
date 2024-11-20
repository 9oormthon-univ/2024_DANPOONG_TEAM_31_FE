import { create } from "zustand";

interface MemoState {
  type: "unselected" | "mood" | "message" | "sending" | "done" | undefined;
  mood: any;
  message: string | undefined;
  setType: (state: MemoState["type"]) => void;
  setMemo: (memo: Partial<MemoState>) => void;
}

export const useMemoStore = create<MemoState>()((set) => ({
  type: undefined,
  mood: undefined,
  message: undefined,
  setType: (state) => set((prev) => ({ ...prev, type: state })),
  setMemo: (memo) => set((prev) => ({ ...prev, ...memo })),
}));
