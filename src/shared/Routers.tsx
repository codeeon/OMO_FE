import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Navbar from '../components/share/Navbar';
import Home from '../pages/Home';
import Contents from '../pages/Contents';
import Map from '../pages/Map';
import { CommentType, ContentType } from '../model/interface';
import { useQuery } from 'react-query';
import { getComment, getContent } from '../apis/apis';
import Signup from '../pages/Signup';
import Login from '../pages/Login';

const Routers = () => {
  const [currentLocation, setCurrentLocation] = useState<string | undefined>(
    '전체',
  );

  const excludedRoutes = ['/map'];
  const location = useLocation();

  return (
    <>
      {!excludedRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              currentLocation={currentLocation}
              setCurrentLocation={setCurrentLocation}
            />
          }
        />
        <Route
          path="/contents"
          element={
            <Contents
              currentLocation={currentLocation}
              setCurrentLocation={setCurrentLocation}
            />
          }
        />
        <Route path="/map" element={<Map />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default Routers;
