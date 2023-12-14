import React from 'react';
import { LuPlus } from 'react-icons/lu';
import { LuMinus } from 'react-icons/lu';
import styled from 'styled-components';
import { handleLevel } from '../../../function/kakao.ts';

interface Props {
  mapRef: React.RefObject<kakao.maps.Map>;
  setLevel: React.Dispatch<React.SetStateAction<number>>; // Adjust the type based on your actual state
}

const MapLevelButton: React.FC<Props> = ({ mapRef, setLevel }) => {
  return (
    <Base>
      <BtnWrapper
        onClick={() => {
          handleLevel({ type: 'decrease', mapRef, setLevel });
        }}
      >
        <LuPlus />
      </BtnWrapper>
      <BtnWrapper
        onClick={() => {
          handleLevel({ type: 'increase', mapRef, setLevel });
        }}
      >
        <LuMinus />
      </BtnWrapper>
    </Base>
  );
};

export default MapLevelButton;

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
  color: #b1b1b1;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.color.bg};
  font-size: 26px;
  border: 1px solid ${({ theme }) => theme.color.border2};
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
