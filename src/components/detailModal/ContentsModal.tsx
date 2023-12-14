import React from 'react';
import styled from 'styled-components';
import DetailModalHeader from './ModalHeader';
import DetailModalBody from './ModalBody';
import DetailModalFooter from './ModalFooter';
import Comment from '../comment';
import { ContentType, PostType } from '../../model/interface';
import useGetCommentQuery from '../../hooks/reactQuery/comment/useGetCommentQuery';
import useGetContentDetailQuery from '../../hooks/useGetContentDetailQuery';

const DetailContentsModal: React.FC<{
  postId: number;
  closeModalHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ closeModalHandler, postId }) => {
  const { data: comments, isLoading: isCommentLoading } = useGetCommentQuery();

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

  return (
    <Base>
      <DetailModalHeader
        userId={User.nickname}
        createdAt={createdAt}
        contentId={postId}
        closeModalHandler={closeModalHandler}
      />
      <ImageContainer imageURL={imgUrl} />
      <DetailModalBody
        placeName={Location.address}
        locationName={Location.address}
        content={content}
        star={star}
      />
      <DetailModalFooter
        likeCount={likeCount}
        comments={comments}
        contentId={postId}
      />
      <Comment contentId={postId} comments={Comments} />
    </Base>
  );
};

export default DetailContentsModal;

const Base = styled.div`
  width: 700px;
  height: 900px;
  background-color: ${({ theme }) => theme.color.bg};
  border-radius: 16px;

  padding: 50px;
  z-index: 99;
  overflow-y: scroll;
`;

const ImageContainer = styled.div<{ imageURL: string[] }>`
  margin-top: 16px;
  width: 100%;
  height: 600px;
  border-radius: 16px;
  background: ${({ theme }) => theme.color.bg};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ imageURL }) => `url(${imageURL[0]})`};
`;
