import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
const ContentCardSk = () => {
  return (
    <Base>
      <UserContainer>
        <Skeleton width={'40px'} height={'40px'} borderRadius={'100%'} />
        <UserInfoContainer>
          <Skeleton width={'40px'} height={'15px'} />
          <Skeleton width={'50px'} height={'10px'} />
        </UserInfoContainer>
      </UserContainer>
      <Skeleton width={'370px'} height={'380px'} borderRadius={'8px'} />
      <RatingContainer>
        <Skeleton width={'100px'} height={'15px'} />
      </RatingContainer>
      <Text>
        <Skeleton width={'300px'} height={'15px'} />
      </Text>
      <Footer>
        <FooterItem color="red">
          <Skeleton width={'30px'} height={'15px'} />
        </FooterItem>
        <FooterItem color="blue">
          <Skeleton width={'30px'} height={'15px'} />
        </FooterItem>
      </Footer>
    </Base>
  );
};

export default ContentCardSk;

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
  margin-bottom: 10px;
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
