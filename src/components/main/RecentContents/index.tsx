import React from 'react';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import RecentCard from './Card';
import { useNavigate } from 'react-router-dom';
import RecentCardSkeleton from './CardSkeleton';
import useGetRecentContentsQuery from '../../../hooks/useGetRecentContentsQuery';

const RecentContents = () => {
  const navigate = useNavigate();

  const { data: contents, isLoading } = useGetRecentContentsQuery();

  const navigateToContentsPage = () => {
    navigate('/contents');
  };

  return (
    <Base>
      <Header>
        <Title>오늘 모할까🤔?</Title>
        <AllBtnWrapper onClick={navigateToContentsPage}>
          <Description>전체보기</Description>
          <BtnWrapper>
            <IoIosArrowForward />
          </BtnWrapper>
        </AllBtnWrapper>
      </Header>
      <Body>
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <RecentCardSkeleton key={idx} />
            ))
          : contents
              ?.sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .slice(0, 4)
              .map((contentData) => (
                <RecentCard key={contentData.id} contentData={contentData} />
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
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.color.text};
  text-align: center;
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
  position: absolute;
  right: 0;
`;

const Body = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
`;
