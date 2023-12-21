import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import LeftArrow from '../../../assets/icons/LeftArrow';
import { RightArrow } from '../../../assets/icons/RightArrow';

interface Props {
  imageURL: string[];
  setImageUrl: React.Dispatch<React.SetStateAction<string[]>>;
}

const Image: React.FC<Props> = ({ imageURL, setImageUrl }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const nextPageHandler = () => {
    setActiveIndex((activeIndex) => (activeIndex + 1) % imageURL.length);
  };

  const prevPageHandler = () => {
    setActiveIndex((activeIndex) => (activeIndex - 1) % imageURL.length);
  };

  return (
    <Base>
      <ArrowBtn position="left" onClick={prevPageHandler}>
        <LeftArrow />
      </ArrowBtn>
      <ListContainer>
        {imageURL.map((image) => (
          <Item key={image} image={image} activeIndex={activeIndex} />
        ))}
      </ListContainer>
      <ArrowBtn position="right" onClick={nextPageHandler}>
        <RightArrow />
      </ArrowBtn>
      <Navigation>
        {activeIndex + 1}&nbsp;/&nbsp;{imageURL.length}
      </Navigation>
    </Base>
  );
};

export default Image;

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
  background: rgba(0, 0, 0, 0.4);
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

const Base = styled.div`
  margin-top: 16px;
  position: relative;
  width: 100%;
`;

const ListContainer = styled.ul`
  list-style: none;
  display: flex;
  justify-content: start;
  overflow: hidden;
  height: 550px;
  width: 100%;
`;

const Item = styled.li<{ image: string; activeIndex: number }>`
  width: 50%;
  flex: 1 0 100%;
  transform: translateX(-${({ activeIndex }) => activeIndex * 100}%);
  transition: 500ms ease;

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
