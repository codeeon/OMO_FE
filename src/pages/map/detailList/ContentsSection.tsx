import React, { useEffect } from 'react';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import ContentCard from './ContentCard';
import { useNavigate } from 'react-router-dom';
import ContentCardSk from './ContentCardSk';
import { LocationPostsType } from '../../../model/interface';

interface Props {
  posts: LocationPostsType | undefined;
}

const ContentsSection: React.FC<Props> = ({ posts }) => {
  const navigate = useNavigate();

  const goToContentsPage = () => {
    navigate('/contents');
  };

  return (
    <Base>
      <Header>
        <Title>
          <span>게시글</span>
          <span>{posts?.posts.length}</span>
        </Title>
        <AllBtn onClick={goToContentsPage}>
          <span>전체보기</span>
          <IoIosArrowForward />
        </AllBtn>
      </Header>
      <ListContainer>
        {posts?.posts.map((post) => (
          <ContentCard key={post.postId} post={post} />
        ))}
      </ListContainer>
    </Base>
  );
};

export default ContentsSection;

const Base = styled.div`
  box-sizing: border-box;
  margin-top: 45px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  padding: 0 20px;
  margin-bottom: 15px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.color.text};
  font-size: 20px;
  font-weight: 700;
`;

const AllBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.sub2};
  span {
    font-size: 14px;
    font-weight: 700;
  }
  svg {
    font-size: 14px;
  }
  &:hover {
    color: #111;
  }
  cursor: pointer;
`;

const ListContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
`;
