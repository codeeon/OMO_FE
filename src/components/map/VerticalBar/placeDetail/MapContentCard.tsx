import React from 'react';
import styled from 'styled-components';
import { IoMdHeartEmpty } from 'react-icons/io';
import { TbMessage2 } from 'react-icons/tb';

const MapContentCard = () => {
  return (
    <Base>
      <UserContainer>
        <UserProfile />
        <UserInfoContainer>
          <UserName>오뭐?</UserName>
          <CreationDate>2023.12.02</CreationDate>
        </UserInfoContainer>
      </UserContainer>
      <Profile />
      <Text>
        요즘에 다들 놀러간다길래 <br /> 남자친구랑 같이 놀러 가봤는데
        재밌었어요!!...
      </Text>
      <Footer>
        <FooterItem>
          <IoMdHeartEmpty />
          <span>28</span>
        </FooterItem>
        <FooterItem>
          <TbMessage2 />
          <span>3</span>
          {/* TODO Comment 추가하기 */}
        </FooterItem>
      </Footer>
    </Base>
  );
};

export default MapContentCard;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-top: 30px;
  width: 90%;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 15px;
  width: 100%;
`;

const UserProfile = styled.div`
  background: #d9d9d9;
  width: 50px;
  height: 50px;
  border-radius: 100%;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 8px;
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.16px;
`;

const CreationDate = styled.div`
  font-size: 16px;
  font-weight: 500x;
  letter-spacing: -0.16px;
  color: #a5a5a5;
`;

const Profile = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 383px;
  background: #d9d9d9;
  border-radius: 8px;
`;

const Text = styled.div`
  margin-top: 17px;
  width: 100%;
  color: #5a5a5a;
  font-family: Wanted Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 22.4px */
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
