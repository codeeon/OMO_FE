import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from '../components/share/Navbar';
import Home from '../pages/Home';
import Contents from '../pages/Contents';
import Map from '../pages/googleMap/Index';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ProfileEdit from '../components/auth/mypage/edit/ProfileEdit';
import Mypage from '../pages/Mypage';

const Routers = () => {
  const excludedRoutes = ['/map'];
  const mainRoutes = ['/'];
  const location = useLocation();

  return (
    <>
      <Navbar
        maxWidth={!excludedRoutes.includes(location.pathname) ? null : '98%'}
        disableLogo={!mainRoutes.includes(location.pathname) ? null : true}
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
