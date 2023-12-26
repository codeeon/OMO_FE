import React from 'react';
import { HashLoader } from 'react-spinners';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';

const LocationAlert = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Base>
      {isLoading ? (
        <Wrapper>
          <HashLoader color="gray" size={20} />
          현재 위치를 업데이트 중입니다.
        </Wrapper>
      ) : (
        <Wrapper>
          <FaCheckCircle />
          현재 위치 업데이트를 성공하였습니다.
        </Wrapper>
      )}
    </Base>
  );
};

export default LocationAlert;

const Base = styled.div`
  box-sizing: border-box;
  width: auto;
  height: 60px;
  background: ${({ theme }) => theme.color.text};
  color: ${({ theme }) => theme.color.bg};
  border-radius: 16px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  svg {
    font-size: 22px;
  }
  font-size: 16px;
  font-weight: bold;
  width: auto;
  gap: 10px;
`;
