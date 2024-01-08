// themeStore.js
import { create } from 'zustand';

interface BookMarkStoreState {
  isShowBookMarkPlace: boolean;
  toggleBookmarkDisplay: () => void;
}

const useBookMarkPlaceStore = create<BookMarkStoreState>((set) => ({
  isShowBookMarkPlace: false,
  toggleBookmarkDisplay: () =>
    set((state) => ({ isShowBookMarkPlace: !state.isShowBookMarkPlace })),
}));

export default useBookMarkPlaceStore;
