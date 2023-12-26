import React from 'react';
import styled from 'styled-components';

import DetailModalDropdown from './ModalDropdown';
import { PostDetailType } from '../../model/interface';

const ModalHeader: React.FC<{
  userId: string;
  userProfile: string;
  createdAt: string;
  contentId: number | undefined;
  closeModalHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  post: PostDetailType;
}> = ({
  userProfile,
  userId,
  createdAt,
  contentId,
  closeModalHandler,
  post,
}) => {
  return (
    <Base>
      <UserProfile userProfile={userProfile} />
      <UserInfoContainer>
        <UserName>{userId}</UserName>
        <CreationDate>{createdAt.split('T')[0]}</CreationDate>
      </UserInfoContainer>
      <DetailModalDropdown
        contentId={contentId}
        closeModalHandler={closeModalHandler}
        post={post}
      />
    </Base>
  );
};

export default ModalHeader;

const Base = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 15px;
  width: 100%;
`;

const UserProfile = styled.div<{ userProfile: string }>`
  background-image: ${({ userProfile }) => `url(${userProfile})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 50px;
  height: 50px;
  border: 2px solid ${({ theme }) => theme.color.border};
  border-radius: 100%;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 8px;
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.16px;
  color: ${({ theme }) => theme.color.text};
`;

const CreationDate = styled.div`
  font-size: 16px;
  font-weight: 500x;
  letter-spacing: -0.16px;
  color: ${({ theme }) => theme.color.sub};
`;
