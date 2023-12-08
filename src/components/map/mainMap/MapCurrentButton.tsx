import React from 'react';
import { MdMyLocation } from 'react-icons/md';
import styled from 'styled-components';
import { Location, moveMyLocation } from '../../../function/kakao';

const MapCurrentButton: React.FC<{
  setMyLoca: React.Dispatch<React.SetStateAction<Location>>;
}> = ({ setMyLoca }) => {
  return (
    <BtnWrapper onClick={() => moveMyLocation(setMyLoca)}>
      <MdMyLocation />
    </BtnWrapper>
  );
};

export default MapCurrentButton;

const BtnWrapper = styled.div`
  z-index: 99;
  position: absolute;
  right: 45px;
  bottom: 130px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #b1b1b1;
  font-size: 26px;
  background: #fff;
  border: 1px solid #7c7c7c;
  border-radius: 8px;

  width: 40px;
  height: 40px;

  &:hover {
    font-size: 28px;
    background: #d9d9d9;
  }

  cursor: pointer;
`;
