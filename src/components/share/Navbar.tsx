import React, { useState } from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown';
import { FaRegUser } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const navItem = ['게시글', '지도'];
const dropdownItems = ['마이페이지', '로그아웃'];

const Navbar = () => {
  const [isSelected, setIsSelected] = useState<string>('');
  const navigate = useNavigate();

  const onClickLogoHander = () => {
    navigate('/');
    setIsSelected('');
  };

  const navigateHandler = (item: string) => {
    if (item === '게시글') {
      navigate('/contents');
      setIsSelected('게시글');
    } else {
      navigate('/map');
      setIsSelected('지도');
    }
  };
  return (
    <Base>
      <Wrapper>
        <Logo onClick={onClickLogoHander}>
          <LogoCircle />
          <LogoRectangle />
        </Logo>
        <RightContainer>
          {navItem.map((item) => (
            <Item
              key={item}
              onClick={() => navigateHandler(item)}
              isSelected={isSelected === item}
            >
              {item}
            </Item>
          ))}
          <Dropdown items={dropdownItems}>
            <FaRegUser />
          </Dropdown>
        </RightContainer>
      </Wrapper>
    </Base>
  );
};

export default Navbar;

const Base = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
`;

const LogoCircle = styled.div`
  width: 22.3px;
  height: 22.3px;
  border: 5px solid #f97393;
  border-radius: 100%;
  transition: border 200ms ease-in-out;
`;

const LogoRectangle = styled.div`
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
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  gap: 20px;
`;

const Item = styled.div<{ isSelected: boolean }>`
  font-size: 16px;
  font-weight: 700;
  color: ${({ isSelected }) => (isSelected ? 'black' : '#e6e6e6')};
  &:hover {
    color: black;
  }
  cursor: pointer;
`;
