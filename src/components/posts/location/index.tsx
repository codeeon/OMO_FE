import { SetStateAction, useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Menu from './Menu';
import styled from 'styled-components';
import { FaCaretDown } from 'react-icons/fa';
import { SlLocationPin } from 'react-icons/sl';
import { BounceLoader } from 'react-spinners';
import useCurrentLocationQuery from '../../../hooks/useCurrentLocationQuery';

interface Props {
  currentLocation: string | undefined;
  setCurrentLocation: React.Dispatch<SetStateAction<string | undefined>>;
}

const Location: React.FC<Props> = ({ currentLocation, setCurrentLocation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, refetch } = useCurrentLocationQuery(setCurrentLocation);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdownHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isOpen]);

  return (
    <NavContainer
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      ref={dropdownRef}
    >
      <DropdownBtn whileTap={{ scale: 0.97 }} onClick={toggleDropdownHandler}>
        <IconWrapper>
          <SlLocationPin />
        </IconWrapper>
        {isLoading ? (
          <BounceLoader color="#f97393" size={30} />
        ) : (
          <span>{currentLocation}</span>
        )}
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
        >
          <FaCaretDown style={{ color: '#f97393', margin: '5px 0 0 3px' }} />
        </motion.div>
      </DropdownBtn>
      <Menu
        refetch={refetch}
        isOpen={isOpen}
        setCurrentLocation={setCurrentLocation}
      />
    </NavContainer>
  );
};

export default Location;

const NavContainer = styled(motion.nav)`
  position: relative;
`;

const DropdownBtn = styled(motion.button)<{ width?: string; height?: string }>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 2px;
  width: ${({ width }) => (width ? width : '145px')};
  height: ${({ height }) => (height ? height : '40px;')};
  padding: 10px 15px;

  border-radius: 41px;
  border: 1px solid ${({ theme }) => theme.color.locBorder};
  background: ${({ theme }) => theme.color.locBg};

  span {
    color: ${({ theme }) => theme.color.locText};
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
  cursor: pointer;
`;

const IconWrapper = styled.div`
  display: flex;
  text-justify: center;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #f97393;
`;
