import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SearchIcon } from '../../../assets/icons/SearchIcon';
import Result from './Result';
import useInput from '../../../hooks/useInput';
import Dropdown from '../../share/dropdown/Dropdown';
import DropdownItem from '../../share/dropdown/DropdownItem';
import useUserSearchQuery from '../../../hooks/reactQuery/search/useUserSearchQuery';
import _ from 'lodash';
import useStoreSearchQuery from '../../../hooks/reactQuery/search/useStoreSearchQuery';
import useDebounce from '../../../hooks/useDebounce';
import { FaCaretDown } from 'react-icons/fa6';
const Search = () => {
  const [isSearching, setIsSearching] = useState(false);
  const { value, changeValueHandler, clearValueHandler } = useInput();
  const [searchType, setSearchType] = useState<string>('닉네임');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceSearch = useDebounce(value, 500);

  const searchRef = useRef<HTMLDivElement | null>(null);

  const { data: userSearchResults, error: userSearchError } =
    useUserSearchQuery(debounceSearch, searchType, setIsLoading);

  const { data: storeSearchResults, error: storeSearchError } =
    useStoreSearchQuery(debounceSearch, searchType, setIsLoading);

  const onSearchHandler = () => {
    setIsSearching(true);
  };

  const setSearchHander = (type: string) => {
    setSearchType(type);
    setIsDropdownOpen(false);
    clearValueHandler();
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeValueHandler(e);
    setIsLoading(true);
  };

  useEffect(() => {
    value === '' && setIsLoading(false);
  }, [value]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        isSearching &&
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setIsSearching(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isSearching]);

  return (
    <Base $isFocused={isSearching} ref={searchRef}>
      <Dropdown
        title={searchType}
        titleWidth="80px"
        titleHeight="35px"
        width="85px"
        height="95px"
        top="37px"
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        setIsSearching={setIsSearching}
        buttonIcon={
          <FaCaretDown style={{ color: '#f97393', margin: '5px 0 0 3px' }} />
        }
      >
        <DropdownItem width="50%" onClick={() => setSearchHander('닉네임')}>
          닉네임
        </DropdownItem>
        <DropdownItem width="50%" onClick={() => setSearchHander('게시물')}>
          게시물
        </DropdownItem>
      </Dropdown>
      <VerticalBar />
      <Input
        $isFocused={isSearching}
        value={value}
        onChange={(e) => onChangeSearch(e)}
        onFocus={onSearchHandler}
      />
      <SearchIcon />
      <Result
        isLoading={isLoading}
        value={value}
        isSearching={isSearching}
        searchType={searchType}
        userSearchResults={userSearchResults}
        storeSearchResults={storeSearchResults}
        userSearchError={userSearchError}
        storeSearchError={storeSearchError}
        setIsSearching={setIsSearching}
      />
    </Base>
  );
};

export default Search;

const Base = styled.div<{ $isFocused: boolean }>`
  margin-left: 24px;

  box-sizing: border-box;

  width: ${({ $isFocused }) => ($isFocused ? '650px' : '320px')};
  height: 40px;

  background-color: ${({ theme }) => theme.color.cardBg};

  border: 1px solid
    ${({ $isFocused, theme }) =>
      $isFocused ? theme.color.link : theme.color.border};
  border-radius: 20px;

  display: flex;
  justify-content: start;
  align-items: center;

  transition: all 300ms ease;

  position: relative;
`;

const Input = styled.input<{ $isFocused: boolean }>`
  box-sizing: border-box;
  width: ${({ $isFocused }) => ($isFocused ? '525px' : '200px')};

  font-size: 14px;

  border: none;
  outline: none;
  transition: width 300ms ease;
  padding: 0 15px;

  color: ${({ theme }) => theme.color.text};
  background: none;
`;

const VerticalBar = styled.div`
  border-right: 1.5px solid ${({ theme }) => theme.color.border};
  width: 1px;
  height: 20px;
`;
