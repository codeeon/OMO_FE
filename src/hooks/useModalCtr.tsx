import React, { useState } from 'react';

interface ModalControl {
  isModalOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleModalOpen: (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => void;
  handleModalClose: (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => void;
}

const useModalCtr = (): ModalControl => {
  const [isModalOpen, setModalIsOpen] = useState<boolean>(false);

  const handleModalOpen = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    if (!isModalOpen) {
      setModalIsOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    if (isModalOpen) {
      setModalIsOpen(false);
      document.body.style.overflow = 'auto';
    }
  };
  return { isModalOpen, setModalIsOpen, handleModalOpen, handleModalClose };
};

export default useModalCtr;
