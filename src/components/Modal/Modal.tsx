import React, { MouseEventHandler, ReactNode } from 'react';
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
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: ${({ theme }) => theme.color.bg};

  display: flex;
  justify-content: center;
  align-items: start;

  width: 725px;
  min-height: 800px;
  max-height: 1000px;
  height: 80%;

  border-radius: 16px;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.border};
    border-radius: 20px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;
