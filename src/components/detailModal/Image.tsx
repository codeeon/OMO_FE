import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Image: React.FC<{ imgUrl: string[] }> = ({ imgUrl }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const nextPageHandler = () => {
    setActiveIndex((activeIndex) => (activeIndex + 1) % imgUrl.length);
  };

  const prevPageHandler = () => {
    setActiveIndex(
      (activeIndex) => (activeIndex - 1 + imgUrl.length) % imgUrl.length,
    );
  };

  return (
    <Base>
      <ArrowBtn position="left" onClick={prevPageHandler}>
        <IoIosArrowBack />
      </ArrowBtn>
      <ListContainer>
        {imgUrl.map((image) => (
          <Item key={image} image={image} activeIndex={activeIndex} />
        ))}
      </ListContainer>
      <ArrowBtn position="right" onClick={nextPageHandler}>
        <IoIosArrowForward />
      </ArrowBtn>
      <Navigation>
        {activeIndex + 1}&nbsp;/&nbsp;{imgUrl.length}
      </Navigation>
    </Base>
  );
};

export default Image;

const Base = styled.div`
  margin-top: 16px;
  position: relative;
`;

const ArrowBtn = styled.div<{ position: string }>`
  position: absolute;
  top: 50%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-size: 24px;
  cursor: pointer;
  border-radius: 100%;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
  ${({ position }) =>
    position === 'left'
      ? css`
          left: 10px;
        `
      : css`
          right: 10px;
        `};
`;

const ListContainer = styled.ul`
  list-style: none;
  display: flex;
  justify-content: start;
  overflow: hidden;
  height: 600px;
`;

const Item = styled.li<{ image: string; activeIndex: number }>`
  width: 50%;
  flex: 1 0 100%;
  transform: translateX(-${({ activeIndex }) => activeIndex * 100}%);
  transition: 500ms ease;
  background: ${({ theme }) => theme.color.bg};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ image }) => `url(${image})`};
  border-radius: 16px;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  border-radius: 20px;
  padding: 5px 10px;
  left: 50%;
  transform: translatex(-50%);
`;
