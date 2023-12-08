import React, { SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';

interface Props {
  starNum: number;
  setStarNum: React.Dispatch<SetStateAction<number>>;
}

const Stars: React.FC<Props> = ({ starNum, setStarNum }) => {
  const [hover, setHover] = useState(0);
  const starArr = [1, 2, 3, 4, 5];

  return (
    <Base>
      {starArr.map((idx) => (
        <BtnWrapper
          key={idx}
          onClick={() => setStarNum(idx)}
          onMouseEnter={() => setHover(idx)}
          onMouseLeave={() => setHover(0)}
        >
          {idx <= hover || idx <= starNum ? <FaStar /> : <FaRegStar />}
        </BtnWrapper>
      ))}
    </Base>
  );
};

export default Stars;

const Base = styled.div`
  margin-top: 8px;

  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  font-size: 20px;
  color: #f97393;
  &:hover {
    color: #f97393;
  }
  cursor: pointer;
`;
