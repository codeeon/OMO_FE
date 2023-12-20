import React, { MouseEventHandler, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import Portal from '../../Portal';
import './modal.css';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  selector?: string;
}

const SubModal: React.FC<Props> = ({ children, isOpen }) => {
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <Portal>
        <Overlay>
          <Dim />
          <Container>{children}</Container>
        </Overlay>
      </Portal>
    </CSSTransition>
  );
};

export default SubModal;

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
  z-index: 99;
`;

const Dim = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 110%;
  height: 110%;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
`;

const Container = styled.div`
  width: 700px;
  height: 900px;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
`;
