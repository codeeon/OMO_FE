import React from 'react';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import RecentCard from './RecentCard';
import { useNavigate } from 'react-router-dom';

const RecentContents = () => {
  const navigate = useNavigate();

  const four = Array.from({ length: 4 }, (_, index) => index);
  
  return (
    <Base>
      <Header>
        <Title>오늘 뭐하지? (최신글)</Title>
        <AllBtnWrapper onClick={() => navigate}>
          <Description>전체보기</Description>
          <BtnWrapper>
            <IoIosArrowForward />
          </BtnWrapper>
        </AllBtnWrapper>
      </Header>
      <Body>
        {four.map((i) => (
          <RecentCard />
        ))}
      </Body>
    </Base>
  );
};

export default RecentContents;

const Base = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #a9a9a9;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  color: #a9a9a9;
  margin-bottom: 1px;
`;

const AllBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  &:hover ${BtnWrapper} {
    color: black;
  }
  &:hover ${Description} {
    color: black;
  }
`;

const Body = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
`;
