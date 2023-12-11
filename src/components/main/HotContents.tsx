import { useState, useEffect } from 'react';
import styled from 'styled-components';
import HotContentsCard from './HotContentsCard';
import HotContentsCardSkeleton from './skeleton/HotContentsCardSkeleton';

import useGetHotContentsQuery from '../../hooks/useGetHotContentsQuery';

const HotContents = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { data: contents, isLoading } = useGetHotContentsQuery();

  const repeatCounts = Array.from({ length: 9 }, (_, index) => index);
  const carouselCounts = Array.from(
    { length: repeatCounts.length / 3 },
    (_, index) => index,
  );

  const handleGoTo = (index: number) => setActiveIndex(index);

  const handleNext = () => {
    setActiveIndex((activeIndex) => (activeIndex + 1) % carouselCounts.length);
  };

  const handleMouseEnter = () => setIsFocused(true);
  const handleMouseLeave = () => setIsFocused(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!isFocused) {
      intervalId = setInterval(handleNext, 8000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isFocused]);
  return (
    <Base onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Title>오늘 인기글</Title>
      <CarouselList>
        {isLoading
          ? Array.from({ length: 9 }).map((_, idx) => (
              <CarouselItem activeIndex={activeIndex} key={idx}>
                <HotContentsCardSkeleton />
              </CarouselItem>
            ))
          : contents?.map((contentData) => (
              <CarouselItem activeIndex={activeIndex} key={contentData.id}>
                <HotContentsCard contentData={contentData} />
              </CarouselItem>
            ))}
      </CarouselList>
      {repeatCounts.length && (
        <Nav>
          {carouselCounts.map((i) => (
            <NavItem key={i}>
              <NavButton
                isActive={activeIndex === i}
                onClick={() => handleGoTo(i)}
              />
            </NavItem>
          ))}
        </Nav>
      )}
    </Base>
  );
};

export default HotContents;

const Base = styled.div`
  box-sizing: border-box;
  margin-top: 35px;
`;

const Title = styled.div`
  height: 24px;
  font-family: Wanted Sans;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
`;

const CarouselList = styled.ul`
  display: flex;
  justify-content: start;
  align-items: center;

  gap: 20px;
  list-style: none;

  padding: 10px 0;
  width: 1200px;
  overflow: hidden;
  margin-top: 20px;
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
