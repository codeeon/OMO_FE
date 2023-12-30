import React, { Dispatch, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
import { PiWarningCircleFill } from 'react-icons/pi';

interface Props {
  errorMsg: string | null;
}

const ErrorAlert: React.FC<Props> = ({ errorMsg }) => {
  return (
    <Base>
      <Wrapper>
        <PiWarningCircleFill />
        {errorMsg && <span>{errorMsg}</span>}
      </Wrapper>
    </Base>
  );
};

export default ErrorAlert;

const Base = styled.div`
  box-sizing: border-box;
  width: auto;
  height: 50px;
  background: ${({ theme }) => theme.color.primary};
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
    color: #fff;
  }
  span {
    color: #fff;
  }
  width: auto;
  gap: 10px;
`;
