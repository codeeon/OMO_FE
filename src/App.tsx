import React, { useEffect } from 'react';
import Routers from './shared/Routers';
import { app } from '../firebase';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  useEffect(() => {
    console.log(app);
  }, []);
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
};

export default App;
