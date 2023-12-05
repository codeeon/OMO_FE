import React, { useEffect } from 'react';
import Router from './shared/Router';
import { app } from '../firebase';

const App = () => {
  useEffect(() => {
    console.log(app);
  }, []);
  return (
    <>
      <Router />
    </>
  );
};

export default App;
