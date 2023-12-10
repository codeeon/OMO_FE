import React from 'react';
import styled from 'styled-components';
import Button from '../share/Button';

interface Props {
  closeModalHandler: () => void;
  clearPostHandler: () => void;
}

const ConfirmModal: React.FC<Props> = ({
  closeModalHandler,
  clearPostHandler,
}) => {
  const onClickYesBtn = () => {
    clearPostHandler();
  };

  const onClickNoBtn = () => {
    closeModalHandler();
  };

  return (
    <Base>
      <Title>게시글을 삭제하시겠습니까?</Title>
      <BtnWrapper>
        <Button
          outlineColor="red"
          padding="10px 20px"
          width="40px"
          height="15px"
          fontSize="14px"
          fontWeight="700"
          onClick={onClickYesBtn}
        >
          예
        </Button>
        <Button
          outlineColor="blue"
          padding="10px 20px"
          width="40px"
          height="15px"
          fontSize="14px"
          fontWeight="700"
          onClick={onClickNoBtn}
        >
          아니오
        </Button>
      </BtnWrapper>
    </Base>
  );
};

export default ConfirmModal;

const Base = styled.div`
  width: 335px;
  height: 287px;
  border-radius: 16px;

  background: #fff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  color: #000;

  text-align: center;
  font-family: Wanted Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 20px */
  letter-spacing: -0.2px;
`;

const BtnWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;
