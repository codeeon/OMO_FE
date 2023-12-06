import React, {
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled, { keyframes } from 'styled-components';
import { LuSettings2 } from 'react-icons/lu';

interface Props {
  setLocation: React.Dispatch<SetStateAction<string>>;
}

const SeoulDistrict = [
  '전체',
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동대문구',
  '동작구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '송파구',
  '양천구',
  '영등포구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구',
];

const LocationDropdown: React.FC<Props> = ({ setLocation }) => {
  const [isOpen, setIsDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const openDropdown = () => {
    setIsDropdown(true);
  };

  useEffect(() => {
    const onClickOutSide = (e: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdown(false);
      }
    };
    document.addEventListener('mousedown', onClickOutSide);
    return () => {
      document.removeEventListener('mousedown', onClickOutSide);
    };
  }, [isOpen]);

  return (
    <Base onClick={openDropdown}>
      <LuSettings2 />
      <List isOpen={isOpen} ref={dropdownRef}>
        {SeoulDistrict.map((dist) => (
          <Item onClick={() => setLocation(dist)}>{dist}</Item>
        ))}
      </List>
    </Base>
  );
};

export default LocationDropdown;

const Base = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 100%;

  border: 1px solid #d9d9d9;
  width: 15px;
  height: 15px;
  &:hover {
    background: #e6e6e6;
  }
  svg {
    font-size: 24px;
  }
  cursor: pointer;
  position: relative;
  background: #fff;
`;

const FadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform:translateY(0);
  };
  
`;

const List = styled.div<{ isOpen: boolean; width?: string }>`
  position: absolute;
  top: 50px;

  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: row;
  width: 270px;

  flex-wrap: wrap;
  justify-content: start;
  align-items: flex-start;
  height: 400px;
  border-radius: 8px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  padding: 7px;
  background: #fff;
  z-index: 100;
  overflow-y: scroll;
`;

const Item = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(33.333% - 20px); // Three columns with a small gap
  margin-bottom: 10px;
  &:hover {
    background: #f2f4f7;
  }
  cursor: pointer;
  font-size: 15px;
  transition: background 300ms ease-in-out;
  animation: ${FadeIn} 300ms ease-in-out;
  border-radius: 5px;
`;
