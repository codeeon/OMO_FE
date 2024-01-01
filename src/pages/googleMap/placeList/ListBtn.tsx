import React from 'react';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
interface Props {
  isListOpen: boolean;
  onClickListBtn: () => void;
}

const ListBtn: React.FC<Props> = ({ isListOpen, onClickListBtn }) => {
  return (
    <IconWrapper $isListOpen={isListOpen} onClick={onClickListBtn}>
      <IoIosArrowForward />
    </IconWrapper>
  );
};

export default ListBtn;

const IconWrapper = styled.div<{ $isListOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: ${({ $isListOpen }) => ($isListOpen ? 'rotate(180deg)' : null)};
  transition: all 200ms ease-in-out;
  color: ${({ theme }) => theme.color.border};
  width: 100%;
  height: 100%;
`;
