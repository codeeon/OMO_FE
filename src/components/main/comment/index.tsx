import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import PlaceCommnetCardSkeleton from './CardSkeleton';
import useGetCommentPostsQuery from '../../../hooks/reactQuery/main/useGetCommentPostsQuery';
import CardDarkSkeleton from './CardDarkSkeleton';
import Carousel from '../../share/Carousel';
import Card from './Card';

interface Props {
  currentLocation: string | undefined;
  themeMode: string | null;
}

const PlaceComments: React.FC<Props> = ({ currentLocation, themeMode }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const {
    data: comments,
    isLoading,
    refetch,
  } = useGetCommentPostsQuery(currentLocation);

  const repeatCounts = Array.from({ length: 9 }, (_, index) => index);

  const carouselCounts = Array.from(
    { length: repeatCounts.length / 3 },
    (_, index) => index,
  );

  useEffect(() => {
    refetch();
  }, [currentLocation]);

  return (
    <Carousel
      title={<Title>실시간 댓글 💬</Title>}
      itemCount={9}
      carouselCount={3}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
    >
      {!isLoading
        ? comments?.map((comment) => (
            <CarouselItem activeIndex={activeIndex} key={comment.postId}>
              <Card comment={comment} />
            </CarouselItem>
          ))
        : themeMode === 'LightMode'
        ? Array.from({ length: 9 }).map((_, i) => (
            <CarouselItem activeIndex={activeIndex} key={i}>
              <PlaceCommnetCardSkeleton />
            </CarouselItem>
          ))
        : Array.from({ length: 9 }).map((_, i) => (
            <CarouselItem activeIndex={activeIndex} key={i}>
              <CardDarkSkeleton />
            </CarouselItem>
          ))}
    </Carousel>
  );
};

export default PlaceComments;

const Base = styled.div`
  box-sizing: border-box;
  margin: 60px 0 55px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
  position: relative;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.text};
`;

const Body = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
`;

const CarouselList = styled.ul`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  list-style: none;

  padding: 0;
  display: flex;
  width: 1200px;
  overflow: hidden;
`;

const CarouselItem = styled.li<{ activeIndex: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-${({ activeIndex }) => activeIndex * 315}%);
  transition: 500ms ease;
`;

const NavButton = styled.div<{ isActive?: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 100%;
  border: none;

  background: ${({ isActive }) => (isActive ? '#ED6653' : '#C6C8CA')};
`;

const NavItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.ul`
  list-style: none;

  padding: 0;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  width: 100%;
  height: 30px;
`;

const ArrowBtn = styled.div<{ position: string }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  border-radius: 100%;
  background: ${({ theme }) => theme.color.bg};
  border: 1px solid ${({ theme }) => theme.color.sub};
  &:hover {
    background: ${({ theme }) => theme.color.border};
  }
  ${({ position }) =>
    position === 'left'
      ? css`
          left: -60px;
        `
      : css`
          right: -60px;
        `};
`;
