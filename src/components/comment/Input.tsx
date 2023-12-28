import React, { useId, useState } from 'react';
import styled from 'styled-components';
import Button from '../share/Button';
import { getToday } from '../../function/getToday';
import usePostCommentMutation from '../../hooks/reactQuery/comment/usePostCommentMutation';
import axios from 'axios';
import AlertModal from '../Modal/AlertModal';
import useAlertModalCtr from '../../hooks/useAlertModalCtr';
import CommentSuccess from '../share/alert/CommentSuccess';
import CommentError from '../share/alert/CommentError';

const CommentInput: React.FC<{ contentId: number | undefined }> = ({
  contentId,
}) => {
  const [text, setText] = useState<string>('');
  const {
    isModalOpen: successAlertOpen,
    handleModalOpen: handleSuccessAlertOpen,
    handleModalClose: handleSuccessAlertClose,
  } = useAlertModalCtr();

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const { postMutate, isPostLoading, isPostError, isPostSuccess } =
    usePostCommentMutation({ contentId, handleSuccessAlertOpen });

  const postCommentHandler = () => {
    const userId = localStorage.getItem('userId');

    const newComment = {
      PostId: contentId,
      UserId: userId,
      content: text,
      createdAt: getToday(),
    };
    postMutate({ contentId, newComment });
    setText('');
  };

  return (
    <>
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
      <AlertModal
        isOpen={successAlertOpen}
        onClose={handleSuccessAlertClose}
        position="topRight"
      >
        {isPostSuccess ? <CommentSuccess /> : <CommentError />}
      </AlertModal>
    </>
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

const TextArea = styled.textarea`
  width: calc(100% - 40px);
  height: 60px;
  resize: none;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text};
  margin-bottom: 10px;
  padding: 20px;
  font-size: 16px;
  font-weight: 500;
  &::placeholder {
    color: #a5a5a5;
    font-size: 16px;
    font-weight: 500;
    font-family: 'Wanted Sans Variable';
  }
  font-family: 'Wanted Sans Variable';
  outline: none;
`;
