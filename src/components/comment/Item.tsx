import React from 'react';
import styled from 'styled-components';
import { CommentType } from '../../model/interface';
import Dropdown from './Dropdown';

//TODO 유저 데이터
const CommentItem: React.FC<{
  comment: CommentType;
  contentId: number;
}> = ({ comment, contentId }) => {
  const { commentId, content, createdAt, User } = comment;
  
  return (
    <Base>
      <UserProfile profileImg={User.imgUrl} />
      <BodyContainer>
        <UserInfoContainer>
          <UserName>{User.nickname}</UserName>
          <CreateAt>{createdAt.split('T')[0]}</CreateAt>
          <Dropdown commentId={commentId} contentId={contentId} />
        </UserInfoContainer>
        <CommentText>{content}</CommentText>
      </BodyContainer>
    </Base>
  );
};

export default CommentItem;

const Base = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  &:first-child {
    margin-top: 20px;
  }
`;

const UserProfile = styled.div<{ profileImg: string }>`
  background-image: ${({ profileImg }) => `url('${profileImg}')`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 50px;
  height: 50px;
  background: #d9d9d9;
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

const EllipsisBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  color: #a5a5a5;
  font-size: 25px;
`;

const BtnWrapper = styled.div`
  margin-left: auto;
`;
