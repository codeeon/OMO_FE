import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  items: string[];
  width?: string;
}

const Dropdown: React.FC<Props> = ({ children, items, width }) => {
  const [isOpen, setIsDropdown] = useState(false);

  const toggleDropdown = () => {
    setIsDropdown(!isOpen);
  };

  return (
    <Base onClick={toggleDropdown}>
      {children}
      <List isOpen={isOpen} width={width}>
        {items.map((item) => (
          <Item key={item}>{item}</Item>
        ))}
      </List>
    </Base>
  );
};

export default Dropdown;

const Base = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 100%;
  width: 15px;
  height: 15px;
  &:hover {
    background: #dddddd;
  }

  position: relative;
`;

const List = styled.div<{ isOpen: boolean; width?: string }>`
  position: absolute;
  top: 50px;

  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: ${({ width }) => width || '90px'};
  height: auto;
  border-radius: 15px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  padding: 5px 10px;
`;

const Item = styled.div`
  padding: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
  border-radius: 10px;
  width: 90%;
  height: 15px;
  &:hover {
    background: #e6e6e6;
  }
  cursor: pointer;
  font-size: 15px;
`;
