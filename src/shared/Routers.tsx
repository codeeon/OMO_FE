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
import {
  CommentType,
  ContentType,
  CurrentLocationType,
} from '../model/interface';
import { useQuery } from 'react-query';
import { getComment, getContent } from '../apis/apis';

const Routers = () => {
  const [contents, setContents] = useState<ContentType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [currentLocation, setCurrentLocation] = useState<CurrentLocationType>({
    distName: '강남구',
    coord: { lat: 37.514575, lng: 127.0495556 },
  });

  const { data: feeds } = useQuery('contents', getContent, {
    onSuccess: (data) => {
      setContents(data);
    },
  });

  const { data } = useQuery('comments', getComment, {
    onSuccess: (data) => {
      setComments(data);
    },
  });

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
              contents={contents}
              comments={comments}
              currentLocation={currentLocation}
              setCurrentLocation={setCurrentLocation}
            />
          }
        />
        <Route
          path="/contents"
          element={<Contents contents={contents} comments={comments} />}
        />
        <Route path="/map" element={<Map />} />
      </Routes>
    </>
  );
};

export default Routers;
