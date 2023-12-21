import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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
            <CarouselItem activeIndex={activeIndex} key={comment.PostId}>
              <Card comment={comment} key={comment.PostId} />
            </CarouselItem>
          ))
        : themeMode === 'LightMode'
        ? Array.from({ length: 9 }).map((_, i) => (
            <CarouselItem activeIndex={activeIndex} key={i}>
              <PlaceCommnetCardSkeleton key={i} />
            </CarouselItem>
          ))
        : Array.from({ length: 9 }).map((_, i) => (
            <CarouselItem activeIndex={activeIndex} key={i}>
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

const CarouselItem = styled.li<{ activeIndex: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-${({ activeIndex }) => activeIndex * 315}%);
  transition: 500ms ease;
`;
