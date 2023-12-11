import React, { SetStateAction } from 'react';
import styled from 'styled-components';
import { FiEdit3 } from 'react-icons/fi';
import RecentCard from '../components/main/RecentCard';
import Modal from '../components/Modal/Modal';
import PostModal from '../components/postModal/PostModal';
import useModalCtr from '../hooks/useModalCtr';
import { CommentType, ContentType } from '../model/interface';
import Location from '../components/Location';
import useGetContentsQuery from '../hooks/useGetContentsQuery';

interface Props {
  currentLocation: string | undefined;
  setCurrentLocation: React.Dispatch<SetStateAction<string | undefined>>;
}

const Contents: React.FC<Props> = ({ currentLocation, setCurrentLocation }) => {
  const { isOpen, openModalHandler, closeModalHandler } = useModalCtr();
  const {
    isOpen: isSubModalOpen,
    openModalHandler: openSubModal,
    closeModalHandler: closeSubModal,
  } = useModalCtr();
  const { data: contents, isLoading } = useGetContentsQuery();
  return (
    <Base>
      <Wrapper>
        <Header>
          <Title>게시글</Title>
          <PostBtn onClick={openModalHandler}>
            <FiEdit3 />
            <span>새 게시글</span>
          </PostBtn>
        </Header>
        <Location
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
        />
        <Body>
          <RecentCardGrid>
            {contents?.map((contentData) => (
              <RecentCard contentData={contentData} />
            ))}
          </RecentCardGrid>
        </Body>
      </Wrapper>
      <Modal isOpen={isOpen} onClose={openSubModal}>
        <PostModal
          closeMainModal={closeModalHandler}
          isSubModalOpen={isSubModalOpen}
          openSubModal={openSubModal}
          closeSubModal={closeSubModal}
        />
      </Modal>
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
  margin-bottom: 20px;
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
