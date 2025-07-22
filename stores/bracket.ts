import { create } from "zustand";

interface ITeams {
  id: string;
  name: string;
}

interface IBracketItem {
  id: string;
  title: string;
  teams: ITeams[];
}

interface IBracket {
  item: IBracketItem | null;
  addItem: (item: IBracketItem) => void;
  clearItems: () => void;
}

const useBracketStore = create<IBracket>((set) => ({
  item: null,

  addItem: (item) => set({ item }),

  clearItems: () => set({ item: null }),
}));

export default useBracketStore;
