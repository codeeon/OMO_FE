import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavDropdown from './NavDropdown';

interface Props {
  maxWidth: string | null;
}

const Navbar: React.FC<Props> = ({ maxWidth }) => {
  const [isSelected, setIsSelected] = useState<string>('');

  const navigate = useNavigate();

  const onClickLogoHander = () => {
    navigate('/');
    setIsSelected('');
  };

  const onSelectHandler = (item: string) => {
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
      <Wrapper $maxWidth={maxWidth}>
        <Logo
          onClick={onClickLogoHander}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <LogoCircle />
          <LogoRectangle />
        </Logo>
        <RightContainer>
          <Item
            onClick={() => onSelectHandler('게시글')}
            $isSelected={isSelected === '게시글'}
          >
            게시글
          </Item>
          <Item
            onClick={() => onSelectHandler('지도')}
            $isSelected={isSelected === '지도'}
          >
            지도
          </Item>
          <NavDropdown />
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
  background: ${({ theme }) => theme.color.bg};
  z-index: 9;
`;

const Wrapper = styled.div<{ $maxWidth: string | null }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: ${({ $maxWidth }) => ($maxWidth ? $maxWidth : '1200px')};
  width: 100%;
`;

const LogoCircle = styled.div`
  width: 16px;
  height: 16px;
  border: 7px solid #f97393;
  border-radius: 100%;
  transition: border 200ms ease-in-out;
`;

const LogoRectangle = styled.div`
  width: 16px;
  height: 16px;
  border: 7px solid #f97393;
  border-radius: 5px;
  transition: border 200ms ease-in-out;
`;

const Logo = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  cursor: pointer;
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  gap: 20px;
`;

const Item = styled.div<{ $isSelected: boolean }>`
  font-size: 16px;
  font-weight: 700;
  color: ${({ $isSelected, theme }) =>
    $isSelected ? '#F97393' : `${theme.color.sub2}`};
  &:hover {
    color: #f97393;
  }
  cursor: pointer;
`;
