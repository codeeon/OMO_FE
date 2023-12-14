import React, { useState } from 'react';
import styled from 'styled-components';
import { IoMdHeartEmpty } from 'react-icons/io';
import { TbMessage2 } from 'react-icons/tb';
import DetailContentsModal from '../../detailModal/ContentsModal';
import Modal from '../../Modal/Modal';
import { CommentType, ContentType } from '../../../model/interface';

const Card: React.FC<{ contentData: ContentType }> = ({ contentData }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { placeName, createdAt, content, likeCount, imageURL } = contentData;

  const openModalHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModalHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <Base onClick={(e) => openModalHandler(e)}>
      <ImgContainer imageURL={imageURL} />
      <HeaderContainer>
        <Title>{placeName}</Title>
        <VerticalLine />
        <Date>{createdAt}</Date>
      </HeaderContainer>
      <Text dangerouslySetInnerHTML={{ __html: content }} />
      <Footer>
        <FooterItem>
          <IoMdHeartEmpty />
          <span>{likeCount}</span>
        </FooterItem>
        <FooterItem>
          <TbMessage2 />
          <span>3</span>
        </FooterItem>
      </Footer>
      <Modal isOpen={isModalOpen} onClose={closeModalHandler}>
        <DetailContentsModal
          contentData={contentData}
          closeModalHandler={closeModalHandler}
        />
      </Modal>
    </Base>
  );
};

export default Card;

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
  margin-top: 18px;
  line-height: 140%;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 20px;
  width: 270px;
  color: ${({ theme }) => theme.color.text};
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
  color: ${({ theme }) => theme.color.sub2};
  svg {
    font-size: 20px;
  }
  span {
    font-size: 14px;
    font-weight: 500;
  }
`;
