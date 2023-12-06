import React, { useState } from 'react';
import styled from 'styled-components';
import { IoMdHeartEmpty } from 'react-icons/io';
import { TbMessage2 } from 'react-icons/tb';
import DetailContentsModal from '../detailModal/DetailContentsModal';
import Modal from '../Modal';
import { CommentType, ContentType } from '../../model/interface';

const RecentCard: React.FC<{ cont: ContentType; comments: CommentType[] }> = ({
  cont,
  comments,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { placeName, createdAt, content, likeCount, imageURL } = cont;

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <Base onClick={openModalHandler}>
      <ImgContainer imageURL={imageURL} />
      <HeaderContainer>
        <Title>{placeName}</Title>
        <VerticalLine />
        <Date>{createdAt}</Date>
      </HeaderContainer>
      <Text>{content}</Text>
      <Footer>
        <FooterItem>
          <IoMdHeartEmpty />
          <span>{likeCount}</span>
        </FooterItem>
        <FooterItem>
          <TbMessage2 />
          <span>3</span>
          {/* TODO Comment 추가하기 */}
        </FooterItem>
      </Footer>
      <Modal isOpen={isModalOpen} onClose={closeModalHandler}>
        <DetailContentsModal cont={cont} comments={comments} />
      </Modal>
    </Base>
  );
};

export default RecentCard;

const ImgContainer = styled.div<{ imageURL: string[] }>`
  width: 285px;
  height: 181px;
  border-radius: 8px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ imageURL }) => `url(${imageURL[0]})`};
`;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  cursor: pointer;
  &:hover ${ImgContainer} {
    transform: translateY(-10px);
  }
`;

const HeaderContainer = styled.div`
  margin-top: 12px;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: #a9a9a9;
`;

const VerticalLine = styled.div`
  border-right: 1px solid #a9a9a9;
  width: 1px;
  height: 12px;
`;

const Date = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #a9a9a9;
`;

const Text = styled.div`
  margin-top: 18px;
  line-height: 140%;
  font-size: 16px;
  font-weight: 500;
`;

const Footer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 21px;
  gap: 8px;
`;

const FooterItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  color: #a9a9a9;
  svg {
    font-size: 20px;
  }
  span {
    font-size: 14px;
    font-weight: 500;
  }
`;
