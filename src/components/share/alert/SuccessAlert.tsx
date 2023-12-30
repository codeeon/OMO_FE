import React, { Dispatch, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';

interface Props {
  successMsg: string | null;
}

const SuccessAlert: React.FC<Props> = ({ successMsg }) => {
  return (
    <Base>
      <Wrapper>
        <FaCheckCircle />
        {successMsg && <span>{successMsg}</span>}
      </Wrapper>
    </Base>
  );
};

export default SuccessAlert;

const Base = styled.div`
  box-sizing: border-box;
  width: auto;
  height: 50px;
  background: #5be3a4;
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
  width: 100%;
  svg {
    font-size: 20px;
    color: #fff;
  }
  span {
    color: #fff;
  }
  width: auto;
  gap: 10px;
`;
