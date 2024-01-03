import React from 'react';
import { LuPlus } from 'react-icons/lu';
import { LuMinus } from 'react-icons/lu';
import styled from 'styled-components';
import { handleLevel } from '../../../utils/kakao.ts';

interface Props {
  downMapLevelHandler: () => void;
  upMapLevelHandler: () => void;
}

const LevelButton: React.FC<Props> = ({
  downMapLevelHandler,
  upMapLevelHandler,
}) => {
  return (
    <Base>
      <BtnWrapper onClick={upMapLevelHandler}>
        <LuPlus />
      </BtnWrapper>
      <BtnWrapper onClick={downMapLevelHandler}>
        <LuMinus />
      </BtnWrapper>
    </Base>
  );
};

export default LevelButton;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 45px;
  bottom: 45px;
  z-index: 2;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.sub};
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.color.bg};
  font-size: 26px;
  border: 2px solid ${({ theme }) => theme.color.sub};
  &:hover {
    font-size: 28px;
    background: #d9d9d9;
  }
  cursor: pointer;
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;
