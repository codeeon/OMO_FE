import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../styles/Motion';
import styled from 'styled-components';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import useDeleteRepleMutation from '../../hooks/reactQuery/replies/useDeleteRepleMutation';
import useDeleteCommentMutation from '../../hooks/reactQuery/comment/useDeleteCommentMutation';

interface Props {
  commentId: number;
  contentId: number;
  replyId?: number;
}

const Dropdown: React.FC<Props> = ({ commentId, contentId, replyId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { deleteMutate: repleDeleteMutate } = useDeleteRepleMutation({
    contentId,
  });
  const { deleteMutate: commentDeleteMutate } = useDeleteCommentMutation({
    contentId,
  });

  const deleteRepleHandler = () => {
    replyId && repleDeleteMutate({ contentId, commentId, replyId });
    !replyId && commentDeleteMutate({ contentId, commentId });

    setIsOpen(false);
  };

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

  return (
    <NavContainer
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      ref={dropdownRef}
    >
      <DropdownBtn whileTap={{ scale: 0.97 }} onClick={toggleDropdownHandler}>
        <BtnWrapper
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.1 }}
          style={{ originY: 0.55 }}
        >
          <IoEllipsisHorizontalSharp style={{ marginTop: '4px' }} />
        </BtnWrapper>
      </DropdownBtn>
      <DropdownList
        variants={{
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
        }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <DropdownItem
          variants={itemVariants}
          onClick={deleteRepleHandler}
          style={{ color: 'red' }}
        >
          삭제하기
        </DropdownItem>
      </DropdownList>
    </NavContainer>
  );
};

export default Dropdown;

const NavContainer = styled(motion.nav)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  height: 30px;
  position: relative;
`;

const DropdownBtn = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  width: 30px;
  height: 30px;
  padding: 10px 15px;
  background: ${({ theme }) => theme.color.bg};
  color: ${({ theme }) => theme.color.text};
  border-radius: 41px;
  border: none;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }
`;

const BtnWrapper = styled(motion.div)``;

const DropdownList = styled(motion.div)`
  box-sizing: border-box;

  position: absolute;
  top: 30px;

  background: ${({ theme }) => theme.color.cardBg};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 98px;
  height: 50px;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  z-index: 99;

  border: 1px solid ${({ theme }) => theme.color.cardBorder};
  border-radius: 12px;
`;

const DropdownItem = styled(motion.div)`
  padding: 15px 20px;
  color: #000;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }
  border-radius: 12px;
`;
