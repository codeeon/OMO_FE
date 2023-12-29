import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from '../components/share/Navbar';
import Home from '../pages/Home';
import Contents from '../pages/Contents';
import Map from '../pages/googleMap/Index';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ProfileEdit from '../components/auth/mypage/edit/ProfileEdit';
import Mypage from '../pages/Mypage';

import useMapStore from '../store/location/googleMapStore';

const Routers = () => {
  const { initializeMap } = useMapStore();
  useEffect(() => {
    //@ts-ignore
    initializeMap({ lat: 37.514575, lng: 127.0495556 });
  }, []);
  const excludedRoutes = ['/map'];
  const location = useLocation();

  return (
    <>
      <Navbar
        maxWidth={!excludedRoutes.includes(location.pathname) ? null : '98%'}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contents" element={<Contents />} />
        <Route path="/map" element={<Map />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/edit" element={<ProfileEdit />} />
      </Routes>
    </>
  );
};

export default Routers;
