import React from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { TbMessage2 } from 'react-icons/tb';
import styled from 'styled-components';

const DetailModalFooter = () => {
  return (
    <Footer>
      <FooterItem color="red">
        <IoMdHeartEmpty />
        <span>23</span>
      </FooterItem>
      <FooterItem color="blue">
        <TbMessage2 />
        <span>2</span>
      </FooterItem>
    </Footer>
  );
};

export default DetailModalFooter;

const Footer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 21px;
  gap: 8px;
`;

const FooterItem = styled.div<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  color: #a9a9a9;
  svg {
    font-size: 24px;
    color: ${({ color }) => (color === 'red' ? '#F97393' : '#44A5FF')};
  }
  span {
    font-size: 20px;
    font-weight: 700;
  }
`;
