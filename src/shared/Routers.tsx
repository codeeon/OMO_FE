import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from '../components/share/Navbar';
import Home from '../pages/Home';
import Contents from '../pages/Contents';
import Map from '../pages/map/Index';
import Login from '../pages/Login';
import {
  CurrentLocationType,
  LocationType,
  ThemeType,
} from '../model/interface';
import SignUp from '../pages/SignUp';

const Routers: React.FC<ThemeType> = ({ themeMode, toggleTheme }) => {
  const [currentDistrict, setCurrentDistrict] = useState<string | undefined>(
    '전체',
  );
  const [currentLocation, setCurrentLocation] = useState<CurrentLocationType>({
    lat: 0,
    lng: 0,
  });
  const [selectedPlace, setSelectedPlace] = useState<LocationType | null>(null);

  const excludedRoutes = ['/map'];
  const location = useLocation();
  const [map, setMap] = useState<google.maps.Map | null>(null);
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
              themeMode={themeMode}
              setCurrentLocation={setCurrentLocation}
              setSelectedPlace={setSelectedPlace}
              currentDistrict={currentDistrict}
              setCurrentDistrict={setCurrentDistrict}
            />
          }
        />
        <Route
          path="/contents"
          element={
            <Contents
              themeMode={themeMode}
              currentDistrict={currentDistrict}
              setCurrentDistrict={setCurrentDistrict}
              map={map}
            />
          }
        />
        <Route
          path="/map"
          element={
            <Map
              themeMode={themeMode}
              selectedPlace={selectedPlace}
              setSelectedPlace={setSelectedPlace}
              currentLocation={currentLocation}
              setCurrentLocation={setCurrentLocation}
              map={map}
              setMap={setMap}
            />
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/mypage"
          // element={<Mypage currentLocation={currentLocation} />}
        />
      </Routes>
    </>
  );
};

export default Routers;
