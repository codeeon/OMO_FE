import React, { MouseEventHandler, ReactNode, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import Portal from '../../Portal';
import './modal.css';

interface Props {
  children: ReactNode;
  onClose?: () => void;
  isOpen: boolean;
  selector?: string;
}

const AlertModal: React.FC<Props> = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    // Execute onClose after 3 seconds
    const timeoutId = setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 3000);

    // Clear the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, [isOpen, onClose]);
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <Portal>
        <Overlay>
          <Container>{children}</Container>
        </Overlay>
      </Portal>
    </CSSTransition>
  );
};

export default AlertModal;

const Overlay = styled.div`
  position: fixed;
  z-index: 10;

  right: 15px;
  bottom: 0px;
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
