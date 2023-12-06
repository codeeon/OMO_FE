import React from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';
import { CommentType } from '../../model/interface';

const Comment: React.FC<{ comments: CommentType[]; postId: string }> = ({
  comments,
  postId,
}) => {
  const filteredComments = comments.filter(
    (comment) => comment.postId === postId,
  );
  return (
    <Base>
      {filteredComments.map((comment) => (
        <CommentItem comment={comment} postId={postId} />
      ))}
      <CommentInput postId={postId} />
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
