import { createContext } from "react";

export interface LetterContextData {
  receiverId: number | null;
  textContent: string | null;
}

export const LetterContext = createContext<
  [letter: LetterContextData, setLetter: (data: Partial<LetterContextData>) => void] | []
>([]);
