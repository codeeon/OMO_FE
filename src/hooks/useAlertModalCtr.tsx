import React, { useState } from 'react';

interface ModalControl {
  isModalOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleModalOpen: () => void;
  handleModalClose: () => void;
}

const useAlertModalCtr = (): ModalControl => {
  const [isModalOpen, setModalIsOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    if (!isModalOpen) {
      setModalIsOpen(true);
    }
  };

  const handleModalClose = () => {
    if (isModalOpen) {
      setModalIsOpen(false);
    }
  };
  return { isModalOpen, setModalIsOpen, handleModalOpen, handleModalClose };
};

export default useAlertModalCtr;
