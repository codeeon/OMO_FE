import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PlaceCard from '../components/auth/mypage/PlaceCard';
import ContentCard from '../components/share/ContentCard';
import ContentCardSkeleton from '../components/share/ContentCardSkeleton';
import PlaceCardSkeleton from '../components/auth/mypage/PlaceCardSkeleton';

// 임시 데이터
import useGetAllContentsQuery from '../hooks/reactQuery/post/useGetAllContentsQuery';

const Mypage = () => {
  const navigate = useNavigate();
  const [isSelect, setIsSelect] = useState(true);

  const onClickSelect = (e) => {
    setIsSelect(e.target.value);
    console.log(isSelect);
  };
  // 임시 GET 두 개
  const { data: markedPlaces, isLoading: placesLoading } =
    useGetAllContentsQuery();
  const { data: myContents, isLoading: contentsLoading } =
    useGetAllContentsQuery();

  return (
    <Base>
      <Header>
        <Profile>
          <MyImg src="" alt=""></MyImg>
          <Nickname style={{ marginLeft: '22px' }}>오늘뭐하지</Nickname>
        </Profile>
        <Btn onClick={() => navigate('/mypage/edit')}>내 정보 수정</Btn>
      </Header>
      <Select>
        <Item value="true" onclick={onClickSelect}>
          북마크 3
        </Item>
        <Item style={{ marginLeft: '30px' }}>내 게시글 4</Item>
      </Select>

      <Contents>
        {placesLoading && isSelect
          ? Array.from({ length: 12 }).map((_, idx) => (
              <PlaceCardSkeleton key={idx} />
            ))
          : markedPlaces?.map((placeData) => (
              <PlaceCard placeData={placeData} />
            ))}
        {contentsLoading && !isSelect
          ? Array.from({ length: 12 }).map((_, idx) => (
              <ContentCardSkeleton key={idx} />
            ))
          : myContents?.map((contentData) => (
              <ContentCard contentData={contentData} />
            ))}
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
  /* background: url(<path-to-image>), lightgray 50% / cover no-repeat; */
`;

const Nickname = styled.div`
  color: var(--light-1_txt, #111);
  font-family: Wanted Sans;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  margin-left: 22px;
`;

const Btn = styled.button`
  display: inline-flex;
  padding: 10px 13px 8px 14px;
  border-radius: 8px;
  background: var(--link, #44a5ff);
  color: #fff;
  font-family: Wanted Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  border: none;
  cursor: pointer;
`;

const Select = styled.div`
  width: 1200px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Item = styled.div`
  color: var(--light-1_txt, #111);
  font-family: Wanted Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  padding: 5px;
  border: solid var(--primary, #f97393);
  border-width: 0 0 3px 0;
  margin-bottom: 16px;
  cursor: pointer;
  // 보더라인, 선택된 녀석만 보이게끔
`;

const Contents = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px 20px;
  margin: 20px 0px 40px 0;

  grid-area: main;
`;
