import React, { useRef } from 'react';
import styled from 'styled-components';
import useGetContentDetailQuery from '../../hooks/reactQuery/post/useGetContentDetailQuery';
import SEO from '../../components/share/SEO';
import DetailModalHeader from './DetailModalHeader';
import DetailModalBody from './DetailModalBody';
import DetailImage from './DetailImage';
import DetailModalFooter from './DetailModalFooter';
import Comment from './Comment';
const PostDetailModal: React.FC<{
  postId: number;
  closeModalHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ closeModalHandler, postId }) => {
  const { data: post } = useGetContentDetailQuery(postId);
  const footerRef = useRef<HTMLDivElement>(null);
  if (!post) return null;

  const {
    content,
    createdAt,
    likeCount,
    imgUrl,
    star,
    User,
    Location,
    Comments,
  } = post;

  return (
    <Base>
      <Wrapper>
        <SEO
          title={Location.storeName}
          description={content}
          image={imgUrl[0]}
        />
        <DetailModalHeader
          userProfile={User.imgUrl}
          userName={User.nickname}
          userId={User.userId}
          createdAt={createdAt}
          contentId={postId}
          closeModalHandler={closeModalHandler}
          post={post}
        />
        <DetailImage imgUrl={imgUrl} />
        <DetailModalBody
          placeName={Location.storeName}
          content={content}
          star={star}
          Location={Location}
        />
        <DetailModalFooter
          footerRef={footerRef}
          likeCount={likeCount}
          postId={postId}
          commentLength={Comments.length}
        />
        <Comment postId={postId} footerRef={footerRef} />
      </Wrapper>
    </Base>
  );
};

export default PostDetailModal;

const Base = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: ${({ theme }) => theme.color.bg};

  display: flex;
  justify-content: center;
  align-items: start;

  width: 725px;
  min-height: 800px;
  max-height: 1000px;
  height: 80%;

  border-radius: 16px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.border};
    border-radius: 20px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 720px;
  min-height: 800px;
  max-height: 1000px;
  height: 80%;
  padding: 45px;
`;
