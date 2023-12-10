import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const BannerPlaceCard = () => {
  return (
    <Base
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <PlaceName>리움 미술관</PlaceName>
      <InfoContainer>{`별점 3.4점 (14)`}</InfoContainer>
    </Base>
  );
};

export default BannerPlaceCard;

const Base = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  border-radius: 8px;
  width: 330px;
  height: 210px;
  padding: 30px;
  gap: 8px;

  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4)),
    url('https://img1.kakaocdn.net/cthumb/local/R0x420/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2FkakaomapPhoto%2Freview%2F0716011c41101c7b06755912ad01155a25b696bf%3Foriginal');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  cursor: pointer;
`;

const PlaceName = styled.div`
  color: #fff;
  font-family: Wanted Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 20px */
`;

const InfoContainer = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;
