import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { FaRegUser } from 'react-icons/fa6';

const UserDropdown = () => {
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
      <FaRegUser />
      <List isOpen={isOpen} ref={dropdownRef}>
        <Item>내 정보</Item>
        <Item color="red">로그아웃</Item>
      </List>
    </Base>
  );
};

export default UserDropdown;

const Base = styled.div`
  margin-left: auto;

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
    color: #7b7b7b;
  }
  cursor: pointer;
  position: relative;
  background: #fff;
  transition: all 300ms ease-in-out;
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

  width: 70px;
  height: auto;

  padding: 5px 13px;

  border-radius: 8px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

  background: #fff;
  z-index: 100;
  animation: ${FadeIn} 300ms ease-in-out;
`;

const Item = styled.div<{ color?: string }>`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 80px;
  height: 25px;
  border-radius: 5px;

  font-size: 16px;
  font-weight: 700;
  color: ${({ color }) => (color === 'red' ? '#FF3263' : 'black')};

  transition: all 300ms ease-in-out;
  animation: ${FadeIn} 300ms ease-in-out;

  cursor: pointer;
  &:hover {
    background: #f2f4f7;
  }
`;
