import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  width?: string;
  onClick: () => void;
}

const DropdownItem: React.FC<Props> = ({ children, width, onClick }) => {
  return (
    <Item variants={itemVariants} $width={width} onClick={onClick}>
      {children}
    </Item>
  );
};

export default DropdownItem;

const Item = styled(motion.div)<{ $width?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
  color: #000;
  font-size: 14px;
  font-weight: 700;
  width: ${({ $width }) => ($width ? $width : '50%')};
  height: 30px;

  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }
  &:first-child {
    border-radius: 10px 10px 0 0;
  }
  &:last-child {
    border-radius: 0 0 10px 10px;
  }
`;

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};
