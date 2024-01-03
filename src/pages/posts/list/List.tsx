import React, { useEffect } from 'react';
import styled from 'styled-components';
import Modal from '../../../components/Modal/Modal';
import PostModal from '../../publishing/PublicModal';
import useModalCtr from '../../../hooks/useModalCtr';
import useGetAllContentsQuery from '../../../hooks/reactQuery/post/useGetAllContentsQuery';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import useDistrictStore from '../../../store/location/districtStore';
import useCategoryStore from '../../../store/category/categoryStore';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Header from './Header';
import RecentPostCardSkeleton from '../../../components/skeleton/RecentPostCardSkeleton';
import LocationDrodown from '../../../components/share/dropdown/locationDropdown/LocationDrodown';
import CategoryDropdown from '../../../components/share/dropdown/CateogryDropdown';
import ContentCard from '../../../components/card/ContentCard';

const List = () => {
  const { district } = useDistrictStore();
  const { category } = useCategoryStore();
  const {
    isModalOpen: isSubModalOpen,
    handleModalOpen: openSubModal,
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
  } = useGetAllContentsQuery(district, category);

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  useEffect(() => {
    refetch();
  }, [district, category, refetch]);

  const openPostModalHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      return toast.error('로그인 후 작성 가능합니다.', {
        position: 'top-right',
        duration: 4000,
        style: { fontSize: '14px' },
      });
    }
    openMainModal(e);
  };

  const renderSkeletons = (count: number) =>
    Array.from({ length: count }).map((_, idx) => (
      <RecentPostCardSkeleton key={idx} />
    ));

  const renderContentCards = () =>
    contents?.pages.map((group, pageIndex) => (
      <React.Fragment key={pageIndex}>
        {group.map((contentData) => (
          <ContentCard key={contentData.postId} contentData={contentData} />
        ))}
      </React.Fragment>
    ));

  return (
    <Base>
      <Wrapper>
        <Navigator>{'홈 > 게시글'}</Navigator>
        <Header openPostModalHandler={openPostModalHandler} />
        <FilterContainer>
          <LocationDrodown />
          <CategoryDropdown />
        </FilterContainer>
        <Body>
          <RecentCardGrid>
            {isFetching && !isFetchingNextPage
              ? renderSkeletons(20)
              : renderContentCards()}
            {isFetchingNextPage && hasNextPage && renderSkeletons(4)}
            {hasNextPage && (
              <ObserverContainer ref={setTarget}></ObserverContainer>
            )}
          </RecentCardGrid>
        </Body>
      </Wrapper>
      <Modal isOpen={isMainModalOpen} onClose={openSubModal}>
        <PostModal
          closeMainModal={closeMainModal}
          isSubModalOpen={isSubModalOpen}
          openSubModal={openSubModal}
          closeSubModal={closeSubModal}
        />
      </Modal>
    </Base>
  );
};

export default List;

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

const Navigator = styled.div`
  margin-bottom: 24px;
  color: ${({ theme }) => theme.color.sub};
  font-size: 14px;
  font-weight: 500;
`;

const Body = styled.div`
  margin-top: 30px;
`;

const RecentCardGrid = styled(motion.ul)`
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
  height: 200px;
`;
