import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../styles/Motion';
import styled from 'styled-components';
import { FaCaretDown } from 'react-icons/fa';

interface Props {
  category: string;
  setCategory: React.Dispatch<SetStateAction<string>>;
}

const CategoryDropdown: React.FC<Props> = ({ category, setCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdownHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isOpen]);

  const setCategoryHandler = (category: string) => {
    setCategory(category);
  };

  return (
    <NavContainer
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      ref={dropdownRef}
    >
      <DropdownBtn whileTap={{ scale: 0.97 }} onClick={toggleDropdownHandler}>
        <span>{category}</span>

        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
        >
          <FaCaretDown style={{ color: '#f97393', margin: '3px 0 0 2px' }} />
        </motion.div>
      </DropdownBtn>
      <DropdownList
        variants={{
          open: {
            clipPath: 'inset(0% 0% 0% 0% round 10px)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: 'inset(10% 70% 90% 30% round 10px)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <DropdownItem
          variants={itemVariants}
          style={{ color: 'red' }}
          onClick={() => setCategoryHandler('전체')}
        >
          전체
        </DropdownItem>
        <DropdownItem
          variants={itemVariants}
          onClick={() => setCategoryHandler('음식점')}
        >
          음식점
        </DropdownItem>
        <DropdownItem
          variants={itemVariants}
          onClick={() => setCategoryHandler('카페')}
        >
          카페
        </DropdownItem>
        <DropdownItem
          variants={itemVariants}
          onClick={() => setCategoryHandler('기타')}
        >
          기타
        </DropdownItem>
      </DropdownList>
    </NavContainer>
  );
};

export default CategoryDropdown;

const NavContainer = styled(motion.nav)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  position: relative;
`;

const DropdownBtn = styled(motion.button)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 2px;
  width: 95px;
  height: 40px;
  padding: 10px 15px;

  border-radius: 41px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  background: ${({ theme }) => theme.color.locBg};

  span {
    color: ${({ theme }) => theme.color.locText};
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
  cursor: pointer;
`;

const DropdownList = styled(motion.div)<{ width?: string; height?: string }>`
  box-sizing: border-box;

  position: absolute;
  top: 40px;
  left: 0;

  background: ${({ theme }) => theme.color.cardBg};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 110px;
  height: 180px;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  z-index: 99;

  border: 1px solid ${({ theme }) => theme.color.cardBorder};
  border-radius: 12px;
`;

const DropdownItem = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px 20px;
  color: ${({ theme }) => theme.color.text};
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }
  border-radius: 12px;
`;
