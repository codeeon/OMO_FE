import React, { useState } from 'react';

interface ModalControl {
  isModalOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleModalHandler: () => void;
}

const useModalCtr = (): ModalControl => {
  const [isModalOpen, setModalIsOpen] = useState<boolean>(false);

  const toggleModalHandler = () => {
    setModalIsOpen(!isModalOpen);
  };

  return { isModalOpen, setModalIsOpen, toggleModalHandler };
};

export default useModalCtr;
