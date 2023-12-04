import React from 'react';
import styled from 'styled-components';
import { IoMdHeartEmpty } from 'react-icons/io';
import { TbMessage2 } from 'react-icons/tb';

const RecentCard = () => {
  return (
    <Base>
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
    </Base>
  );
};

export default RecentCard;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const ImgContainer = styled.div`
  width: 285px;
  height: 181px;
  border-radius: 8px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('https://images.unsplash.com/photo-1463797221720-6b07e6426c24?q=80&w=2371&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
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
