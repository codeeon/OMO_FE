import { useState, useEffect } from 'react';
import styled from 'styled-components';
import HotContentsCard from './HotContentsCard';
import HotContentsCardSkeleton from './skeleton/HotContentsCardSkeleton';
import { ContentType } from '../../model/interface';

const HotContents: React.FC<{ contents: ContentType[] }> = ({ contents }) => {
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
      {/* <HotContentsList> */}
      <CarouselList>
        {/* {!contents && */}
        {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((v) => (
          <CarouselItem activeIndex={activeIndex}>
            <HotContentsCardSkeleton />
          </CarouselItem>
        ))}
        {/* } */}
        {/* {contents &&
          contents.map((content) => (
            <CarouselItem activeIndex={activeIndex}>
              <HotContentsCard cont={content} />
              <HotContentsCardSkeleton cont={content} />
            </CarouselItem>
          ))} */}
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
      {/* </HotContentsList> */}
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
