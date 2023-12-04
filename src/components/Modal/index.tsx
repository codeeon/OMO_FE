import React, { MouseEventHandler, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import Portal from '../../Portal';
import './index.css';

interface Props {
  children: ReactNode;
  onClose?: MouseEventHandler<HTMLDivElement>;
  isOpen: boolean;
  selector?: string;
}

const Modal: React.FC<Props> = ({ children, onClose, isOpen }) => {
  const handleDimClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // 이벤트 버블링 중지
    if (onClose) {
      onClose(e);
    }
  };
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <Portal>
        <Overlay>
          <Dim onClick={(e) => handleDimClick(e)} />
          <Container>{children}</Container>
        </Overlay>
      </Portal>
    </CSSTransition>
  );
};

export default Modal;

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

const Dim = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  /* backdrop-filter: blur(2px); */
`;

const Container = styled.div`
  max-width: 1000px;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
