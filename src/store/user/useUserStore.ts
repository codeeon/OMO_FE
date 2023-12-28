// themeStore.js
import { create } from 'zustand';

interface UserStoreState {
  userId: number | null;
  setUserId: (userId: number | null) => void;
}

const useUserStore = create<UserStoreState>((set) => ({
  userId: null,
  setUserId: (userId: number | null) => {
    set(() => ({ userId: userId }));

    // 7분 후에 userId를 null로 설정
    setTimeout(() => {
      set(() => ({ userId: null }));
    }, 7 * 60 * 1000);
  },
}));

export default useUserStore;
