import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ContentCardSkeleton from '../components/skeleton/RecentPostCardSkeleton';
import ContentCard from '../components/card/ContentCard';
import PlaceCardSkeleton from '../components/skeleton/PlaceCardSkeleton';
import PlaceCard from '../components/auth/mypage/PlaceCard';
import useGetMyDataQuery from '../hooks/reactQuery/mypage/useGetMyDataQuery';
import useGetMyPostsQuery from '../hooks/reactQuery/mypage/useGetMyPostsQuery';
import useGetMyBookmarkQuery from '../hooks/reactQuery/mypage/useGetMyBookmarkQuery';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Mypage: React.FC = () => {
  const navigate = useNavigate();

  const [isSelect, setIsSelect] = useState('Bookmark');

  const { data: myData, isError: userError } = useGetMyDataQuery();

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    (!userId || userError) &&
      (alert('로그인 후 이용해주세요.'),
      navigate('/login'),
      sessionStorage.removeItem('userId'),
      sessionStorage.removeItem('accessToken'),
      sessionStorage.removeItem('refreshToken'));
  }, []);

  const {
    data: myBookmark,
    fetchNextPage: fetchNextBookmark,
    hasNextPage: hasNextBookmark,
    isFetching: isFetchingBookmark,
    isFetchingNextPage: isFetchingNextBookmark,
    refetch: refetchBookmark,
  } = useGetMyBookmarkQuery();
  const {
    data: myPosts,
    fetchNextPage: fetchNextMyPosts,
    hasNextPage: hasNextMyPosts,
    isFetching: isFetchingMyPosts,
    isFetchingNextPage: isFetchingNextMyPosts,
    refetch: refetchMyPosts,
  } = useGetMyPostsQuery();

  const { setTarget: setTargetBookmark } = useIntersectionObserver({
    hasNextBookmark,
    fetchNextBookmark,
  });

  const { setTarget: setTargetMyPosts } = useIntersectionObserver({
    hasNextMyPosts,
    fetchNextMyPosts,
  });

  useEffect(() => {
    isSelect === 'Bookmark' ? refetchBookmark() : refetchMyPosts();
  }, [isSelect]);

  const onClickSelectBookmark = () => {
    setIsSelect('Bookmark');
  };
  const onClickSelectContents = () => {
    setIsSelect('Contents');
  };

  // console.log(myBookmark, myPosts);

  return (
    <Base>
      <Header>
        <Profile>
          <MyImg src={myData?.data.imgUrl} alt=""></MyImg>
          <Nickname style={{ marginLeft: '22px' }}>
            {myData?.data.nickname}
          </Nickname>
        </Profile>
        <Btn onClick={() => navigate('/mypage/edit')}>내 정보 수정</Btn>
      </Header>
      <Select>
        <Item
          onClick={onClickSelectBookmark}
          selected={isSelect === 'Bookmark'}
        >
          북마크
        </Item>
        <Item
          onClick={onClickSelectContents}
          selected={isSelect === 'Contents'}
          style={{ marginLeft: '30px' }}
        >
          내 게시글
        </Item>
      </Select>
      <Contents>
        {/* pages가 정해져 있기 때문에, 수정을 해야 할 듯. 다음 페이지가 있다면 그 숫자의 페이지도 나오게끔 */}
        {isSelect === 'Bookmark' ? (
          (isFetchingBookmark && !isFetchingNextBookmark) ||
          (!isFetchingBookmark && isFetchingNextBookmark) ? (
            Array.from({ length: 12 }).map((_, idx) => (
              <PlaceCardSkeleton key={idx} />
            ))
          ) : myBookmark?.pages[0].data.length === 0 ? (
            <Text $color="sub" style={{ marginTop: '50px' }}>
              북마크에 저장한 장소가 없습니다.
            </Text>
          ) : (
            myBookmark?.pages.map((page) =>
              page.data.map((placeData) => (
                <PlaceCard key={placeData.locationId} placeData={placeData} />
              )),
            )
          )
        ) : (isFetchingMyPosts && !isFetchingNextMyPosts) ||
          (!isFetchingMyPosts && isFetchingNextMyPosts) ? (
          Array.from({ length: 12 }).map((_, idx) => (
            <ContentCardSkeleton key={idx} />
          ))
        ) : myPosts?.pages[0].data.length === 0 ? (
          <Text $color="sub" style={{ marginTop: '50px' }}>
            아직 작성한 게시글이 없습니다.
          </Text>
        ) : (
          myPosts?.pages.map((page) =>
            page.data.map((contentData) => (
              <ContentCard key={contentData.postId} contentData={contentData} />
            )),
          )
        )}
        {isSelect === 'Bookmark' ? (
          <ObserverContainer ref={setTargetBookmark}></ObserverContainer>
        ) : (
          <ObserverContainer ref={setTargetMyPosts}></ObserverContainer>
        )}
      </Contents>
    </Base>
  );
};

export default Mypage;

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
  /* display: inline-flex;
  justify-content: flex-end; */
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
