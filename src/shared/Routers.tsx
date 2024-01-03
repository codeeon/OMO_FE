import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import usePlaceStore from '../store/location/placeStore';
import UserPage from '../pages/UserPage';
const Navbar = lazy(() => import('../components/navbar/Navbar'));
const Home = lazy(() => import('../pages/Home'));
const Contents = lazy(() => import('../pages/posts/Posts'));
const Map = lazy(() => import('../pages/googleMap/Index'));
const Login = lazy(() => import('../pages/Login'));
const SignUp = lazy(() => import('../pages/SignUp'));
const ProfileEdit = lazy(() => import('../pages/ProfileEdit'));
const Mypage = lazy(() => import('../pages/Mypage'));

const Routers = () => {
  const excludedRoutes = ['/map'];
  const mainRoutes = ['/'];
  const location = useLocation();
  const { setPlace } = usePlaceStore();

  useEffect(() => {
    if (!excludedRoutes.includes(location.pathname)) {
      setPlace(null);
    }
  }, [location.pathname]);

  return (
    <Suspense fallback={<></>}>
      <Navbar
        maxWidth={!excludedRoutes.includes(location.pathname) ? null : '98%'}
        disableLogo={!mainRoutes.includes(location.pathname) ? null : true}
        disableSearch={
          !excludedRoutes.includes(location.pathname) ? null : true
        }
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contents" element={<Contents />} />
        <Route path="/map" element={<Map />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/edit" element={<ProfileEdit />} />
        <Route path="/userpage/:nickname" element={<UserPage />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
