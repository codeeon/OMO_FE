import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Base>
      <Wrapper>
        <LogoContainer>
          <LogoCircle />
          <LogoRectangle />
        </LogoContainer>
        <Text $marginTop="25px">(주)오늘 뭐할래 컴퍼니</Text>
        <Text $marginTop="9px">
          서울 강남구 테헤란로44길 8 12층 (아이콘역삼빌딩)
        </Text>
        <Text $marginTop="20px">Copyright OM COMPANY All Rights Reserved.</Text>
      </Wrapper>
    </Base>
  );
};

export default Footer;

const Base = styled.div`
  position: relative;

  width: 100%;
  height: 210px;
  background: ${({ theme }) => theme.color.footer};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  max-width: 1200px;
  width: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const LogoCircle = styled.div`
  box-sizing: border-box;
  width: 22px;
  height: 22px;
  border: 5px solid ${({ theme }) => theme.color.sub};
  border-radius: 100%;
  transition: border 200ms ease-in-out;
`;

const LogoRectangle = styled.div`
  box-sizing: border-box;
  width: 22px;
  height: 22px;
  border: 5px solid ${({ theme }) => theme.color.sub};
  border-radius: 5px;
  transition: border 200ms ease-in-out;
`;

const Text = styled.div<{ $marginTop: string }>`
  margin-top: ${({ $marginTop }) => $marginTop};
  color: #8f8f8f;
  font-size: 14px;
  font-weight: 500;
`;
