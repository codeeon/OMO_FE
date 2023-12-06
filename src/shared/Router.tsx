import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '../components/share/Navbar';
import Home from '../pages/Home';
import Contents from '../pages/Contents';
import Map from '../pages/Map';
import { CommentType, ContentType } from '../model/interface';
import { useQuery } from 'react-query';
import { getComment, getContent } from '../apis/apis';

const Router = () => {
  const [contents, setContents] = useState<ContentType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);

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

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home contents={contents} comments={comments} />}
        />
        <Route
          path="/contents"
          element={<Contents contents={contents} comments={comments} />}
        />
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
