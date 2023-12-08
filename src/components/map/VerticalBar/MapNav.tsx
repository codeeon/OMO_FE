import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CgFileDocument } from 'react-icons/cg';
import { FaRegMap } from 'react-icons/fa';

const MapNav = () => {
  const navigate = useNavigate();

  return (
    <Base>
      <Logo onClick={() => navigate('/')}>
        <LogoCircle />
        <LogoRectangle />
      </Logo>
      <Item onClick={() => navigate('/contents')}>
        <CgFileDocument />
        <span>게시글</span>
      </Item>
      <Item color="red">
        <FaRegMap />
        <span>지도</span>
      </Item>
    </Base>
  );
};

export default MapNav;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 85px;
  height: 100vh;

  position: absolute;
  background-color: #fff;
  z-index: 99;

  border-right: 1px solid #d9d9d9;
`;

const LogoCircle = styled.div`
  box-sizing: border-box;
  width: 22.3px;
  height: 22.3px;
  border: 5px solid #f97393;
  border-radius: 100%;
  transition: border 200ms ease-in-out;
`;

const LogoRectangle = styled.div`
  box-sizing: border-box;
  width: 22.3px;
  height: 22.3px;
  border: 5px solid #f97393;
  border-radius: 5px;
  transition: border 200ms ease-in-out;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  &:hover > div {
    border: 7px solid #f97476;
  }

  cursor: pointer;
  margin-top: 25px;
  margin-bottom: 50px;
`;

const Item = styled.div<{ color?: string }>`
  &:hover {
    color: #f97393;
  }
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 40px;

  span {
    font-size: 16px;
    font-weight: 700;
    color: ${({ color }) => (color === 'red' ? '#F97393' : '#e6e6e6')};
  }

  svg {
    font-size: 24px;
    color: ${({ color }) => (color === 'red' ? '#F97393' : '#e6e6e6')};
  }
  &:hover svg {
    color: #f97393;
  }
  &:hover span {
    color: #f97393;
  }
`;
