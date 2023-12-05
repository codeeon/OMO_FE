import React, { useState } from 'react';

interface ModalControl {
  isOpen: boolean;
  openModalHandler: () => void;
  closeModalHandler: () => void;
}

const useModalCtr = (): ModalControl => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModalHandler = () => {
    !isOpen && setIsOpen(true);
  };

  const closeModalHandler = () => {
    isOpen && setIsOpen(false);
  };

  return { isOpen, openModalHandler, closeModalHandler };
};

export default useModalCtr;
