import { useState, useEffect } from 'react';
import styled from 'styled-components';
import HotContentsCard from './HotContentsCard';
import { getContentsTest } from '../../apis/contents';
import { useQuery } from 'react-query';
import { Contents as ContentType } from '../../model/interface';

const HotContents: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [testData, setTestData] = useState<ContentType[]>([]);

  const { data } = useQuery('contents', () => getContentsTest(9), {
    onSuccess: (data: ContentType[]) => {
      setTestData(data);
    },
  });
  console.log(testData);

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
      <Title>오늘 인기글</Title>
      <CarouselList>
        {repeatCounts.map((i) =>
          testData?.slice(0, 9).map((cont) => (
            <CarouselItem activeIndex={activeIndex} key={i}>
              <HotContentsCard key={cont.postId} cont={cont} />
            </CarouselItem>
          )),
        )}
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

  padding: 0;
  display: flex;
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
