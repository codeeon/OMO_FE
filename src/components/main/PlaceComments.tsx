import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlaceCommnetCard from './PlaceCommnetCard';
import PlaceCommnetCardSkeleton from './skeleton/PlaceCommnetCardSkeleton';

const PlaceComments = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const repeatCounts = Array.from({ length: 9 }, (_, index) => index);
  const carouselCounts = Array.from(
    { length: repeatCounts.length / 3 },
    (_, index) => index,
  );

  const handleGoTo = (index: number) => setActiveIndex(index);

  const handleNext = () => {
    setActiveIndex((activeIndex) => (activeIndex + 1) % carouselCounts.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (activeIndex) =>
        (activeIndex - 1 + carouselCounts.length) % carouselCounts.length,
    );
  };

  const handleMouseEnter = () => setIsFocused(true);
  const handleMouseLeave = () => setIsFocused(false);

  useEffect(() => {
    let intervalId: number;

    if (!isFocused) {
      intervalId = setInterval(handleNext, 4000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isFocused]);

  return (
    <Base onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Header>
        <Title>댓글</Title>
      </Header>
      <Body>
        <CarouselList>
          {/* skeleton */}
          {Array(9)
            .fill(1)
            .map((i) => (
              <CarouselItem activeIndex={activeIndex} key={i}>
                <PlaceCommnetCardSkeleton />
              </CarouselItem>
            ))}
          {/* skeleton */}
          {repeatCounts.map((i) => (
            <CarouselItem activeIndex={activeIndex} key={i}>
              <PlaceCommnetCard />
            </CarouselItem>
          ))}
        </CarouselList>
      </Body>
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

export default PlaceComments;

const Base = styled.div`
  box-sizing: border-box;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
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
