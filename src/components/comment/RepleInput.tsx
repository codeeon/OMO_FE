import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../share/Button';
import { getToday } from '../../function/getToday';
import AlertModal from '../Modal/AlertModal';
import useAlertModalCtr from '../../hooks/useAlertModalCtr';
import CommentSuccess from '../share/alert/CommentSuccess';
import CommentError from '../share/alert/CommentError';
import usePostRepleMutation from '../../hooks/reactQuery/replies/usePostRepleMutation';

interface Props {
  postId: number | undefined;
  commentId: number | undefined;
  toggleRepleInputHandler: () => void;
}

const RepleInput: React.FC<Props> = ({
  postId,
  commentId,
  toggleRepleInputHandler,
}) => {
  const [text, setText] = useState<string>('');
  const { isModalOpen, handleModalOpen, handleModalClose } = useAlertModalCtr();

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const { postMutate, isPostLoading, isPostError, isPostSuccess } =
    usePostRepleMutation({ postId, commentId, handleModalOpen });

  // TODO 토큰 문제
  const postCommentHandler = () => {
    const newComment = {
      PostId: postId,
      UserId: 3, // TODO 유저와 연결
      content: text,
      createdAt: getToday(),
    };
    postMutate({ postId, commentId, newComment });
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
        <ButtonConatiner>
          <Button
            theme="gray"
            padding="5px 10px"
            onClick={toggleRepleInputHandler}
          >
            취소
          </Button>
          <Button theme="gray" padding="5px 10px" onClick={postCommentHandler}>
            댓글등록
          </Button>
        </ButtonConatiner>
      </Base>
      <AlertModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        position="topRight"
        isError={isPostError}
      >
        {isPostSuccess ? <CommentSuccess /> : <CommentError />}
      </AlertModal>
    </>
  );
};

export default RepleInput;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;

  width: 100%;

  margin-top: 20px;
`;

const ButtonConatiner = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
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
