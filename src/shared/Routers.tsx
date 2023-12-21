import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from '../components/share/Navbar';
import Home from '../pages/Home';
import Contents from '../pages/Contents';
import Map from '../pages/Map';

import Register from '../pages/Register';
import Login from '../pages/Login';
import { ThemeType } from '../model/interface';
import Footer from '../components/share/Footer';
import Mypage from '../pages/Mypage';
import Email from '../pages/Email';

const Routers: React.FC<ThemeType> = ({ themeMode, toggleTheme }) => {
  const [currentLocation, setCurrentLocation] = useState<string | undefined>(
    '전체',
  );

  const excludedRoutes = ['/map'];
  const location = useLocation();

  return (
    <>
      <Navbar
        maxWidth={!excludedRoutes.includes(location.pathname) ? null : '98%'}
        themeMode={themeMode}
        toggleTheme={toggleTheme}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              currentLocation={currentLocation}
              setCurrentLocation={setCurrentLocation}
              themeMode={themeMode}
            />
          }
        />
        <Route
          path="/contents"
          element={
            <Contents
              themeMode={themeMode}
              currentLocation={currentLocation}
              setCurrentLocation={setCurrentLocation}
            />
          }
        />
        <Route path="/map" element={<Map />} />
        <Route path="/signup" element={<Email />} />
        <Route path="/signup2" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/mypage"
          element={<Mypage />}
          currentLocation={currentLocation}
        />
      </Routes>
    </>
  );
};

export default Routers;
