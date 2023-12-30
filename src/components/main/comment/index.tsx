import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlaceCommnetCardSkeleton from './CardSkeleton';
import useGetCommentPostsQuery from '../../../hooks/reactQuery/main/useGetCommentPostsQuery';
import CardDarkSkeleton from './CardDarkSkeleton';
import Carousel from '../../share/Carousel';
import Card from './Card';
import useDistrictStore from '../../../store/location/districtStore';
import useThemeStore from '../../../store/theme/themeStore';

const PlaceComments = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { district } = useDistrictStore();
  const {
    data: comments,
    isLoading,
    refetch,
  } = useGetCommentPostsQuery(district);
  const { themeMode } = useThemeStore();

  useEffect(() => {
    refetch();
    setActiveIndex(0);
  }, [district]);

  if (!comments) return;

  return (
    <Carousel
      title={<Title>실시간 댓글 💬</Title>}
      itemCount={comments.length === 0 ? 1 : comments.length}
      carouselCount={
        comments.length / 3 > 1
          ? comments.length / 3
          : comments.length / 3 === 1
          ? 1
          : 1
      }
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
    >
      {!isLoading
        ? comments?.map((comment, index) => (
            <CarouselItem $activeIndex={activeIndex} key={index}>
              <Card comment={comment} />
            </CarouselItem>
          ))
        : themeMode === 'LightMode'
        ? Array.from({ length: 9 }).map((_, i) => (
            <CarouselItem $activeIndex={activeIndex} key={i}>
              <PlaceCommnetCardSkeleton key={i} />
            </CarouselItem>
          ))
        : Array.from({ length: 9 }).map((_, i) => (
            <CarouselItem $activeIndex={activeIndex} key={i}>
              <CardDarkSkeleton key={i} />
            </CarouselItem>
          ))}
    </Carousel>
  );
};

export default PlaceComments;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.text};
`;

const CarouselItem = styled.li<{ $activeIndex: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-${({ $activeIndex }) => $activeIndex * 315}%);
  transition: 500ms ease;
`;
