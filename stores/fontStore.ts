import { create } from 'zustand';

interface FontStore {
  selectedFont: string; // 선택된 글씨체
  setSelectedFont: (font: string) => void; // 글씨체 변경 함수
}

export const useFontStore = create<FontStore>((set) => ({
  selectedFont: 'EFDiary', // 초기값
  setSelectedFont: (font) => set({ selectedFont: font }),
}));
