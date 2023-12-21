import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import LeftArrow from '../../assets/icons/LeftArrow';
import { RightArrow } from '../../assets/icons/RightArrow';

interface Props {
  itemCount: number;
  title?: ReactNode;
  carouselCount: number;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  children: ReactNode;
}

const Carousel: React.FC<Props> = ({
  itemCount,
  title,
  carouselCount,
  activeIndex,
  setActiveIndex,
  children,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const repeatCounts = Array.from({ length: itemCount }, (_, index) => index);

  const carouselCounts = Array.from(
    { length: carouselCount },
    (_, index) => index,
  );

  const handleGoTo = (index: number) => {
    setActiveIndex(index);
  };

  const handleNext = () => {
    setActiveIndex((activeIndex) => (activeIndex + 1) % carouselCount);
  };

  const handlePrev = () => {
    setActiveIndex(
      (activeIndex) => (activeIndex - 1 + carouselCount) % carouselCount,
    );
  };

  const handleMouseEnter = () => setIsFocused(true);

  const handleMouseLeave = () => setIsFocused(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!isFocused) {
      intervalId = setInterval(handleNext, 5000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isFocused]);

  return (
    <Base onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {title}
      <CarouselList>
        <ArrowBtn position="left" onClick={handlePrev}>
          <LeftArrow />
        </ArrowBtn>
        {children}
        <ArrowBtn position="right" onClick={handleNext}>
          <RightArrow />
        </ArrowBtn>
      </CarouselList>
      {repeatCounts.length && (
        <Nav>
          {carouselCounts.map((i, idx) => (
            <NavItem key={idx}>
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

export default Carousel;

const Base = styled.div`
  box-sizing: border-box;
  margin-top: 62px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
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
