import React from 'react';
import styled from 'styled-components';
import { BookmarkIcon } from '../../../assets/icons/BookMark';

interface Props {
  ToggleBookMarker: () => void;
}

const BookmarkButton: React.FC<Props> = ({ ToggleBookMarker }) => {
  return (
    <BtnWrapper onClick={ToggleBookMarker}>
      <BookmarkIcon />
    </BtnWrapper>
  );
};

export default BookmarkButton;

const BtnWrapper = styled.div`
  z-index: 3;
  position: absolute;
  right: 45px;
  bottom: 175px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #b1b1b1;
  font-size: 26px;
  background: ${({ theme }) => theme.color.bg};
  border: 1px solid ${({ theme }) => theme.color.border2};
  border-radius: 8px;

  width: 40px;
  height: 40px;

  &:hover {
    font-size: 28px;
    background: #d9d9d9;
  }

  cursor: pointer;
`;
