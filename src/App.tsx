import React from 'react';
import Routers from './shared/Routers';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { LightTheme, DarkTheme } from './styles/theme.js';
import useThemeStore from './store/theme/themeStore.js';

const App = () => {
  const { themeMode, toggleTheme } = useThemeStore();

  return (
    <ThemeProvider theme={themeMode === 'LightMode' ? LightTheme : DarkTheme}>
      <BrowserRouter>
        <Routers toggleTheme={toggleTheme} themeMode={themeMode} />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
