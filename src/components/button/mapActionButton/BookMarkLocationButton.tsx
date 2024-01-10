import React from 'react';
import styled from 'styled-components';
import { BookmarkIcon } from '../../../assets/icons/BookMark';
import useBookMarkPlaceStore from '../../../store/location/bookMarkPlaceStore';
import toast from 'react-hot-toast';

const BookMarkLocationButton = () => {
  const currentUser = sessionStorage.getItem('userId');

  const { isShowBookMarkPlace, toggleBookmarkDisplay } =
    useBookMarkPlaceStore();

  const onClickBtnHandler = () => {
    if (!currentUser) {
      toast.error('로그인 후 이용해주세요.', {
        position: 'bottom-right',
        duration: 4000,
      });
      return;
    }
    toggleBookmarkDisplay();
  };

  return (
    <BtnWrapper
      $isShowBookMarkPlace={isShowBookMarkPlace}
      onClick={onClickBtnHandler}
    >
      <BookmarkIcon isShowBookMarkPlace={isShowBookMarkPlace} />
    </BtnWrapper>
  );
};

export default BookMarkLocationButton;

const BtnWrapper = styled.div<{ $isShowBookMarkPlace: boolean }>`
  z-index: 3;
  position: absolute;
  right: 45px;
  top: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.color.sub};
  font-size: 26px;
  background: ${({ theme }) => theme.color.bg};
  border: 1px solid
    ${({ $isShowBookMarkPlace, theme }) =>
      $isShowBookMarkPlace ? theme.color.primary : theme.color.sub};
  border-radius: 15px;

  width: 40px;
  height: 40px;

  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }

  cursor: pointer;
`;
