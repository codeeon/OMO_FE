import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';

interface Props {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<string | undefined, unknown>>;
  toggleDropdownHandler: (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) => void;
}

const MenuHeader: React.FC<Props> = ({ refetch, toggleDropdownHandler }) => {
  const onClickCurrentLocationHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    refetch();
    toggleDropdownHandler(e);
  };
  return (
    <>
      <Header
        variants={itemVariants}
        onClick={(e) => onClickCurrentLocationHandler(e)}
      >
        <FaLocationCrosshairs />
        <span>현재 위치에서 보기</span>
      </Header>
    </>
  );
};

export default MenuHeader;

const Header = styled(motion.div)`
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  padding: 15px;

  display: flex;
  justify-content: start;
  align-items: center;
  gap: 3px;
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;

  span {
    margin-top: 3px;
    font-size: 14px;
    font-weight: 700;
  }

  &:hover {
    color: #f97393;
  }
  transition: color 200ms ease-in-out;
`;

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};
