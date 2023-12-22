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
  // const {
  //   isModalOpen: ErrorAlertOpen,
  //   handleModalOpen: handleErrorAlertOpen,
  //   handleModalClose: handleErrorsAlertOpen,
  // } = useAlertModalCtr();
  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const { postMutate, isPostLoading, isPostError, isPostSuccess } =
    usePostCommentMutation({ contentId, handleSuccessAlertOpen });

  // TODO 토큰 문제
  const postCommentHandler = () => {
    const newComment = {
      PostId: contentId,
      UserId: 3, // TODO 유저와 연결
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
      <AlertModal isOpen={successAlertOpen} onClose={handleSuccessAlertClose}>
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
