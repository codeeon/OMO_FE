import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardSkeleton from './CardSkeleton';
import useGetHotPosts from '../../../hooks/reactQuery/main/useGetHotPostsQuery';
import Carousel from '../../share/Carousel';
import Card from './Card';
import useDistrictStore from '../../../store/location/districtStore';
import useThemeStore from '../../../store/theme/themeStore';

const HotContents = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { district } = useDistrictStore();
  const { data: hotPosts, isLoading, refetch } = useGetHotPosts(district);
  const { themeMode } = useThemeStore();

  useEffect(() => {
    refetch();
  }, [district]);

  return (
    <Carousel
      itemCount={9}
      title={<Title>요즘 뜨는🔥</Title>}
      carouselCount={3}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
    >
      {!isLoading
        ? hotPosts?.map((post) => (
            <CarouselItem $activeIndex={activeIndex} key={post.imgUrl[0]}>
              <Card post={post} />
            </CarouselItem>
          ))
        : Array.from({ length: 9 }).map((_, idx) => (
            <CarouselItem $activeIndex={activeIndex} key={idx}>
              <CardSkeleton key={idx} />
            </CarouselItem>
          ))}
    </Carousel>
  );
};

export default HotContents;

const Title = styled.div`
  height: 24px;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  color: ${({ theme }) => theme.color.text};
`;

const CarouselItem = styled.li<{ $activeIndex: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-${({ $activeIndex }) => $activeIndex * 315}%);
  transition: 500ms ease;
`;
