import { useState, useEffect, SetStateAction, useId } from 'react';
import styled from 'styled-components';
import CardSkeleton from './CardSkeleton';
import useGetHotPosts from '../../../hooks/reactQuery/main/useGetHotPostsQuery';
import CardDarkSkeleton from './CardDarkSkeleton';
import { CurrentLocationType, LocationType } from '../../../model/interface';
import Carousel from '../../share/Carousel';
import Card from './Card';

interface Props {
  themeMode: string | null;
  setSelectedPlace: React.Dispatch<SetStateAction<LocationType | null>>;
  setCurrentLocation: React.Dispatch<SetStateAction<CurrentLocationType>>;
  currentDistrict: string | undefined;
  setCurrentDistrict: React.Dispatch<SetStateAction<string | undefined>>;
}

const HotContents: React.FC<Props> = ({
  themeMode,
  setSelectedPlace,
  setCurrentLocation,
  currentDistrict,
  setCurrentDistrict,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const uniqueId = useId();

  const {
    data: hotPosts,
    isLoading,
    refetch,
  } = useGetHotPosts(currentDistrict);

  useEffect(() => {
    refetch();
  }, [currentDistrict]);

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
            <CarouselItem activeIndex={activeIndex} key={post.imgUrl[0]}>
              <Card post={post} setCurrentLocation={setCurrentLocation} />
            </CarouselItem>
          ))
        : themeMode === 'LightMode'
        ? Array.from({ length: 9 }).map((_, idx) => (
            <CarouselItem activeIndex={activeIndex} key={idx}>
              <CardSkeleton key={idx} />
            </CarouselItem>
          ))
        : Array.from({ length: 9 }).map((_, idx) => (
            <CarouselItem activeIndex={activeIndex} key={idx}>
              <CardDarkSkeleton key={idx} />
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

const CarouselItem = styled.li<{ activeIndex: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-${({ activeIndex }) => activeIndex * 315}%);
  transition: 500ms ease;
`;
