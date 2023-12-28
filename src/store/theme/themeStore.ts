// themeStore.js
import { create } from 'zustand';

interface ThemeStoreState {
  themeMode: string | null;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeStoreState>((set) => ({
  themeMode: window.localStorage.getItem('theme') || 'LightMode',
  toggleTheme: () =>
    set((state) => ({
      themeMode: state.themeMode === 'LightMode' ? 'DarkMode' : 'LightMode',
    })),
}));

export default useThemeStore;
