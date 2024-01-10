import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  width?: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  textColor?: string;
}

const DropdownItem: React.FC<Props> = ({
  children,
  width,
  onClick,
  textColor,
}) => {
  return (
    <Item
      variants={itemVariants}
      $width={width}
      onClick={onClick}
      $textColor={textColor}
    >
      {children}
    </Item>
  );
};

export default DropdownItem;

const Item = styled(motion.div)<{ $width?: string; $textColor?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
  color: ${({ theme, $textColor }) =>
    $textColor ? $textColor : theme.color.text};
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
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
  closed: { opacity: 0, y: 0, transition: { duration: 0.1 } },
};
