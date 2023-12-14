import React, { SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { FiEdit3 } from 'react-icons/fi';
import RecentCard from '../main/RecentContents/Card';
import Modal from '../Modal/Modal';
import PostModal from '../postModal';
import useModalCtr from '../../hooks/useModalCtr';
import Location from './location';
import useGetAllContentsQuery from '../../hooks/reactQuery/post/useGetAllContentsQuery';
import Card from './Card';

interface Props {
  currentLocation: string | undefined;
  setCurrentLocation: React.Dispatch<SetStateAction<string | undefined>>;
}

const Posts: React.FC<Props> = ({ currentLocation, setCurrentLocation }) => {
  const {
    isModalOpen: isSubModalOpen,
    handleModalOpen: opeSubModal,
    handleModalClose: closeSubModal,
  } = useModalCtr();
  const { data: contents, isLoading } = useGetAllContentsQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    if (!isModalOpen) {
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleModalClose = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <Base>
      <Wrapper>
        <Header>
          <Title>게시글</Title>
          <PostBtn onClick={(e) => handleModalOpen(e)}>
            <FiEdit3 />
            <span>새 게시글</span>
          </PostBtn>
        </Header>
        <Navigator>{'홈 > 게시글'}</Navigator>
        <Location
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
        />
        <Body>
          <RecentCardGrid>
            {contents?.map((contentData) => (
              <Card contentData={contentData} />
            ))}
          </RecentCardGrid>
        </Body>
      </Wrapper>
      <Modal isOpen={isModalOpen} onClose={opeSubModal}>
        <PostModal
          closeMainModal={handleModalClose}
          isSubModalOpen={isSubModalOpen}
          openSubModal={opeSubModal}
          closeSubModal={closeSubModal}
        />
      </Modal>
    </Base>
  );
};

export default Posts;

const Base = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 60px);
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
