import React, { useState } from 'react';
import styled from 'styled-components';
import { CommentType } from '../../model/interface';
import { PiHeartFill } from 'react-icons/pi';
import { PiHeart } from 'react-icons/pi';
import { TbMessage } from 'react-icons/tb';
import { motion } from 'framer-motion';
import LikeBtn from './LikeBtn';

interface Props {
  likeCount: number;
  comments: CommentType[];
  id: number | undefined;
}

const DetailModalFooter: React.FC<Props> = ({ likeCount, comments, id }) => {
  const commentLength = comments.filter(
    (comment) => comment.postId === id,
  ).length;
  return (
    <Footer>
      <FooterItem color="red">
        <LikeBtn />
        <span>{likeCount}</span>
      </FooterItem>
      <FooterItem color="blue">
        <TbMessage />
        <span>{commentLength}</span>
      </FooterItem>
    </Footer>
  );
};

export default DetailModalFooter;

const Footer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 21px;
  gap: 10px;
`;

const FooterItem = styled.div<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  color: #a9a9a9;
  svg {
    font-size: 24px;
    color: ${({ color }) => (color === 'red' ? '#F97393' : '#44A5FF')};
  }
  span {
    margin-top: 4px;
    font-size: 20px;
    font-weight: 700;
  }
`;
