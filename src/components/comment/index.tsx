import React from 'react';
import styled from 'styled-components';
import CommentItem from './Item';
import CommentInput from './Input';
import { CommentType } from '../../model/interface';

const Comment: React.FC<{
  comments: CommentType[];
  contentId: number;
}> = ({ comments, contentId }) => {
  return (
    <Base>
      {comments.map((comment) => (
        <CommentItem comment={comment} contentId={contentId} />
      ))}
      <CommentInput contentId={contentId} />
    </Base>
  );
};

export default Comment;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 20px;
  width: 100%;
`;
