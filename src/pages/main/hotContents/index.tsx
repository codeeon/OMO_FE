import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useGetHotPosts from '../../../hooks/reactQuery/main/useGetHotPostsQuery';
import Carousel from '../../../components/share/Carousel';
import useDistrictStore from '../../../store/location/districtStore';
import MainHotPostsSkeleton from '../../../components/skeleton/HotPostCardSkeleton';
import MainHotPostsCard from '../../../components/card/HotPostsCard';

const HotContents = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { district } = useDistrictStore();
  const { data: hotPosts, refetch, isFetching } = useGetHotPosts(district);
  useEffect(() => {
    setActiveIndex(0);
    refetch();
  }, [district, refetch]);

  if (!hotPosts) {
    return;
  }

  return (
    <Carousel
      itemCount={hotPosts.length === 0 ? 1 : hotPosts.length}
      title={<Title>요즘 뜨는🔥</Title>}
      carouselCount={
        hotPosts.length / 3 === 0 ? 1 : Math.ceil(hotPosts.length / 3)
      }
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
    >
      {!isFetching
        ? hotPosts?.map((post) => (
            <CarouselItem $activeIndex={activeIndex} key={post.imgUrl[0]}>
              <MainHotPostsCard post={post} />
            </CarouselItem>
          ))
        : Array.from({ length: 3 }).map((_, idx) => (
            <CarouselItem $activeIndex={0} key={idx}>
              <MainHotPostsSkeleton key={idx} />
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
