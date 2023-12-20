import React from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import { itemVariants } from '../../../../styles/Motion';

interface Props {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<string | undefined, unknown>>;
}

const MenuHeader: React.FC<Props> = ({ refetch }) => {
  return (
    <Header variants={itemVariants} onClick={() => refetch()}>
      <FaLocationCrosshairs />
      <span>현재 위치에서 보기</span>
    </Header>
  );
};

export default MenuHeader;

const Header = styled(motion.div)`
  border-bottom: 1px solid #d9d9d9;
  padding: 15px;

  display: flex;
  justify-content: start;
  align-items: center;
  gap: 3px;
  color: #000;
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
