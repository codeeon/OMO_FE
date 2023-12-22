import React from 'react';
import { ScaleLoader } from 'react-spinners';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';

const Alert = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Base>
      {isLoading ? (
        <>
          <ScaleLoader color="#111" width={1} height={10} />
          현재 위치를 업데이트 중입니다.
        </>
      ) : (
        <Wrapper>
          <FaCheckCircle />
          현재 위치 업데이트 완료!
        </Wrapper>
      )}
    </Base>
  );
};

export default Alert;

const Base = styled.div`
  box-sizing: border-box;
  width: auto;
  height: 60px;
  background: #fff;
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
    font-size: 20px;
  }
  width: 241px;
  gap: 10px;
`;
