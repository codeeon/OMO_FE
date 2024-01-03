import React from 'react';
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
  
  const commentLength = Comments.length;

  return (
    <Base>
      <SEO title={Location.storeName} description={content} image={imgUrl[0]} />
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
        likeCount={likeCount}
        postId={postId}
        commentLength={commentLength}
      />
      <Comment contentId={postId} comments={Comments} />
    </Base>
  );
};

export default PostDetailModal;

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
