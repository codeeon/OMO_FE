import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaCaretDown } from 'react-icons/fa6';

interface Props {
  children: React.ReactNode;
  width?: string;
  height?: string;
  titleWidth?: string;
  title?: string;
  titleHeight?: string;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSearching?: React.Dispatch<React.SetStateAction<boolean>>;
  top?: string;
}

const Dropdown: React.FC<Props> = ({
  children,
  width,
  height,
  titleWidth,
  title,
  titleHeight,
  isDropdownOpen,
  setIsDropdownOpen,
  setIsSearching,
  top,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdownHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
    if (setIsSearching) {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <NavContainer
      initial={false}
      animate={isDropdownOpen ? 'open' : 'closed'}
      ref={dropdownRef}
    >
      <DropdownBtn
        whileTap={{ scale: 0.97 }}
        onClick={toggleDropdownHandler}
        $titleWidth={titleWidth}
        $titleHeight={titleHeight}
      >
        <TitleWrapper>{title}</TitleWrapper>
        <BtnWrapper
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.1 }}
          style={{ originX: 0.55 }}
        >
          <FaCaretDown style={{ color: '#f97393', margin: '5px 0 0 3px' }} />
        </BtnWrapper>
      </DropdownBtn>
      <DropdownList
        variants={DropdownListVariants}
        style={{ pointerEvents: isDropdownOpen ? 'auto' : 'none' }}
        $width={width}
        $height={height}
        $top={top}
      >
        {children}
      </DropdownList>
    </NavContainer>
  );
};

export default Dropdown;

const NavContainer = styled(motion.nav)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  position: relative;
`;

const DropdownBtn = styled(motion.button)<{
  $titleWidth?: string;
  $titleHeight?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  width: ${({ $titleWidth }) => ($titleWidth ? $titleWidth : '30px')};
  height: ${({ $titleHeight }) => ($titleHeight ? $titleHeight : '30px')};

  padding: 5px 0px 5px 10px;
  border: none;

  background: ${({ theme }) => theme.color.cardBg};
  color: ${({ theme }) => theme.color.text};
  border-radius: 30px 0 0 30px;

  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }
`;

const TitleWrapper = styled.div`
  font-size: 14px;
  font-weight: 700;
`;

const BtnWrapper = styled(motion.div)``;

const DropdownList = styled(motion.div)<{
  $width?: string;
  $height?: string;
  $top?: string;
}>`
  box-sizing: border-box;

  position: absolute;
  top: ${({ $top }) => ($top ? $top : '30px')};

  background: ${({ theme }) => theme.color.cardBg};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: ${({ $width }) => ($width ? $width : '100px')};
  height: ${({ $height }) => ($height ? $height : '50px')};

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  z-index: 99;

  border: 1px solid ${({ theme }) => theme.color.cardBorder};
  border-radius: 12px;
`;

const DropdownListVariants = {
  open: {
    clipPath: 'inset(0% 0% 0% 0% round 10px)',
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.4,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: 'inset(10% 50% 90% 50% round 10px)',
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.3,
    },
  },
};
