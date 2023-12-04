import React from 'react';
import styled from 'styled-components';
import { FiEdit3 } from 'react-icons/fi';
import RecentCard from '../components/main/RecentCard';
import Modal from '../components/Modal';

const Contents = () => {
  const recentCardsData = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <Base>
      <Wrapper>
        <Header>
          <Title>게시글</Title>
          <PostBtn>
            <FiEdit3 />
            <span>새 게시글</span>
          </PostBtn>
        </Header>
        <Body>
          <RecentCardGrid>
            {recentCardsData.map((cardNumber) => (
              <RecentCard key={cardNumber} />
            ))}
          </RecentCardGrid>
        </Body>
      </Wrapper>
    </Base>
  );
};

export default Contents;

const Base = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  justify-content: start;
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

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const PostBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 10px;
  color: #fff;
  background-color: #44a5ff;
  border-radius: 8px;
  cursor: pointer;
  span {
    font-size: 14px;
    font-weight: 700;
  }
  &:hover {
    background: #44b8ff;
  }
`;

const Body = styled.div`
  margin-top: 30px;
`;

const RecentCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
`;
