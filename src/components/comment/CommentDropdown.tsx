import React, {
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled, { keyframes } from 'styled-components';
import { FaEllipsis } from 'react-icons/fa6';
import Button from '../share/Button';

interface Props {
  onClickdeleteComment: () => void;
}

const CommentDropdown: React.FC<Props> = ({ onClickdeleteComment }) => {
  const [isOpen, setIsDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const openDropdown = () => {
    setIsDropdown(true);
  };

  useEffect(() => {
    const onClickOutSide = (e: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdown(false);
      }
    };
    document.addEventListener('mousedown', onClickOutSide);
    return () => {
      document.removeEventListener('mousedown', onClickOutSide);
    };
  }, [isOpen]);

  return (
    <Base onClick={openDropdown}>
      <FaEllipsis />
      <List isOpen={isOpen} ref={dropdownRef}>
        <Item onClick={onClickdeleteComment} color="red">
          삭제하기
        </Item>
      </List>
    </Base>
  );
};

export default CommentDropdown;

const Base = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 100%;
  width: 15px;
  height: 15px;
  &:hover {
    background: #e6e6e6;
  }
  svg {
    font-size: 24px;
  }
  cursor: pointer;
  position: relative;
  background: #fff;
`;

const FadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform:translateY(0);
  };
  
`;

const List = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 50px;

  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: auto;
  border-radius: 8px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  padding: 0px 7px;
  background: #fff;
  z-index: 100;
`;

const Item = styled.div<{ color?: string }>`
  padding: 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => color};
  width: 93%;
  height: 46px;
  &:hover {
    background: #f2f4f7;
  }
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background 300ms ease-in-out;
  animation: ${FadeIn} 300ms ease-in-out;
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;
