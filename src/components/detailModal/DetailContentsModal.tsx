import React from 'react';
import styled from 'styled-components';
import DetailModalHeader from './DetailModalHeader';
import DetailModalBody from './DetalModalBody';
import DetailModalFooter from './DetailModalFooter';
import Comment from '../comment/Comment';
import { ContentType } from '../../model/interface';
import useGetCommentQuery from '../../hooks/useGetCommentQuery';

const DetailContentsModal: React.FC<{
  contentData: ContentType;
  closeModalHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ contentData, closeModalHandler }) => {
  const {
    id,
    userId,
    placeName,
    createdAt,
    locationName,
    content,
    likeCount,
    imageURL,
    star,
  } = contentData;
  const { data: comments, isLoading } = useGetCommentQuery();

  return (
    <Base>
      <DetailModalHeader
        userId={userId}
        createdAt={createdAt}
        contentId={id}
        closeModalHandler={closeModalHandler}
      />
      <ImageContainer imageURL={imageURL} />
      <DetailModalBody
        placeName={placeName}
        locationName={locationName}
        content={content}
        star={star}
      />
      {isLoading && <h2>로딩중</h2>}
      <DetailModalFooter
        likeCount={likeCount}
        comments={comments}
        contentId={id}
      />
      <Comment contentId={id} comments={comments} />
    </Base>
  );
};

export default DetailContentsModal;

const Base = styled.div`
  width: 700px;
  height: 900px;
  background-color: #fff;
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
  background: #d9d9d9;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ imageURL }) => `url(${imageURL[0]})`};
`;
