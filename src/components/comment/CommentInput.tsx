import React, { useId, useState } from 'react';
import styled from 'styled-components';
import Button from '../share/Button';
import useInput from '../../hooks/useInput';
import { getToday } from '../../function/getToday';
import { useMutation, useQueryClient } from 'react-query';
import { postComment } from '../../apis/apis';
import { CommentType } from '../../model/interface';

const CommentInput: React.FC<{ contentId: number | undefined }> = ({
  contentId,
}) => {
  const [text, setText] = useState<string>('');
  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation<void, unknown, CommentType>(postComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
  });

  const postCommentHandler = () => {
    const newComment = {
      postId: contentId,
      userName: '철', // TODO 유저와 연결
      text: text,
      createdAt: getToday(),
      updatedAt: getToday(),
    };

    mutation.mutate(newComment); // Use `mutate` function here
    setText('');
  };

  return (
    <Base>
      <TextArea
        placeholder="여기에 댓글을 입력해주세요."
        value={text}
        onChange={(e) => onChangeText(e)}
      />
      <Button theme="gray" padding="9px 14px" onClick={postCommentHandler}>
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
  border: 1px solid #d9d9d9;
  margin-bottom: 10px;
  padding: 20px;
  &::placeholder {
    color: #a5a5a5;
    font-size: 14px;
    font-weight: 700;
  }
  outline: none;
`;
