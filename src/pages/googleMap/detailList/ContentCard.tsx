import React, { useState } from 'react';
import { LocationPostType } from '../../../model/interface';
import styled from 'styled-components';
import { TbMessage } from 'react-icons/tb';
import LikeBtn from '../../../components/detailModal/LikeBtn';
import Modal from '../../../components/Modal/Modal';
import DetailContentsModal from '../../../components/detailModal/ContentsModal';
import StarCount from '../../../components/share/StarCount';
interface Props {
  post: LocationPostType;
}

const ContentCard: React.FC<Props> = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModalHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <Base onClick={toggleModalHandler}>
        <UserContainer>
          <UserProfile $profileImg={post.User.imgUrl} />
          <UserInfoContainer>
            <UserId>{post.User.nickname}</UserId>
            <Date>{post.createdAt.split('T')[0]}</Date>
          </UserInfoContainer>
        </UserContainer>
        <ImageBox $imageURL={post.imgUrl[0]} />
        <StarCount count={post.star} margin="17px 20px" />
        <Text dangerouslySetInnerHTML={{ __html: post.content }} />
        {/* <Footer>
          <FooterItem>
            <LikeBtn postId={post.postId} />
            <span>{post.likeCount}</span>
          </FooterItem>
          <FooterItem>
            <TbMessage />
            <span>{post.commentCount}</span>
          </FooterItem>
        </Footer> */}
      </Base>
      <Modal isOpen={isModalOpen} onClose={toggleModalHandler}>
        <DetailContentsModal
          postId={post.postId}
          closeModalHandler={toggleModalHandler}
        />
      </Modal>
    </>
  );
};

export default ContentCard;

const Base = styled.div`
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }
  cursor: pointer;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  box-sizing: border-box;
  padding: 0 20px;
`;

const UserProfile = styled.div<{ $profileImg: string }>`
  width: 40px;
  height: 40px;
  border-radius: 100%;

  background-image: ${({ $profileImg }) => `url(${$profileImg})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 6px;
`;

const UserId = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-size: 14px;
  font-weight: 700;
`;

const Date = styled.div`
  color: ${({ theme }) => theme.color.sub2};
  font-size: 14px;
  font-weight: 500;
`;

const ImageBox = styled.div<{ $imageURL: string }>`
  margin: 0 20px;
  margin-top: 10px;
  background-color: gray;
  width: 90%;
  height: 380px;
  border-radius: 8px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ $imageURL }) => `url(${$imageURL})`};
`;

const Text = styled.div`
  color: ${({ theme }) => theme.color.sub2};
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 370px;
  height: 20px;
  margin: 0 20px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  margin: 10px 20px;
`;

const FooterItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  color: #a9a9a9;
  svg {
    font-size: 24px;
    color: #a9a9a9;
  }
  span {
    font-size: 16px;
    font-weight: 500;
    margin-top: 3px;
  }
`;
