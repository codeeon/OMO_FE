import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import RecentCard from './Card';
import { useNavigate } from 'react-router-dom';
import ContentCardSkeleton from '../../share/ContentCardSkeleton';
import useGetRecentPostsQuery from '../../../hooks/reactQuery/main/useGetRecentPostsQuery';
import CardDarkSkeleton from './CardDarkSkeleton';
import Carousel from '../../share/Carousel';

interface Props {
  currentLocation: string | undefined;
  themeMode: string | null;
}
const categories = ['전체', '음식점', '카페', '기타'];

const RecentContents: React.FC<Props> = ({ currentLocation, themeMode }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedCateogry, setSelectedCategory] = useState<string>('전체');

  const {
    data: recentPosts,
    isLoading,
    refetch,
  } = useGetRecentPostsQuery(currentLocation, selectedCateogry);

  const navigate = useNavigate();

  const navigateToContentsPage = () => {
    navigate('/contents');
  };

  useEffect(() => {
    refetch();
  }, [currentLocation, selectedCateogry]);

  const changeCateogryHandler = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Carousel
      itemCount={12}
      title={
        <>
          <Header>
            <Title>오늘 모할까🤔?</Title>
            <AllBtnWrapper onClick={navigateToContentsPage}>
              <Description>전체보기</Description>
              <BtnWrapper>
                <IoIosArrowForward />
              </BtnWrapper>
            </AllBtnWrapper>
          </Header>
          <CategroyContainer>
            {categories.map((category) => (
              <CategoryBtn
                isSelected={selectedCateogry === category}
                onClick={() => changeCateogryHandler(category)}
                key={category}
              >
                {category}
              </CategoryBtn>
            ))}
          </CategroyContainer>
        </>
      }
      carouselCount={4}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
    >
      {!isLoading
        ? recentPosts?.map((post) => (
            <CarouselItem activeIndex={activeIndex} key={post.postId}>
              <RecentCard key={post.postId} post={post} />
            </CarouselItem>
          ))
        : themeMode === 'LightMode'
        ? Array.from({ length: 4 }).map((_, idx) => (
            <CarouselItem activeIndex={activeIndex} key={idx}>
              <ContentCardSkeleton key={idx} />
            </CarouselItem>
          ))
        : Array.from({ length: 4 }).map((_, idx) => (
            <CarouselItem activeIndex={activeIndex} key={idx}>
              <CardDarkSkeleton key={idx} />
            </CarouselItem>
          ))}
    </Carousel>
  );
};

export default RecentContents;

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

const CarouselItem = styled.li<{ activeIndex: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-${({ activeIndex }) => activeIndex * 428.5}%);
  transition: 500ms ease;
`;

const CategroyContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const CategoryBtn = styled.div<{ isSelected: boolean }>`
  border: 1px solid ${({ theme }) => theme.color.border};
  color: ${({ theme }) => theme.color.text};
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 16px;
  border-radius: 41px;

  cursor: pointer;
  ${({ isSelected }) =>
    isSelected &&
    css`
      border: 1px solid ${({ theme }) => theme.color.primary};
      color: ${({ theme }) => theme.color.primary};
    `}
  &:hover {
    border: 1px solid ${({ theme }) => theme.color.primary};
    color: ${({ theme }) => theme.color.primary};
  }
  transition: all 300ms ease;
`;
