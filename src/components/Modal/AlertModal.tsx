import React, { MouseEventHandler, ReactNode, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import Portal from '../../Portal';
import './modal.css';

interface Props {
  children: ReactNode;
  onClose?: MouseEventHandler<HTMLDivElement>;
  isOpen: boolean;
  selector?: string;
}

const AlertModal: React.FC<Props> = ({ children, onClose, isOpen }) => {
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
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 700px;
  height: 900px;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
`;
