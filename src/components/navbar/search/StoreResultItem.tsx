import React from 'react';
import { StoreSearchType } from '../../../model/interface';
import styled from 'styled-components';
import StarCount from '../../share/StarCount';
import useModalCtr from '../../../hooks/useModalCtr';
import Modal from '../../Modal/Modal';
import DetailContentsModal from '../../detailModal/ContentsModal';

interface Props {
  searchResult: StoreSearchType;
  isSearching: boolean;
}

const StoreResultItem: React.FC<Props> = ({ searchResult, isSearching }) => {
  const { isModalOpen, handleModalClose, handleModalOpen } = useModalCtr();
  const { Location, content, star, postId } = searchResult;
  return (
    <Base $isSearching={isSearching} onClick={handleModalOpen}>
      <HeaderContainer>
        <StoreName>{Location.storeName}</StoreName>
        <StarCount count={star} />
      </HeaderContainer>
      <Content>{content}</Content>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <DetailContentsModal
          postId={postId}
          closeModalHandler={handleModalClose}
        />
      </Modal>
    </Base>
  );
};

export default StoreResultItem;

const Base = styled.div<{ $isSearching: boolean }>`
  display: ${({ $isSearching }) => ($isSearching ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: start;

  width: 96%;
  gap: 6px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }
  border-radius: 16px;
  padding: 10px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
`;

const StoreName = styled.div`
  width: 330%;

  color: ${({ theme }) => theme.color.text};
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.16px;
`;

const Content = styled.div`
  color: ${({ theme }) => theme.color.sub};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.14px;
  width: 480px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
