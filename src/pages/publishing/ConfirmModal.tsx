import React from 'react';
import styled from 'styled-components';
import Button from '../../components/button/Button';

interface Props {
  closeModalHandler: (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => void;
  clearPostHandler: (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => void;
}

const ConfirmModal: React.FC<Props> = ({
  closeModalHandler,
  clearPostHandler,
}) => {
  const onClickYesBtn = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    closeModalHandler(e);
  };

  const onClickNoBtn = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    clearPostHandler(e);
    closeModalHandler(e);
  };

  return (
    <Base>
      <Title>😥정말 나가시겠어요?</Title>
      <SubText>저장하지 않은 내용을 잃어버릴 수 있어요.</SubText>
      <BtnWrapper>
        <Button
          outlineColor="blue"
          padding="10px 5px"
          width="100px"
          height="15px"
          fontSize="14px"
          fontWeight="700"
          onClick={(e) => onClickYesBtn(e)}
        >
          계속 작성하기
        </Button>
        <Button
          outlineColor="red"
          padding="10px 5px"
          width="45px"
          height="15px"
          fontSize="14px"
          fontWeight="700"
          onClick={(e) => onClickNoBtn(e)}
        >
          나가기
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

  background: ${({ theme }) => theme.color.cardBg};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.color.text};

  text-align: center;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.2px;
`;

const SubText = styled.div`
  color: ${({ theme }) => theme.color.sub};

  margin-top: 15px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.2px;
`;

const BtnWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;
