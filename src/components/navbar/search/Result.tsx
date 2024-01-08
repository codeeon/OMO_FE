import React from 'react';
import styled from 'styled-components';
import { StoreSearchType, UserSearchType } from '../../../model/interface';
import UserResultItem from './UserResultItem';
import StoreResultItem from './StoreResultItem';
import { PropagateLoader } from 'react-spinners';

interface Props {
  value: string;
  isSearching: boolean;
  searchType: string;
  userSearchResults?: UserSearchType[];
  storeSearchResults?: StoreSearchType[];
  isLoading: boolean;
  userSearchError: any;
  storeSearchError: any;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

const Result: React.FC<Props> = ({
  value,
  isSearching,
  searchType,
  userSearchResults,
  storeSearchResults,
  isLoading,
  userSearchError,
  storeSearchError,
  setIsSearching,
}) => {
  return (
    <Base $isSearching={isSearching}>
      {isLoading ? (
        <BlankContainer>
          <PropagateLoader size={5} color="#44A5FF" />
        </BlankContainer>
      ) : !value ? (
        <BlankContainer>
          유저명이나 장소명을 입력해서 검색해보세요🔍
        </BlankContainer>
      ) : searchType === '닉네임' && !userSearchResults ? (
        <BlankContainer>
          {userSearchError?.response?.data?.errorMessage as string}
        </BlankContainer>
      ) : searchType === '게시물' && !storeSearchResults ? (
        <BlankContainer>
          {storeSearchError?.response?.data?.errorMessage as string}
        </BlankContainer>
      ) : searchType === '닉네임' ? (
        userSearchResults?.map((res, idx) => (
          <UserResultItem
            key={idx}
            searchResult={res}
            isSearching={isSearching}
            setIsSearching={setIsSearching}
          />
        ))
      ) : (
        storeSearchResults?.map((res) => (
          <StoreResultItem
            key={res.postId}
            searchResult={res}
            isSearching={isSearching}
          />
        ))
      )}
    </Base>
  );
};

export default Result;

const Base = styled.div<{ $isSearching: boolean }>`
  box-sizing: border-box;
  position: absolute;
  top: 45px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 3px;

  width: ${({ $isSearching }) => ($isSearching ? '650px' : '320px')};
  min-height: 63px;
  height: auto;

  padding: 15px;

  background-color: ${({ theme }) => theme.color.searchBg};
  backdrop-filter: blur(20px);

  opacity: ${({ $isSearching }) => ($isSearching ? 'flex' : 'none')};
  display: ${({ $isSearching }) => ($isSearching ? 'flex' : 'none')};

  transition: all 300ms ease;

  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 20px;
`;

const BlankContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 63px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.color.text};
`;
