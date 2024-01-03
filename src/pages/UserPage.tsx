import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ContentCardSkeleton from '../components/skeleton/RecentPostCardSkeleton';
import ContentCard from '../components/card/ContentCard';
import useGetUserDataQuery from '../hooks/reactQuery/userPage/useGetUserDataQuery';
import useGetUserPostsQuery from '../hooks/reactQuery/userPage/useGetUserContentsQuery';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const UserPage: React.FC = () => {
  const { nickname: username } = useParams();

  const [isSelect, setIsSelect] = useState('Contents');

  const { data: userData, refetch: refetchUserData } =
    useGetUserDataQuery(username);

  const {
    data: userPosts,
    fetchNextPage: fetchNextUserPosts,
    hasNextPage: hasNextUserPosts,
    isFetching: isFetchingUserPosts,
    isFetchingNextPage: isFetchingNextUserPosts,
    refetch: refetchUserPosts,
  } = useGetUserPostsQuery(username);

  const { setTarget: setTargetMyPosts } = useIntersectionObserver({
    hasNextUserPosts,
    fetchNextUserPosts,
  });

  useEffect(() => {
    refetchUserPosts();
  }, [isSelect]);

  useEffect(() => {
    refetchUserData();
    refetchUserPosts();
  }, [username]);

  const onClickSelectContents = () => {
    setIsSelect('Contents');
  };

  return (
    <Base>
      <Header>
        <Profile>
          <MyImg src={userData?.data.imgUrl} alt=""></MyImg>
          <Nickname style={{ marginLeft: '22px' }}>
            {userData?.data.nickname}
          </Nickname>
        </Profile>
      </Header>
      <Select>
        <Item
          onClick={onClickSelectContents}
          selected={isSelect === 'Contents'}
        >
          게시글
        </Item>
      </Select>
      <Contents>
        {(isFetchingUserPosts && !isFetchingNextUserPosts) ||
        (!isFetchingUserPosts && isFetchingNextUserPosts) ? (
          Array.from({ length: 12 }).map((_, idx) => (
            <ContentCardSkeleton key={idx} />
          ))
        ) : userPosts?.pages[0].data.length === 0 ? (
          <Text $color="sub" style={{ marginTop: '50px' }}>
            아직 작성한 게시글이 없습니다.
          </Text>
        ) : (
          userPosts?.pages.map((page) =>
            page.data.map((contentData) => (
              <ContentCard key={contentData.postId} contentData={contentData} />
            )),
          )
        )}
        {<ObserverContainer ref={setTargetMyPosts}></ObserverContainer>}
      </Contents>
    </Base>
  );
};

export default UserPage;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: calc(100vh - 60px);
  height: auto;
  background: ${({ theme }) => theme.color.bg};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  height: 64px;
  margin: 54px 0 50px 0;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const MyImg = styled.img`
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 100%;
  border: none;
  /* background-color: ${({ theme }) => theme.color.border}; */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Nickname = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-size: 24px;
  font-weight: 700;
  margin-left: 22px;
`;

const Btn = styled.button`
  display: inline-flex;
  padding: 10px 13px 8px 14px;
  border-radius: 8px;
  background: #44a5ff;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  border: none;
  cursor: pointer;
`;

const Select = styled.div`
  width: 1200px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Item = styled.div<{ selected: boolean }>`
  color: ${({ theme }) => theme.color.text};
  font-size: 20px;
  font-weight: 700;
  padding: 5px;
  border: ${({ selected, theme }) =>
    selected ? `solid #f97393` : `solid ${theme.color.bg}`};
  border-width: 0 0 3px 0;
  margin-bottom: 16px;
  cursor: pointer;
`;

const Text = styled.div<{ $color?: string }>`
  gap: 4px;
  color: ${({ $color, theme }) =>
    $color === 'sub2'
      ? theme.color.sub2
      : $color === 'sub'
      ? theme.color.sub
      : $color === 'text'
      ? theme.color.text
      : $color === 'btn'
      ? '#fff'
      : theme.color.link};
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  height: 25px;
`;

const Contents = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px 20px;
  margin: 20px 0px 40px 0;
  grid-area: main;
`;

const ObserverContainer = styled.div`
  height: 100px;
`;
