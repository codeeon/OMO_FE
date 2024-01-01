import React from 'react';
import styled from 'styled-components';
import { TbMessage } from 'react-icons/tb';
import LikeBtn from './LikeBtn';
import MessageIcon from '../../assets/icons/MessageIcon';

interface Props {
  likeCount: number;
  postId: number | undefined;
  commentLength: number;
}

const ModalFooter: React.FC<Props> = ({ likeCount, postId, commentLength }) => {
  return (
    <Footer>
      <FooterItem $color="red">
        <LikeBtn postId={postId} />
        <span>{likeCount}</span>
      </FooterItem>
      <FooterItem $color="blue">
        <MessageIcon />
        <span>{commentLength}</span>
      </FooterItem>
    </Footer>
  );
};

export default ModalFooter;

const Footer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 21px;
  gap: 10px;
  width: 100%;
`;

const FooterItem = styled.div<{ $color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  $color: #a9a9a9;
  svg {
    font-size: 24px;
    $color: ${({ $color }) => ($color === 'red' ? '#F97393' : '#44A5FF')};
  }
  span {
    margin-top: 4px;
    font-size: 20px;
    font-weight: 700;
  }
`;
