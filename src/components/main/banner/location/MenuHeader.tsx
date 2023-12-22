import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query';
import { itemVariants } from '../../../../styles/Motion';

import AlertModal from '../../../Modal/AlertModal';
import Alert from '../../../share/alert/Alert';
import useAlertModalCtr from '../../../../hooks/useAlertModalCtr';

interface Props {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<string | undefined, unknown>>;
  isLoading: boolean;
}

const MenuHeader: React.FC<Props> = ({ refetch, isLoading }) => {
  const { isModalOpen, setModalIsOpen, handleModalOpen, handleModalClose } =
    useAlertModalCtr();

  const onClickCurLocBtn = () => {
    refetch();
    handleModalOpen();
  };

  return (
    <>
      <Header variants={itemVariants} onClick={onClickCurLocBtn}>
        <FaLocationCrosshairs />
        <span>현재 위치에서 보기</span>
      </Header>
      <AlertModal isOpen={isModalOpen} onClose={handleModalClose}>
        <Alert isLoading={isLoading} />
      </AlertModal>
    </>
  );
};

export default MenuHeader;

const Header = styled(motion.div)`
  border-bottom: 1px solid #d9d9d9;
  padding: 15px;

  display: flex;
  justify-content: start;
  align-items: center;
  gap: 3px;
  color: #000;
  cursor: pointer;

  span {
    margin-top: 3px;
    font-size: 14px;
    font-weight: 700;
  }

  &:hover {
    color: #f97393;
  }
  transition: color 200ms ease-in-out;
`;
