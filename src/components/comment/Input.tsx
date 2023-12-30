import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../share/Button';
import { getToday } from '../../function/getToday';
import usePostCommentMutation from '../../hooks/reactQuery/comment/usePostCommentMutation';
import CommentTextArea from '../textarea/CommentTextArea';
import useInput from '../../hooks/useInput';
import toast from 'react-hot-toast';

const CommentInput: React.FC<{ contentId: number | undefined }> = ({
  contentId,
}) => {
  const { value: text, changeValueHandler, clearValueHandler } = useInput();
  const [isTextareaFocus, setIsTextareaFoucs] = useState<boolean>(false);

  const onTextAreaFocus = () => {
    setIsTextareaFoucs(true);
  };
  const offTextAreaFocus = () => {
    setIsTextareaFoucs(false);
  };

  const { postMutate, isPostLoading } = usePostCommentMutation({
    contentId,
  });

  const postCommentHandler = () => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      return toast.error('댓글 내용을 입력해주세요!', {
        position: 'top-right',
        duration: 4000,
        style: { fontSize: '14px' },
      });
    }
    if (trimmedText.length < 2 || trimmedText.length > 2000) {
      return toast.error('댓글은 2글자 이상 2000글자 미만으로 작성해주세요.', {
        position: 'top-right',
        duration: 4000,
        style: { fontSize: '14px' },
      });
    }
    const userId = sessionStorage.getItem('userId');

    const newComment = {
      PostId: contentId,
      UserId: userId,
      content: text,
      createdAt: getToday(),
    };
    postMutate({ contentId, newComment });
    clearValueHandler();
  };

  return (
    <Base>
      <CommentTextArea
        placeholder="여기에 댓글을 입력해주세요."
        value={text}
        onChange={(e) => changeValueHandler(e)}
        onFocus={onTextAreaFocus}
        onBlur={offTextAreaFocus}
        isTextareaFocus={isTextareaFocus}
      />
      <Button
        theme="gray"
        padding="9px 14px"
        width="50px"
        height="15px"
        fontSize="14px"
        onClick={postCommentHandler}
        disabled={isPostLoading}
      >
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
  margin-bottom: 40px;
`;
