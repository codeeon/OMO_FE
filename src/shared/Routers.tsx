import React, { Suspense, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
const Navbar = lazy(() => import('../components/navbar/Navbar'));
const Home = lazy(() => import('../pages/Home'));
const Contents = lazy(() => import('../pages/Contents'));
const Map = lazy(() => import('../pages/googleMap/Index'));
const Login = lazy(() => import('../pages/Login'));
const SignUp = lazy(() => import('../pages/SignUp'));
const ProfileEdit = lazy(
  () => import('../components/auth/mypage/edit/ProfileEdit'),
);
const Mypage = lazy(() => import('../pages/Mypage'));

const Routers = () => {
  const excludedRoutes = ['/map'];
  const mainRoutes = ['/'];
  const location = useLocation();

  return (
    <Suspense fallback={<></>}>
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
    </Suspense>
  );
};

export default Routers;
