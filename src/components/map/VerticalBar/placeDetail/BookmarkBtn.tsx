import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiBookmark } from 'react-icons/fi';

const BookmarkBtn = () => {
  return (
    <Base>
      <Wrapper
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <FiBookmark />
        <span>북마크</span>
      </Wrapper>
    </Base>
  );
};

export default BookmarkBtn;

const Base = styled.div`
  margin: 15px auto 15px auto;
  height: 40px;
`;

const Wrapper = styled(motion.div)`
  padding: 0px 16px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: ${({ theme }) => theme.color.text};
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    margin-top: 3px;
  }
  svg {
    color: ${({ theme }) => theme.color.sub2};
    font-size: 20px;
  }
  border: 1px solid ${({ theme }) => theme.color.sub2};
  border-radius: 41px;
  cursor: pointer;
  &:hover {
    border: 2px solid #f97393;
  }
`;
