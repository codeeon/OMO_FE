import React, { MouseEventHandler, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import Portal from '../../Portal';
import './MapModal.css';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  selector?: string;
}

const Modal: React.FC<Props> = ({ children, isOpen }) => {
  return (
    <CSSTransition in={isOpen} timeout={10000} unmountOnExit>
      <Portal>
        <Overlay isOpen={isOpen}>
          <Container>{children}</Container>
        </Overlay>
      </Portal>
    </CSSTransition>
  );
};

export default Modal;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  z-index: 3;
  top: 51.8%;
  transform: translate(0, -50%);

  left: ${({ isOpen }) => (isOpen ? '420px' : '-420px')};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 300ms ease;
`;
const Container = styled.div`
  width: 420px;
  height: calc(100vh - 60px);

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
`;
