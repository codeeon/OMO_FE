import React, { useEffect } from 'react';
import Routers from './shared/Routers';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { LightTheme, DarkTheme } from './styles/theme.js';
import useThemeStore from './store/theme/themeStore.js';

const App = () => {
  const { themeMode, toggleTheme } = useThemeStore();
  useEffect(() => {
    console.log(`
      OOOOOOOOO     MMMMMMMM               MMMMMMMM     OOOOOOOOO     
    OO:::::::::OO   M:::::::M             M:::::::M   OO:::::::::OO   
  OO:::::::::::::OO M::::::::M           M::::::::M OO:::::::::::::OO 
 O:::::::OOO:::::::OM:::::::::M         M:::::::::MO:::::::OOO:::::::O
 O::::::O   O::::::OM::::::::::M       M::::::::::MO::::::O   O::::::O
 O:::::O     O:::::OM:::::::::::M     M:::::::::::MO:::::O     O:::::O
 O:::::O     O:::::OM:::::::M::::M   M::::M:::::::MO:::::O     O:::::O
 O:::::O     O:::::OM::::::M M::::M M::::M M::::::MO:::::O     O:::::O
 O:::::O     O:::::OM::::::M  M::::M::::M  M::::::MO:::::O     O:::::O
 O:::::O     O:::::OM::::::M   M:::::::M   M::::::MO:::::O     O:::::O
 O:::::O     O:::::OM::::::M    M:::::M    M::::::MO:::::O     O:::::O
 O::::::O   O::::::OM::::::M     MMMMM     M::::::MO::::::O   O::::::O
 O:::::::OOO:::::::OM::::::M               M::::::MO:::::::OOO:::::::O
  OO:::::::::::::OO M::::::M               M::::::M OO:::::::::::::OO 
    OO:::::::::OO   M::::::M               M::::::M   OO:::::::::OO   
      OOOOOOOOO     MMMMMMMM               MMMMMMMM     OOOOOOOOO     
    `);
  }, []);

  return (
    <ThemeProvider theme={themeMode === 'LightMode' ? LightTheme : DarkTheme}>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
