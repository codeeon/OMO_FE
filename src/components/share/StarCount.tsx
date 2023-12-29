import React from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';

interface Props {
  margin?: string;
  count: number;
}

const StarCount: React.FC<Props> = ({ margin, count }) => {
  return (
    <RatingContainer $margin={margin}>
      {Array.from({ length: 5 }, (_, idx) => (
        <StarWrapper key={idx}>
          {idx < count ? <FaStar /> : <FaRegStar />}
        </StarWrapper>
      ))}
      <span>{count}점</span>
    </RatingContainer>
  );
};

export default StarCount;

const RatingContainer = styled.div<{ $margin: string }>`
  margin: ${({ $margin }) => ($margin ? $margin : 0)};
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 2px;
  span {
    margin-top: 2px;
    margin-left: 2px;
    text-align: center;
    color: ${({ theme }) => theme.color.text};
    font-size: 16px;
    font-weight: 700;
  }
`;

const StarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  font-size: 16px;
  color: #f97393;
`;
