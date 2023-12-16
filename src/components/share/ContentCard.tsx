import React, { useState } from 'react';
import styled from 'styled-components';
import { IoMdHeartEmpty } from 'react-icons/io';
import { TbMessage2 } from 'react-icons/tb';
import DetailContentsModal from '../detailModal/ContentsModal';
import Modal from '../Modal/Modal';
import { ContentType, PostType } from '../../model/interface';
import { MdLocationOn } from 'react-icons/md';

const ContentCard: React.FC<{ contentData: PostType }> = ({ contentData }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    postId,
    User,
    Location,
    imgUrl,
    content,
    likeCount,
    commentCount,
    createdAt,
  } = contentData;

  const handleModalOpen = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    if (!isModalOpen) {
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <Base onClick={(e) => handleModalOpen(e)}>
      <ImgContainer imageURL={imgUrl} />
      <HeaderContainer>
        <Title>{User.nickname}</Title>
        <VerticalLine />
        <Date>{createdAt.split('T')[0]}</Date>
      </HeaderContainer>
      <LocationContainer>
        <MdLocationOn />
        <span>{Location.address}</span>
      </LocationContainer>
      <Text dangerouslySetInnerHTML={{ __html: content }} />
      <Footer>
        <FooterItem>
          <IoMdHeartEmpty />
          <span>{likeCount}</span>
        </FooterItem>
        <FooterItem>
          <TbMessage2 />
          <span>{commentCount}</span>
        </FooterItem>
      </Footer>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <DetailContentsModal
          postId={postId}
          closeModalHandler={handleModalClose}
        />
      </Modal>
    </Base>
  );
};

export default ContentCard;

const ImgContainer = styled.div<{ imageURL: string[] }>`
  width: 285px;
  height: 181px;
  border-radius: 8px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ imageURL }) => `url(${imageURL[0]})`};
  transition: all 300ms ease-in-out;
`;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  cursor: pointer;
  &:hover ${ImgContainer} {
    transform: translateY(-10px);
    box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
      rgba(0, 0, 0, 0.05) 0px 5px 10px;
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
  color: ${({ theme }) => theme.color.sub};
`;

const LocationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  color: #44a5ff;
  svg {
    font-size: 16px;
  }
  span {
    font-size: 16px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 15px;
    width: 250px;
  }
`;

const VerticalLine = styled.div`
  border-right: 1px solid #a9a9a9;
  width: 1px;
  height: 12px;
`;

const Date = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.sub};
`;

const Text = styled.div`
  margin-top: 10px;

  line-height: 140%;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.text};

  height: 40px;
  width: 270px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Footer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 12px;
  gap: 8px;
`;

const FooterItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1px;
  color: ${({ theme }) => theme.color.sub2};
  svg {
    font-size: 20px;
  }
  span {
    font-size: 14px;
    font-weight: 500;
  }
`;
