import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlaceCommnetCardSkeleton from '../../../components/skeleton/CommentCardSkeleton';
import useGetCommentPostsQuery from '../../../hooks/reactQuery/main/useGetCommentPostsQuery';
import Carousel from '../../../components/share/Carousel';
import Card from '../../../components/card/CommentCard';
import useDistrictStore from '../../../store/location/districtStore';
const PlaceComments = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { district } = useDistrictStore();
  const {
    data: comments,
    isFetching,
    refetch,
  } = useGetCommentPostsQuery(district);

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
        comments.length / 3 === 0 ? 1 : Math.ceil(comments.length / 3)
      }
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
    >
      {!isFetching
        ? comments?.map((comment, index) => (
            <CarouselItem $activeIndex={activeIndex} key={index}>
              <Card comment={comment} />
            </CarouselItem>
          ))
        : Array.from({ length: 3 }).map((_, i) => (
            <CarouselItem $activeIndex={activeIndex} key={i}>
              <PlaceCommnetCardSkeleton key={i} />
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
