import React from 'react';
import styled from 'styled-components';
import Dropdown from './Dropdown';
import { FaRegUser } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const navItem = ['게시글', '지도'];
const dropdownItems = ['마이페이지', '로그아웃'];

const Navbar = () => {
  const navigate = useNavigate();

  const navigateHandler = (item: string) => {
    item === '게시글' ? navigate('/contents') : navigate('/map');
  };
  return (
    <Base>
      <Wrapper>
        <Logo onClick={() => navigate('/')}>
          <LogoCircle />
          <LogoRectangle />
        </Logo>
        <RightContainer>
          {navItem.map((item) => (
            <Item key={item} onClick={() => navigateHandler(item)}>
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
  max-width: 1140px;
  width: 92%;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const LogoCircle = styled.div`
  width: 15px;
  height: 15px;
  border: 5px solid #f97393;
  border-radius: 100%;
`;

const LogoRectangle = styled.div`
  width: 15px;
  height: 15px;
  border: 5px solid #f97393;
  border-radius: 5px;
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  gap: 20px;
`;

const Item = styled.div`
  font-size: 15px;
  font-weight: bold;
`;
