import React from 'react';
import styled from 'styled-components';
import { UserSearchType } from '../../../model/interface';
import { useNavigate } from 'react-router-dom';

interface Props {
  searchResult: UserSearchType;
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserResultItem: React.FC<Props> = ({
  searchResult,
  isSearching,
  setIsSearching,
}) => {
  const { userId, imgUrl, nickname } = searchResult;

  const moveUserProfileHandler = () => {
    setIsSearching(false);
  };


  const navigate = useNavigate();

  return (
    <Base
      onClick={() => navigate(`/userpage/${nickname}`)}
      $isSearching={isSearching}
    >
      <UserProfile src={imgUrl} />
      <UserName>{nickname}</UserName>
    </Base>
  );
};

export default UserResultItem;

const Base = styled.div<{ $isSearching: boolean }>`
  display: ${({ $isSearching }) => ($isSearching ? 'flex' : 'none')};
  justify-content: start;
  align-items: center;
  gap: 8px;

  width: 98%;

  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }
  border-radius: 16px;
  padding: 5px;
`;

const UserProfile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  object-fit: cover;
`;

const UserName = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.14px;
`;
