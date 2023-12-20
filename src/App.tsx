import React, { useState } from 'react';
import Routers from './shared/Routers';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { LightTheme, DarkTheme } from './styles/theme.js';

const App = () => {
  const localThemeMode = window.localStorage.getItem('theme' || 'LightMode');
  const [themeMode, setThemeMode] = useState<string | null>(localThemeMode);

  const toggleTheme = () => {
    if (themeMode === 'LightMode') {
      setThemeMode('DarkMode');
      window.localStorage.setItem('theme', 'DarkMode');
    } else {
      setThemeMode('LightMode');
      window.localStorage.setItem('theme', 'LightMode');
    }
    // window.location.reload();
  };

  return (
    <ThemeProvider theme={themeMode === 'LightMode' ? LightTheme : DarkTheme}>
      <BrowserRouter>
        <Routers toggleTheme={toggleTheme} themeMode={themeMode} />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
