import React, { useState } from 'react';
import { ContentType } from '../../../../model/interface';
import styled from 'styled-components';
import { TbMessage } from 'react-icons/tb';
import LikeBtn from '../../../detailModal/LikeBtn';
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import Modal from '../../../Modal/Modal';
import DetailContentsModal from '../../../detailModal/DetailContentsModal';
interface Props {
  cont: ContentType;
}

const ContentCard: React.FC<Props> = ({ cont }) => {
  const { star, likeCount, createdAt, content, imageURL } = cont;
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
          <UserProfile />
          <UserInfoContainer>
            <UserId>뽀롱</UserId>
            <Date>{createdAt}</Date>
          </UserInfoContainer>
        </UserContainer>
        <ImageBox imageURL={imageURL} />
        <RatingContainer>
          {Array.from({ length: 5 }, (_, idx) => (
            <StarWrapper key={idx}>
              {idx < star ? <FaStar /> : <FaRegStar />}
            </StarWrapper>
          ))}
          <span>{star}점</span>
        </RatingContainer>
        <Text>{content}</Text>
        <Footer>
          <FooterItem color="red">
            <LikeBtn />
            <span>{likeCount}</span>
          </FooterItem>
          <FooterItem color="blue">
            <TbMessage />
            <span>1</span>
          </FooterItem>
        </Footer>
      </Base>
      <Modal isOpen={isModalOpen} onClose={toggleModalHandler}>
        <DetailContentsModal
          contentData={cont}
          closeModalHandler={toggleModalHandler}
        />
      </Modal>
    </>
  );
};

export default ContentCard;

const Base = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

const UserProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: gray;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 6px;
`;

const UserId = styled.div`
  color: #000;
  font-size: 14px;
  font-weight: 700;
`;

const Date = styled.div`
  color: #5a5a5a;
  font-size: 14px;
  font-weight: 500;
`;

const ImageBox = styled.div<{ imageURL: string[] }>`
  margin-top: 10px;
  background-color: gray;
  width: 100%;
  height: 380px;
  border-radius: 8px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ imageURL }) => `url(${imageURL[0]})`};
`;

const RatingContainer = styled.div`
  margin-top: 17px;

  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 2px;
  span {
    margin-top: 5px;
    text-align: center;
    color: #323232;
    font-size: 16px;
    font-weight: 700;
  }
  margin-bottom: 15px;
`;

const StarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  font-size: 16px;
  color: #f97393;
`;

const Text = styled.div`
  color: #5a5a5a;
  font-size: 16px;
  font-weight: 500;
  line-height: 140%; /* 22.4px */
`;

const Footer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 15px;
  gap: 10px;
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
