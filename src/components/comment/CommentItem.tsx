import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { CommentTypeNew } from '../../model/interface';
import Dropdown from './Dropdown';
import RepleItem from './RepleItem';
import RepleInput from './RepleInput';
import { useNavigate } from 'react-router-dom';
import useGetRepleQuery from '../../hooks/reactQuery/replies/useGetRepleQuery';
import { motion } from 'framer-motion';

//TODO 유저 데이터
const CommentItem: React.FC<{
  comment: CommentTypeNew;
  postId: number;
  delay: number;
}> = ({ comment, postId, delay }) => {
  const { commentId, content, createdAt, User } = comment;
  const { data: repliesData } = useGetRepleQuery(postId, commentId);

  const navigate = useNavigate();

  const [isShowReple, setIsShowReple] = useState(false);
  const [isShowRepleInput, setIsShowRepleInput] = useState(false);

  const currentUserId = Number(window.sessionStorage.getItem('userId'));

  const toggleRepleHandler = useCallback(() => {
    setIsShowReple(!isShowReple);
  }, [isShowReple]);

  const toggleRepleInputHandler = useCallback(() => {
    setIsShowRepleInput(!isShowRepleInput);
  }, [isShowRepleInput]);

  const getRepleHandler = () => {
    toggleRepleHandler();
  };

  const onClickMoveUserPage = () => {
    navigate(`/userpage/${User.nickname}`);
  };

  return (
    <Base
      initial={{ scale: 1, opacity: 0, y: 100 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.2 }}
    >
      <UserProfile $profileImg={User.imgUrl} onClick={onClickMoveUserPage} />
      <BodyContainer>
        <UserInfoContainer>
          <UserName onClick={onClickMoveUserPage}>{User.nickname}</UserName>
          <CreateAt>{createdAt.split('T')[0]}</CreateAt>
          {currentUserId === User.userId && (
            <Dropdown commentId={commentId} contentId={postId} />
          )}
        </UserInfoContainer>
        <CommentText>{content}</CommentText>
        {repliesData?.length !== 0 ? (
          <>
            {isShowReple ? (
              !isShowRepleInput && (
                <RepleBtn onClick={toggleRepleInputHandler}>답글 달기</RepleBtn>
              )
            ) : (
              <RepleBtn onClick={getRepleHandler}>
                <span>{repliesData?.length}개의 답글 보기</span>
              </RepleBtn>
            )}

            {isShowReple && (
              <>
                {repliesData?.map((reple) => (
                  <RepleItem
                    key={reple.replyId}
                    reple={reple}
                    postId={postId}
                    commentId={commentId}
                  />
                ))}
                <RepleBtn $marginLeft="60px" onClick={toggleRepleHandler}>
                  답글 숨기기
                </RepleBtn>
                {isShowRepleInput && (
                  <RepleInput
                    postId={postId}
                    commentId={commentId}
                    toggleRepleInputHandler={toggleRepleInputHandler}
                  />
                )}
              </>
            )}
          </>
        ) : (
          <>
            {isShowRepleInput ? (
              <RepleInput
                postId={postId}
                commentId={commentId}
                toggleRepleInputHandler={toggleRepleInputHandler}
              />
            ) : (
              <RepleBtn onClick={toggleRepleInputHandler}>답글 달기</RepleBtn>
            )}
          </>
        )}
      </BodyContainer>
    </Base>
  );
};

export default CommentItem;

const Base = styled(motion.li)<{ $delay: string }>`
  display: flex;
  justify-content: start;
  align-items: start;
  width: 100%;
  &:first-child {
    margin-top: 20px;
  }
`;

const UserProfile = styled.div<{ $profileImg: string }>`
  background-image: ${({ $profileImg }) => `url(${$profileImg})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 50px;
  height: 50px;
  border: 2px solid ${({ theme }) => theme.color.border};
  border-radius: 100%;
  cursor: pointer;
`;

const BodyContainer = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 9px;
  width: 90%;
`;

const UserInfoContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 16px;
  gap: 6px;
`;

const UserName = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

const CreateAt = styled.div`
  color: ${({ theme }) => theme.color.sub};
  font-size: 16px;
  font-weight: 500;
`;

const CommentText = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  color: ${({ theme }) => theme.color.text};
  font-size: 16px;
  font-weight: 500;
  line-height: 155%; /* 24.8px */
  letter-spacing: -0.16px;
  outline: none;
  border: none;
  height: auto;
  max-width: 550px;
  width: 550px;
  word-break: break-all;
`;

const RepleBtn = styled.div<{ $marginLeft?: string }>`
  margin-top: 8px;
  margin-left: ${({ $marginLeft }) => ($marginLeft ? $marginLeft : null)};
  color: ${({ theme }) => theme.color.sub2};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.14px;
  &:hover {
    color: ${({ theme }) => theme.color.text};
    font-weight: 700;
  }
  cursor: pointer;
  transition: all 300ms ease;
`;
