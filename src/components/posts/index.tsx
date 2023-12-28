import React, { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiEdit3 } from 'react-icons/fi';
import Modal from '../Modal/Modal';
import PostModal from '../postModal';
import useModalCtr from '../../hooks/useModalCtr';
import Location from './location';
import useGetAllContentsQuery from '../../hooks/reactQuery/post/useGetAllContentsQuery';
import ContentCard from '../share/ContentCard';
import CategoryDropdown from './CateogryDropdown';
import ContentCardSkeleton from '../share/ContentCardSkeleton';
import CardDarkSkeleton from './CardDarkSkeleton';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import useAlertModalCtr from '../../hooks/useAlertModalCtr';
import AlertModal from '../Modal/AlertModal';
import CommentError from '../share/alert/CommentError';

interface Props {
  currentDistrict: string | undefined;
  setCurrentDistrict: React.Dispatch<SetStateAction<string | undefined>>;
  themeMode: string | null;
  map: google.maps.Map | null;
}

const Posts: React.FC<Props> = ({
  currentDistrict,
  setCurrentDistrict,
  themeMode,
  map,
}) => {
  const [category, setCategory] = useState<string>('전체');
  const { isModalOpen, handleModalClose, handleModalOpen } = useAlertModalCtr();

  const {
    isModalOpen: isSubModalOpen,
    handleModalOpen: opeSubModal,
    handleModalClose: closeSubModal,
  } = useModalCtr();
  const {
    isModalOpen: isMainModalOpen,
    handleModalOpen: openMainModal,
    handleModalClose: closeMainModal,
  } = useModalCtr();

  const {
    data: contents,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useGetAllContentsQuery(currentDistrict, category);

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  useEffect(() => {
    refetch();
  }, [currentDistrict, category]);

  const openPostModalHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const userId = sessionStorage.getItem('userId');

    if (userId) {
      openMainModal(e);
    } else {
      handleModalOpen();
    }
  };

  return (
    <Base>
      <Wrapper>
        <Header>
          <Title>게시글</Title>
          <PostBtn onClick={openPostModalHandler}>
            <FiEdit3 />
            <span>새 게시글</span>
          </PostBtn>
        </Header>
        <Navigator>{'홈 > 게시글'}</Navigator>
        <FilterContainer>
          <Location
            currentDistrict={currentDistrict}
            setCurrentDistrict={setCurrentDistrict}
          />
          <CategoryDropdown category={category} setCategory={setCategory} />
        </FilterContainer>
        <Body>
          <RecentCardGrid>
            {isFetching && !isFetchingNextPage
              ? themeMode === 'LightMode'
                ? Array.from({ length: 20 }).map((_, idx) => (
                    <ContentCardSkeleton key={idx} />
                  ))
                : Array.from({ length: 20 }).map((_, idx) => (
                    <CardDarkSkeleton key={idx} />
                  ))
              : !isFetching && isFetchingNextPage
              ? themeMode === 'LightMode'
                ? Array.from({ length: 20 }).map((_, idx) => (
                    <ContentCardSkeleton key={idx} />
                  ))
                : Array.from({ length: 20 }).map((_, idx) => (
                    <CardDarkSkeleton key={idx} />
                  ))
              : contents?.pages.map((group, i) => (
                  <>
                    {group.map((contentData) => (
                      <ContentCard
                        key={contentData.postId}
                        contentData={contentData}
                      />
                    ))}
                  </>
                ))}
            {isFetchingNextPage &&
              !isFetching &&
              Array.from({ length: 20 }).map((_) => <ContentCardSkeleton />)}
            <ObserverContainer ref={setTarget}></ObserverContainer>
          </RecentCardGrid>
        </Body>
      </Wrapper>
      <Modal isOpen={isMainModalOpen} onClose={opeSubModal}>
        <PostModal
          closeMainModal={closeMainModal}
          isSubModalOpen={isSubModalOpen}
          openSubModal={opeSubModal}
          closeSubModal={closeSubModal}
          map={map}
        />
      </Modal>
      <AlertModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        position="topRight"
      >
        <CommentError />
      </AlertModal>
    </Base>
  );
};

export default Posts;

const Base = styled.div`
  box-sizing: border-box;
  min-height: calc(100vh - 60px);
  height: auto;
  padding-top: 35px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background: ${({ theme }) => theme.color.bg};
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
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.text};
`;

const Navigator = styled.div`
  margin-bottom: 24px;
  color: ${({ theme }) => theme.color.sub};
  font-size: 14px;
  font-weight: 500;
`;

const PostBtn = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  padding: 10px;

  width: 95px;
  height: 37px;

  color: #fff;
  background-color: #44a5ff;

  border-radius: 8px;

  cursor: pointer;
  span {
    color: #fff;
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
  display: inline-grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px 20px;
  margin: 20px 0px 40px 0;

  grid-area: main;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const ObserverContainer = styled.div`
  height: 100px;
`;
