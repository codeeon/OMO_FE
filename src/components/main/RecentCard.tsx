import React, { useState } from 'react';
import styled from 'styled-components';
import { IoMdHeartEmpty } from 'react-icons/io';
import { TbMessage2 } from 'react-icons/tb';
import DetailContentsModal from '../detailModal/DetailContentsModal';
import Modal from '../Modal';

const RecentCard = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <Base onClick={openModalHandler}>
      <ImgContainer />
      <HeaderContainer>
        <Title>Drew Coffee</Title>
        <VerticalLine />
        <Date>2023.12.01</Date>
      </HeaderContainer>
      <Text>
        요즘에 다들 놀러간다길래 <br /> 남자친구랑 같이 놀러 가봤는데
        재밌었어요!!
      </Text>
      <Footer>
        <FooterItem>
          <IoMdHeartEmpty />
          <span>28</span>
        </FooterItem>
        <FooterItem>
          <TbMessage2 />
          <span>3</span>
        </FooterItem>
      </Footer>
      <Modal isOpen={isModalOpen} onClose={closeModalHandler}>
        <DetailContentsModal />
      </Modal>
    </Base>
  );
};

export default RecentCard;

const ImgContainer = styled.div`
  width: 285px;
  height: 181px;
  border-radius: 8px;
  /* background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(''); */
  background: #d9d9d9;
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
