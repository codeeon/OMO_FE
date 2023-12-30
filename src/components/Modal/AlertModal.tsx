import React, { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled, { css } from 'styled-components';
import Portal from '../../Portal';
import './modal.css';

interface Props {
  children: ReactNode;
  onClose?: () => void;
  isOpen: boolean;
  position?: string;
  isLoading?: boolean;
  isError?: boolean;
  setIsUploadError?: Dispatch<SetStateAction<boolean>>;
  setIsUploadSuccess?: Dispatch<SetStateAction<boolean>>;
  setErrorType?: Dispatch<SetStateAction<string | null>>;
}

const AlertModal: React.FC<Props> = ({
  children,
  isOpen,
  onClose,
  position,
  isLoading,
  setIsUploadError,
  setIsUploadSuccess,
  setErrorType,
}) => {
  useEffect(() => {
    if (!isLoading) {
      const timeoutId = setTimeout(() => {
        if (onClose) {
          onClose();
        }
        setIsUploadError && setIsUploadError(false);
        setIsUploadSuccess && setIsUploadSuccess(false);
        setErrorType && setErrorType(null);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, onClose]);
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <Portal>
        <Overlay position={position}>
          <Container>{children}</Container>
        </Overlay>
      </Portal>
    </CSSTransition>
  );
};

export default AlertModal;

const Overlay = styled.div<{ position: string | undefined }>`
  position: fixed;
  z-index: 10;

  ${({ position }) =>
    position === 'topRight'
      ? css`
          right: 15px;
          top: 50px;
        `
      : position === 'topCenter'
      ? css`
          right: calc(50% - 420px);
          transform: translateX(-40%);
          top: 50px;
        `
      : css`
          right: 15px;
          bottom: 0px;
        `}

  padding: 10px;

  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: auto;
  height: 100px;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
`;
