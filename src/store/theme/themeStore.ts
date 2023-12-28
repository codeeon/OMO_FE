// themeStore.js
import { create } from 'zustand';

interface ThemeStoreState {
  themeMode: string | null;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeStoreState>((set) => ({
  themeMode: window.localStorage.getItem('theme') || 'LightMode',
  toggleTheme: () =>
    set((state) => {
      const newThemeMode =
        state.themeMode === 'LightMode' ? 'DarkMode' : 'LightMode';

      // 로컬 스토리지에 테마 모드 저장
      window.localStorage.setItem('theme', newThemeMode);

      return { themeMode: newThemeMode };
    }),
}));

export default useThemeStore;
