import React from 'react';
import styled from 'styled-components';

import DetailModalDropdown from './DetailModalDropdown';

const DetailModalHeader: React.FC<{
  userId: string;
  createdAt: string;
  contentId: number | undefined;
  closeModalHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ userId, createdAt, contentId, closeModalHandler }) => {
  return (
    <Base>
      <UserProfile />
      <UserInfoContainer>
        <UserName>{userId}</UserName>
        <CreationDate>{createdAt}</CreationDate>
      </UserInfoContainer>
      <DetailModalDropdown
        contentId={contentId}
        closeModalHandler={closeModalHandler}
      />
    </Base>
  );
};

export default DetailModalHeader;

const Base = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 15px;
  width: 100%;
`;

const UserProfile = styled.div`
  background: #d9d9d9;
  width: 50px;
  height: 50px;
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
`;

const CreationDate = styled.div`
  font-size: 16px;
  font-weight: 500x;
  letter-spacing: -0.16px;
  color: #a5a5a5;
`;
