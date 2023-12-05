import React from 'react';
import styled from 'styled-components';
import Button from '../share/Button';

const CommentInput = () => {
  return (
    <Base>
      <TextArea placeholder="여기에 댓글을 입력해주세요." />
      <Button theme="gray" padding="9px 14px">
        댓글등록
      </Button>
    </Base>
  );
};

export default CommentInput;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;

  width: 100%;
`;

const TextArea = styled.textarea`
  width: calc(100% - 40px);
  height: 90px;
  resize: none;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  margin-bottom: 10px;
  padding: 20px;
  &::placeholder {
    color: #a5a5a5;
    font-size: 14px;
    font-weight: 700;
  }
`;
