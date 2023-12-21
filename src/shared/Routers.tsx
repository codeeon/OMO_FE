import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from '../components/share/Navbar';
import Home from '../pages/Home';
import Contents from '../pages/Contents';
import Map from '../pages/Map';

import Signup from '../pages/Signup';
import Login from '../pages/Login';
import {
  LocationType,
  MapCurrentLocationType,
  MapLocationType,
  ThemeType,
} from '../model/interface';
import { getCurrentCoords } from '../function/kakao';
import Mypage from '../pages/Mypage';

const Routers: React.FC<ThemeType> = ({ themeMode, toggleTheme }) => {
  const [currentLocation, setCurrentLocation] = useState<string | undefined>(
    '전체',
  );
  const [myLoca, setMyLoca] = useState<MapCurrentLocationType>({
    lat: null,
    lng: null,
    placeName: null,
  });
  const [mapCenterLocation, setMapCenterLocation] = useState<MapLocationType>({
    center: { lat: myLoca.lat, lng: myLoca.lng },
    isPanto: false,
    bounds: null,
  });
  const [selectedPlace, setSelectedPlace] = useState<LocationType | null>(null);

  useEffect(() => {
    const getCurLoc = async () => {
      const { latitude, longitude } = await getCurrentCoords();

      setMyLoca({
        ...myLoca,
        lat: latitude,
        lng: longitude,
      });

      setMapCenterLocation({
        ...mapCenterLocation,
        center: {
          lat: latitude,
          lng: longitude,
        },
      });
    };
    getCurLoc();
  }, []);

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
              mapCenterLocation={mapCenterLocation}
              setMapCenterLocation={setMapCenterLocation}
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
        <Route
          path="/map"
          element={
            <Map
              myLoca={myLoca}
              setMyLoca={setMyLoca}
              mapCenterLocation={mapCenterLocation}
              setMapCenterLocation={setMapCenterLocation}
              selectedPlace={selectedPlace}
              setSelectedPlace={setSelectedPlace}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/mypage"
          element={<Mypage currentLocation={currentLocation} />}
        />
      </Routes>
    </>
  );
};

export default Routers;
