import { create } from 'zustand';

interface CateogryStoreState {
  category: string;
  setCategory: (category: string) => void;
}

const useCategoryStore = create<CateogryStoreState>((set) => ({
  category: '전체',
  setCategory: (cat: string) => set(() => ({ category: cat })),
}));

export default useCategoryStore;
