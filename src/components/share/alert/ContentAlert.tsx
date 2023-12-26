import React from 'react';
import { HashLoader, ScaleLoader } from 'react-spinners';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';
import { PiWarningCircleFill } from 'react-icons/pi';

interface Props {
  isPostContentLoading: boolean;
  isPostContentError: boolean;
  isPostContentSuccess: boolean;
}

const ContentAlert: React.FC<Props> = ({
  isPostContentLoading,
  isPostContentError,
  isPostContentSuccess,
}) => {
  return (
    <>
      {isPostContentLoading ? (
        <Base>
          <Wrapper>
            <HashLoader color="gray" size={20} />
            <span>게시글 업로드 중입니다.</span>
          </Wrapper>
        </Base>
      ) : isPostContentError ? (
        <Base bg="#F97393">
          <Wrapper>
            <PiWarningCircleFill />
            <span>로그인 후 이용해주세요.</span>
          </Wrapper>
        </Base>
      ) : (
        <Base>
          <Wrapper>
            <FaCheckCircle />
            <span>게시물이 성공적으로 업로드 되었습니다!</span>
          </Wrapper>
        </Base>
      )}
    </>
  );
};

export default ContentAlert;

const Base = styled.div<{ bg?: string }>`
  box-sizing: border-box;
  width: auto;
  height: 50px;
  background: ${({ theme, bg }) => (bg ? bg : theme.color.text)};
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
    color: ${({ theme }) => theme.color.bg};
  }
  span {
    color: ${({ theme }) => theme.color.bg};
  }
  width: 241px;
  gap: 10px;
`;
