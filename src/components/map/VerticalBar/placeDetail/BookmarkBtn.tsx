import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiBookmark } from 'react-icons/fi';

const BookmarkBtn = () => {
  return (
    <Base
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <FiBookmark />
      <span>북마크</span>
    </Base>
  );
};

export default BookmarkBtn;

const Base = styled(motion.div)`
  padding: 10px 16px;
  margin: 30px auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: #323232;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    margin-top: 3px;
  }
  svg {
    color: #a5a5a5;
    font-size: 20px;
  }
  border: 1px solid #d9d9d9;
  border-radius: 41px;
  cursor: pointer;
  &:hover {
    border: 2px solid #f97393;
  }
`;
