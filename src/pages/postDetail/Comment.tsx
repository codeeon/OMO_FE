import React from 'react';
import styled from 'styled-components';
import CommentItem from '../../components/comment/CommentItem';
import CommentInput from '../../components/comment/CommentInput';
import useGetCommentQuery from '../../hooks/reactQuery/comment/useGetCommentQuery';
import { elementScrollIntoView } from 'seamless-scroll-polyfill';

interface Props {
  postId: number;
  footerRef: React.RefObject<HTMLDivElement>;
}

const Comment: React.FC<Props> = ({ postId, footerRef }) => {
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
  } = useGetCommentQuery(postId);

  const scrollToTop = () => {
    if (footerRef.current) {
      elementScrollIntoView(footerRef.current, { behavior: 'smooth' });
    }
  };

  return (
    <Base>
      {comments?.pages.map((group, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {group.data.map((comment, idx) => (
            <CommentItem
              key={comment.commentId}
              comment={comment}
              postId={postId}
              delay={0.1 * idx}
            />
          ))}
        </React.Fragment>
      ))}
      {hasNextPage && (
        <MoreButton onClick={() => fetchNextPage()}>댓글 더보기</MoreButton>
      )}
      <CommentInput contentId={postId} scrollToTop={scrollToTop} />
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

const MoreButton = styled.div`
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};

  width: 100%;
  height: 50px;

  border: 1px solid transparent;
  border-radius: 20px;

  &:hover {
    border: 1.5px solid ${({ theme }) => theme.color.link};
  }
  cursor: pointer;
  transition: all 200ms ease;
`;
