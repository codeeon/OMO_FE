import React from 'react';
import styled from 'styled-components';
import { RepleType } from '../../model/interface';
import Dropdown from './Dropdown';

//TODO 유저 데이터
const RepleItem: React.FC<{
  reple: RepleType;
  contentId: number;
  commentId: number;
}> = ({ reple, contentId, commentId }) => {
  const { replyId, content, createdAt, User } = reple;
  const currentUserId = Number(window.sessionStorage.getItem('userId'));

  return (
    <Base>
      <UserProfile $imgUrl={User.imgUrl} />
      <BodyContainer>
        <UserInfoContainer>
          <UserName>{User.nickname}</UserName>
          <CreateAt>{createdAt.split('T')[0]}</CreateAt>
          {User.userId === currentUserId && (
            <Dropdown
              commentId={commentId}
              replyId={replyId}
              contentId={contentId}
            />
          )}
        </UserInfoContainer>
        <CommentText>{content}</CommentText>
      </BodyContainer>
    </Base>
  );
};

export default RepleItem;

const Base = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  &:first-child {
    margin-top: 20px;
  }
`;

const UserProfile = styled.div<{ $imgUrl: string }>`
  background-image: ${({ $imgUrl }) => `url('${$imgUrl}')`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 50px;
  height: 50px;
  border: 2px solid ${({ theme }) => theme.color.border};
  border-radius: 100%;
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
`;

const CreateAt = styled.div`
  color: ${({ theme }) => theme.color.sub};
  font-size: 16px;
  font-weight: 500;
`;

const CommentText = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-size: 16px;
  font-weight: 500;
  line-height: 155%; /* 24.8px */
  letter-spacing: -0.16px;
  outline: none;
  border: none;
  height: 18px;
`;
