import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import RecentCard from './Card';
import { useNavigate } from 'react-router-dom';
import ContentCardSkeleton from '../../share/ContentCardSkeleton';
import useGetRecentPostsQuery from '../../../hooks/reactQuery/main/useGetRecentPostsQuery';
import Carousel from '../../share/Carousel';
import useDistrictStore from '../../../store/location/districtStore';
import useThemeStore from '../../../store/theme/themeStore';

const categories = ['전체', '음식점', '카페', '기타'];

const RecentContents = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedCateogry, setSelectedCategory] = useState<string>('전체');
  const { district } = useDistrictStore();
  const {
    data: recentPosts,
    isLoading,
    refetch,
  } = useGetRecentPostsQuery(district, selectedCateogry);
  const { themeMode } = useThemeStore();
  const navigate = useNavigate();

  const navigateToContentsPage = () => {
    navigate('/contents');
  };

  useEffect(() => {
    refetch();
    setActiveIndex(0);
  }, [district, selectedCateogry]);

  const changeCateogryHandler = (category: string) => {
    setSelectedCategory(category);
  };

  if (!recentPosts) return;

  return (
    <Carousel
      itemCount={recentPosts.length === 0 ? 1 : recentPosts.length}
      carouselCount={
        recentPosts.length / 4 > 1
          ? recentPosts.length / 4
          : recentPosts.length / 4 === 1
          ? 1
          : 1
      }
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
                $isSelected={selectedCateogry === category}
                onClick={() => changeCateogryHandler(category)}
                key={category}
              >
                {category}
              </CategoryBtn>
            ))}
          </CategroyContainer>
        </>
      }
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
    >
      {!isLoading
        ? recentPosts?.map((post) => (
            <CarouselItem $activeIndex={activeIndex} key={post.postId}>
              <RecentCard key={post.postId} post={post} />
            </CarouselItem>
          ))
        : Array.from({ length: 4 }).map((_, idx) => (
            <CarouselItem $activeIndex={activeIndex} key={idx}>
              <ContentCardSkeleton key={idx} />
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

const CarouselItem = styled.li<{ $activeIndex: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-${({ $activeIndex }) => $activeIndex * 428}%);
  transition: 500ms ease;
`;

const CategroyContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const CategoryBtn = styled.div<{ $isSelected: boolean }>`
  border: 1px solid ${({ theme }) => theme.color.border};
  color: ${({ theme }) => theme.color.text};
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 16px;
  border-radius: 41px;

  cursor: pointer;
  ${({ $isSelected }) =>
    $isSelected &&
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
