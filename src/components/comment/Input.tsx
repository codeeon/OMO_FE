import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../share/Button';
import usePostCommentMutation from '../../hooks/reactQuery/comment/usePostCommentMutation';

const CommentInput: React.FC<{ contentId: number | undefined }> = ({
  contentId,
}) => {
  const [text, setText] = useState<string>('');
  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const { postMutate, isPostLoading } = usePostCommentMutation();

  const postCommentHandler = () => {
    const newComment = {
      PostId: contentId,
      content: text,
    };
    postMutate({ contentId, newComment });
    setText('');
  };

  return (
    <Base>
      <TextArea
        placeholder="여기에 댓글을 입력해주세요."
        value={text}
        onChange={(e) => onChangeText(e)}
      />
      <Button theme="gray" padding="5px 10px" onClick={postCommentHandler}>
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

  margin-top: 20px;
`;

const TextArea = styled.textarea`
  width: calc(100% - 40px);
  height: 90px;
  resize: none;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text};
  margin-bottom: 10px;
  padding: 20px;
  &::placeholder {
    color: #a5a5a5;
    font-size: 14px;
    font-weight: 700;
  }
  outline: none;
`;
