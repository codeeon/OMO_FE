import React from 'react';
import styled from 'styled-components';
import DetailModalHeader from './ModalHeader';
import DetailModalBody from './ModalBody';
import DetailModalFooter from './ModalFooter';
import Comment from '../comment';
import useGetContentDetailQuery from '../../hooks/reactQuery/post/useGetContentDetailQuery';
import Image from './Image';

const DetailContentsModal: React.FC<{
  postId: number;
  closeModalHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ closeModalHandler, postId }) => {
  const { data: post, isLoading: isPostLoading } =
    useGetContentDetailQuery(postId);

  if (!post) return;

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

  const commentLength = Comments.length;

  return (
    <Base>
      <DetailModalHeader
        userProfile={User.imgUrl}
        userId={User.nickname}
        createdAt={createdAt}
        contentId={postId}
        closeModalHandler={closeModalHandler}
        post={post}
      />
      <Image imgUrl={imgUrl} />
      <DetailModalBody
        placeName={Location.storeName}
        locationName={Location.address}
        content={content}
        star={star}
      />
      <DetailModalFooter
        likeCount={likeCount}
        postId={postId}
        commentLength={commentLength}
      />
      <Comment contentId={postId} comments={Comments} />
    </Base>
  );
};

export default DetailContentsModal;

const Base = styled.div`
  box-sizing: border-box;
  width: 600px;

  min-height: 700px;
  max-height: 900px;
  height: 80%;
  background-color: ${({ theme }) => theme.color.bg};
  border-radius: 16px;

  padding: 40px;
  z-index: 99;
  overflow: auto;

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
