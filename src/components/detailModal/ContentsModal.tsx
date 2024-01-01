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
  const { data: post } = useGetContentDetailQuery(postId);

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

  // console.log(Comments);
  const commentLength = Comments.length;

  return (
    <Base>
      <DetailModalHeader
        userProfile={User.imgUrl}
        userName={User.nickname}
        userId={User.userId}
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
