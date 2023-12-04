import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
}

const Portal: React.FC<Props> = ({ children }) => {
  const rootElement = document.getElementById('modal-root');

  return <>{rootElement ? createPortal(children, rootElement) : children}</>;
};

export default Portal;
