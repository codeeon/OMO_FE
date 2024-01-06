import React from 'react';
import styled from 'styled-components';
import useDeleteMyDataMutation from '../../../../hooks/reactQuery/auth/useDeleteMyUserDataMutation';

const WithdrawModal = (props) => {
  const { setIsModalOpen } = props;
  const { useDeleteMyDataMutate } = useDeleteMyDataMutation();

  return (
    <Base>
      <Mark>{warn}</Mark>
      <Title>정말로 탈퇴하시겠어요?</Title>
      <Text>즉시 탈퇴 처리되며 되돌릴 수 없습니다.</Text>
      <Selection>
        <Btn $agree={true} onClick={useDeleteMyDataMutate}>
          예
        </Btn>
        <Btn $agree={false} onClick={() => setIsModalOpen(false)}>
          아니오
        </Btn>
      </Selection>
    </Base>
  );
};

export default WithdrawModal;

const Base = styled.div`
  width: 335px;
  height: 207px;
  flex-shrink: 0;
  box-sizing: border-box;
  border-radius: 8px;
  background: ${({ theme }) => theme.color.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Mark = styled.div`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  margin-top: 30px;
`;

const warn = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
  >
    <path
      d="M14.0007 25.6673C7.55733 25.6673 2.33398 20.4439 2.33398 14.0007C2.33398 7.55733 7.55733 2.33398 14.0007 2.33398C20.4439 2.33398 25.6673 7.55733 25.6673 14.0007C25.6673 20.4439 20.4439 25.6673 14.0007 25.6673ZM14.0007 23.334C19.1553 23.334 23.334 19.1553 23.334 14.0007C23.334 8.84599 19.1553 4.66732 14.0007 4.66732C8.84599 4.66732 4.66732 8.84599 4.66732 14.0007C4.66732 19.1553 8.84599 23.334 14.0007 23.334ZM12.834 17.5007H15.1673V19.834H12.834V17.5007ZM12.834 8.16732H15.1673V15.1673H12.834V8.16732Z"
      fill="#FF3263"
    />
  </svg>
);

const Title = styled.div`
  color: ${({ theme }) => theme.color.text};
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.2px;
  margin-top: 17px;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.color.sub2};
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: -0.14px;
  margin-top: 12px;
`;

const Selection = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 18px;
`;

const Btn = styled.button<{ $agree: boolean }>`
  width: 80px;
  height: 33px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid
    ${({ $agree, theme }) => ($agree ? theme.color.link : '#FF3263')};
  color: ${({ $agree, theme }) => ($agree ? theme.color.link : '#FF3263')};
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    border: 2px solid
      ${({ $agree, theme }) => ($agree ? theme.color.link : '#FF3263')};
  }
`;
