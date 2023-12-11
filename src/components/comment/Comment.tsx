import React from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';
import { CommentType } from '../../model/interface';

const Comment: React.FC<{
  comments: CommentType[] | undefined;
  contentId: number | undefined;
}> = ({ comments, contentId }) => {
  const commentArray = Array.isArray(comments) ? comments : [];

  const filteredComments = commentArray?.filter(
    (comment) => comment.postId === contentId,
  );

  return (
    <Base>
      {filteredComments?.map((comment) => (
        <CommentItem comment={comment} />
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
