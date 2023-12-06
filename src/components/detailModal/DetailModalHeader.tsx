import React from 'react';
import styled from 'styled-components';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import Dropdown from '../share/Dropdown';

const DetailModalHeader: React.FC<{ userId: string; createdAt: string }> = ({
  userId,
  createdAt,
}) => {
  const onClickDropdownItem = (item: string) => {
    if (item === '수정하기') {
      // TODO ContentPatch
    } else {
      // TODO ContentDelete
    }
  };
  return (
    <Base>
      <UserProfile />
      <UserInfoContainer>
        <UserName>{userId}</UserName>
        <CreationDate>{createdAt}</CreationDate>
      </UserInfoContainer>
      <EllipsisBtn>
        <Dropdown
          items={['수정하기', '삭제하기']}
          width="70px"
          onClickDropdownItem={onClickDropdownItem}
        >
          <IoEllipsisHorizontalSharp />
        </Dropdown>
      </EllipsisBtn>
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

const EllipsisBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  color: #a5a5a5;
  font-size: 25px;
`;
